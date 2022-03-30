import Vacation from "./vacation-form/Vacation"
import Schedule from "./Schedule"
import Login from "./login/Login"
import Create_user from "./create_user/create_user"
import Create_course from "./course/create_course"
// import Admin from "./admin/admin"
// import Create_resource from "./create_resource/create_resource"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState } from "react"
import { ReactSession } from 'react-client-session';
import VacationApproval from "./vacation-approval/VacationApproval";
import io from "socket.io-client";
const socket = io.connect('/');

ReactSession.setStoreType("localStorage");



function App() {
    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route exact path="/" element={<Schedule socket={socket} />} />
                    <Route exact path="/vacation" element={<Vacation socket={socket} />} />
                    <Route exact path="/vacationApproval" element={<VacationApproval socket={socket} />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/create_user" element={<Create_user socket={socket}/>} />
                    <Route exact path="/create_course" element={<Create_course socket={socket}/>} />
                    {/* <Route exact path="/create_resource" element={<Create_resource socket={socket}/>} /> */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
