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
  };

  render() {
    return (
      <div className="App">
        <Timeline socket={socket}/>
        <div className="grid-item-container"> 
          <NoCollisionLayout socket={socket} />
          </div>
      </div>
    );
  }
}