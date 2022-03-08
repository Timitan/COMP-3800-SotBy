import Vacation from "./vacation-form/Vacation"
import Schedule from "./Schedule"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState } from "react"

function App() {

    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route exact path="/" element={<Schedule />} />
                    <Route exact path="/vacation" element={<Vacation />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
