import React from "react";
import NotApprovedList from "./components/NotApprovedList"
import NoVacations from "./components/NoVacations"
import "./vacationApproval.css"

const END_POINT_ROOT = "http://localhost:8000/"
const VACATION_RESOURCE = "vacationsNotApproved"

export default class VacationApproval extends React.Component {
    state = {
        vacations: [],
        loaded: false,
    }

    approveVacation = (vacation) => {
        this.props.socket.emit("vacationApproved", vacation)
    }

    rejectVacation = (vacation) => {
        this.props.socket.emit("vacationDeleted", vacation)
    }

    parseData = (data) => {
        if (!data) {
            return null;
        }
        const parsedData = JSON.parse(data)
        this.setState({ vacations: parsedData })
        this.setState({ loaded: true })
    }

    getVacations = () => {
        fetch(END_POINT_ROOT + VACATION_RESOURCE)
            .then(response => {
                return response.text();
            })
            .then(data => {
                this.parseData(data)
            });
    }

    componentDidMount() {
        this.getVacations();
    }

    renderApp() {
        return (
            <div className="approval-app">
                <button className="approval-back-btn" onClick={(e) => { window.location.href = "/" }}>
                    Back
                </button>
                {this.state.vacations.length > 0 ?
                    (<NotApprovedList vacations={this.state.vacations} onApprove={this.approveVacation} onReject={this.rejectVacation} />)
                    : (<NoVacations />)}
            </div>
        );
    }

    render() {
        return (this.state.loaded ? this.renderApp() :
            <span>Loading data...</span>
        );
    }
}