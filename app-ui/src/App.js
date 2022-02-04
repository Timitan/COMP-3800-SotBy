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
    heightLimit: 5,
  };

  getHeightLimit() {
    return this.state.heightLimit;
  }

  setHeightLimit(heightLimit) {
    this.state.heightLimit = heightLimit;
    console.log(this.state.heightLimit);
  }

  render() {
    return (
      <div className="App">
        <Timeline socket={socket} heightLimit={{get: () => this.getHeightLimit(), set: (limit) => this.setHeightLimit(limit)}} />
        <div className="grid-item-container"> 
          <NoCollisionLayout socket={socket} heightLimit={this.state.heightLimit} />
          </div>
      </div>
    );
  }
}