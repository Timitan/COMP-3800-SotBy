import Vacation from "./vacation-form/Vacation"
import Schedule from "./Schedule"
import DetailedSchedule from "./detailed-schedule/detailedSchedule"
import Resources from "./resources/resources"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState } from "react"
import io from "socket.io-client";
const socket = io.connect('/');

function App() {
    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route exact path="/" element={<Schedule />} />
                    <Route exact path="/vacation" element={<Vacation />} />
                    <Route exact path="/detailed-schedule" element={<DetailedSchedule socket={socket}/>} />
                    <Route exact path="/resources" element={<Resources socket={socket}/>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
