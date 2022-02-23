import React from "react";
import "./style.css";
import './gridstyles.css';
import "./timeline.css";
import Timeline from './components/Timeline';
import io from "socket.io-client";
const socket = io.connect('/');

const END_POINT_ROOT = "http://localhost:8000/";
const INSTRUCTORS_RESOURCE = "users";

export default class App extends React.Component {
  state = {
    instructors: [],
    heightLimit: 8,
    loaded: false
  };

  getHeightLimit() {
    return this.state.heightLimit;
  }

  setHeightLimit(heightLimit) {
    this.setState({heightLimit: heightLimit});
    console.log("HeightLimit: " + this.state.heightLimit);
  }

  parseData = (data) => {
    console.log(data);
    if(!data) {
      return null;
    }

    const parsedData = JSON.parse(data);
    console.log("Data: " + data);
    
    const instructorArray = [];
    for(let i = 0; i < parsedData.length; i++) {
        const instructor = {};
        instructor.key = parsedData[i].username;
        instructor.name = parsedData[i].first_name + " " + parsedData[i].last_name;
        instructor.timeblocks = [];
        instructor.timeblocks.push({start: new Date(parsedData[i].start_date), end: new Date(parsedData[i].end_date), name: parsedData[i].title + i});

        instructorArray.push(instructor);
    }

    this.setState({instructors: instructorArray, heightLimit: (instructorArray.length + 1) * 2})
    this.setState({loaded: true})
  }

  retrieveInstructorDataFromDatabase = () => {
      fetch(END_POINT_ROOT + INSTRUCTORS_RESOURCE)
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
    return (this.state.loaded ? this.renderApp() :
      <span>Loading data...</span>
    );
  }
}