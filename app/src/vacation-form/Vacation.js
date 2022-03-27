import Header from "./components/Header";
import UserInfo from "./components/UserInfo";
import GridDoubleLabel from "./components/GridDoubleLabel";
import GridTripleLabel from "./components/GridTripleLabel";
import GridNotesLabel from "./components/GridNotesLabel";
import VacationInput from "./components/VacationInput";
import VacationList from "./components/VacationList";
import io from "socket.io-client";
import './vacation.css'
import { useState } from "react"

const socket = io.connect('/');

function Vacation() {
	const [user, setUser] = useState('')
	const [vacations, setVacations] = useState([])
	const [vacationID, setVacationID] = useState(0)
	const [vacationSubmitted, setVacationSubmitted] = useState(false)

	const makeUsername = (first, last) => {
		const username = first.toLowerCase() + '_' + last.toLowerCase()
		return username
	}

	const changeUser = (first, last) => {
		const username = makeUsername(first, last)
		setUser(username)
		postSubmission(username)
	}

	const addVacation = (vacation) => {
		const id = vacationID
		const newVacation = { id, user, ...vacation }
		setVacationID(vacationID + 1)
		setVacations([...vacations, newVacation])
	}

	const deleteVacation = (id) => {
		setVacations(vacations.filter((vacation) => vacation.id !== id))
	}

	const createDate = (month, day) => {
		const year = new Date().getFullYear()
		const date = new Date(year, month - 1, day)
		return date
	}

	const postSubmission = (username) => {
		for (let index = 0; index < vacations.length; index++) {
			const id = vacations[index].id
			const start_date = createDate(vacations[index].startingMonth, vacations[index].startingDay).getTime()
			const end_date = createDate(vacations[index].endingMonth, vacations[index].endingDay).getTime()
			console.log(username)
			console.log(start_date)
			console.log(end_date)
			const duration = vacations[index].day
			const vacation = { id, username, start_date, end_date, duration }
			socket.emit('vacationAdded', vacation)
		}
		setVacationID(0)
		setVacationSubmitted(true)
		setVacations([])
	}

	return (
		<div className="vacation-submission-form">
			<div className="vacation-container">
				<Header />
				<UserInfo onAdd={changeUser} />

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
					<VacationInput onAdd={addVacation} />
				</div>

				<div>
					{vacations.length > 0 ?
						(<VacationList vacations={vacations} onDelete={deleteVacation} />)
						: ('No vacations added')}
				</div>
			</div>
			<div>
				{vacationSubmitted ? 
					(<div className="vacation-submission-true">Request submitted successfully</div>) 
					: ('')}
			</div>
		</div>

	);
}

export default Vacation;
