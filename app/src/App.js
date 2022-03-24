import Vacation from "./vacation-form/Vacation"
import Schedule from "./Schedule"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import VacationApproval from "./vacation-approval/VacationApproval";
import { useState } from "react"

function App() {
    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route exact path="/" element={<Schedule />} />
                    <Route exact path="/vacation" element={<Vacation />} />
                    <Route exact path="/vacationApproval" element={<VacationApproval />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
