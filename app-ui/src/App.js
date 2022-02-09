import React from "react";
import "./style.css";
import './gridstyles.css';
import "./timeline.css";
import Timeline from './components/Timeline';
import io from "socket.io-client";
const socket = io.connect('/');

export default class App extends React.Component {
  state = {
    instructors: [],
    heightLimit: 8,
  };

  getHeightLimit() {
    return this.state.heightLimit;
  }

  setHeightLimit(heightLimit) {
    this.setState({heightLimit: heightLimit});
    console.log("HeightLimit: " + this.state.heightLimit);
  }

  parseData = (data) => {
    const parsedData = JSON.parse(data);
    console.log("Data: " + data);
    
    const instructorArray = [];
    for(let i = 0; i < parsedData.length; i++) {
        const instructor = {};
        instructor.key = parsedData[i].id;
        instructor.name = parsedData[i].first_name + " " + parsedData[i].last_name;
        instructor.timeblocks = [];
        instructor.timeblocks.push({start: new Date(parsedData[i].created_at), end: new Date(parsedData[i].updated_at), name: "Test " + i});

        instructorArray.push(instructor);
    }

    this.setState({instructors: instructorArray})
    //console.log(JSON.stringify(this.state.instructors));
  }

  retrieveInstructorDataFromDatabase = () => {
      fetch('http://localhost:8000/instructors')
      .then(response => {
          return response.text();
      })
      .then(data => {
          this.parseData(data)
      });
  }

  componentDidMount() {
    this.retrieveInstructorDataFromDatabase();
  }

  renderApp() {
    return (
      <div className="App">
        <Timeline socket={socket} heightLimit={{get: () => this.getHeightLimit(), set: (limit) => this.setHeightLimit(limit)}}
        instructorArray={this.state.instructors} />
      </div>
    );
  }

  render() {
    return (this.state.instructors.length ? this.renderApp() :
      <span>Loading data...</span>
    );
  }
}