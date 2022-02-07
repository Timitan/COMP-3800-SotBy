import React from "react";
import "./style.css";
import './gridstyles.css';
import "./timeline.css";
import NoCollisionLayout from './components/NoCollisionLayout';
import Timeline from './components/Timeline';
import io from "socket.io-client";
const socket = io.connect('/');

export default class App extends React.Component {
  state = {
    users: [],
    heightLimit: 8,
  };

  getHeightLimit() {
    return this.state.heightLimit;
  }

  setHeightLimit(heightLimit) {
    this.setState({heightLimit: heightLimit});
    console.log("HeightLimit: " + this.state.heightLimit);
  }

  render() {
    console.log("rendered with height: " + this.getHeightLimit());
    return (
      <div className="App">
        <Timeline socket={socket} heightLimit={{get: () => this.getHeightLimit(), set: (limit) => this.setHeightLimit(limit)}} />
        <div className="grid-item-container"> 
          <NoCollisionLayout socket={socket} heightLimit={() => this.getHeightLimit()} />
          </div>
      </div>
    );
  }
}