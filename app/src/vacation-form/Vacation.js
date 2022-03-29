import Header from "./components/Header";
import UserInfo from "./components/UserInfo";
import GridDoubleLabel from "./components/GridDoubleLabel";
import GridTripleLabel from "./components/GridTripleLabel";
import GridNotesLabel from "./components/GridNotesLabel";
import VacationInput from "./components/VacationInput";
import VacationList from "./components/VacationList";
import io from "socket.io-client";
import './vacation.css'
import React from "react";

const socket = io.connect('/');

const END_POINT_ROOT = "http://localhost:8000/"
const VACATION_RESOURCE = "users"

export default class Vacation extends React.Component {
	state = {
		user: '',
		users: [],
		vacations: [],
		vacationID: 0,
		vacationSubmitted: false,
		loaded: false,
	}

	makeUsername = (first, last) => {
		const username = first.toLowerCase() + '_' + last.toLowerCase()
		return username
	}

	changeUser = (first, last) => {
		const user = this.makeUsername(first, last)
		if (!this.state.users.includes(user)) {
			alert("User is not in database")
		}
		else {
			let stateVacations = this.state.vacations
			for (let i = 0; i < this.state.vacations.length; i++) {
				stateVacations[i] = { ...stateVacations[i], user }
			}
			this.setState({ vacations: stateVacations })
			this.postSubmission(user)
		}

	}

	addVacation = (vacation) => {
		const id = this.state.vacationID
		const newVacation = { id, ...vacation }
		this.setState({ vacationID: this.state.vacationID + 1 })
		this.setState({ vacations: [...this.state.vacations, newVacation] })
	}

	deleteVacation = (id) => {
		this.setState({ vacation: this.state.vacations.filter((vacation) => vacation.id !== id) })
	}

	createDate = (month, day) => {
		const year = new Date().getFullYear()
		const date = new Date(year, month - 1, day)
		return date
	}

	postSubmission = (username) => {
		for (let index = 0; index < this.state.vacations.length; index++) {
			const id = this.state.vacations[index].id
			const start_date = this.createDate(this.state.vacations[index].startingMonth, this.state.vacations[index].startingDay).getTime()
			const end_date = this.createDate(this.state.vacations[index].endingMonth, this.state.vacations[index].endingDay).getTime()
			const duration = this.state.vacations[index].day
			const vacation = { id, username, start_date, end_date, duration }
			socket.emit('vacationAdded', vacation)
		}
		this.setState({ vacationID: 0 })
		this.setState({ vacationSubmitted: true })
		this.setState({ vacations: [] })
	}

	parseData = (data) => {
		if (!data) {
			return null
		}
		const parsedData = JSON.parse(data)
		let dataUsers = []
		for (let i = 0; i < parsedData.length; i++) {
			dataUsers.push(parsedData[i].username)
		}
		this.setState({ users: dataUsers })
		this.setState({ loaded: true })
	}

	getUsers = () => {
		fetch(END_POINT_ROOT + VACATION_RESOURCE)
			.then(response => {
				return response.text();
			})
			.then(data => {
				this.parseData(data)
			});
	}

	componentDidMount() {
		this.getUsers();
	}

	renderApp() {
		return (
			<div className="vacation-submission-form" >
				<div className="vacation-container">
					<Header />
					<UserInfo onAdd={this.changeUser} />

					{/* Vacation Inputs */}
					<div className="vacation-grid">
						{/* Labels */}
						<div className="vacation-row">
							<GridDoubleLabel topText="N-NEW" botText="C-CANCEL" />
							<GridTripleLabel
								topText="LEAVE DATES"
								leftText="FROM"
								rightText="TO (INCLUSIVE)"
							/>
							<GridTripleLabel
								topText="TOTAL"
								leftText="DAY(S)"
								rightText="HOUR(S)"
							/>
							<GridDoubleLabel topText="VA-VACATION" botText="BT-BANKED TIME" />
							<GridNotesLabel text="NOTES" />
						</div>

						{/* Inputs */}
						<VacationInput onAdd={this.addVacation} />
					</div>

					<div>
						{this.state.vacations.length > 0 ?
							(<VacationList vacations={this.state.vacations} onDelete={this.deleteVacation} />)
							: ('No vacations added')}
					</div>
				</div>
				<div>
					{this.state.vacationSubmitted ?
						(<div className="vacation-submission-true">Request submitted successfully</div>)
						: ('')}
				</div>
			</div>

		);
	}

	render() {
		return (this.state.loaded ? this.renderApp() :
			<span>Loading data...</span>)
	}

}
