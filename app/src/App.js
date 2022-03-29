import Vacation from "./vacation-form/Vacation"
import Schedule from "./Schedule"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import VacationApproval from "./vacation-approval/VacationApproval";
import io from "socket.io-client";

const socket = io.connect('/');

function App() {
    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route exact path="/" element={<Schedule socket={socket} />} />
                    <Route exact path="/vacation" element={<Vacation socket={socket} />} />
                    <Route exact path="/vacationApproval" element={<VacationApproval socket={socket} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
