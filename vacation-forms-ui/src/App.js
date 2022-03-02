import Header from "./components/Header";
import TextInput from "./components/TextInput";
import GridDoubleLabel from "./components/GridDoubleLabel";
import GridTripleLabel from "./components/GridTripleLabel";
import GridNotesLabel from "./components/GridNotesLabel";
import VacationInput from "./components/VacationInput";
import VacationList from "./components/VacationList";
import Button from "./components/Button";

import { useState } from "react"

function App() {
	const [vacations, setVacations] = useState([
		{
			id: 1,
			NC: "N",
			from: "March 23",
			to: "April 1",
			day: "8",
			hour: "48",
			VABT: "VA",
			notes:
				"No coverage needed, will teach on Mar 26 and take alternate day off.",
		},

		{
			id: 2,
			NC: "N",
			from: "June 2",
			to: "June 10",
			day: "7",
			hour: "42",
			VABT: "VA",
			notes:
				"No coverage needed, will teach on Mar 26 and take alternate day off.",
		},
	])

	const addVacation = (vacation) => {
		const id = Math.floor(Math.random() * 100000) + 1
		const newVacation = {id, ...vacation }
		setVacations([...vacations, newVacation])
	}

	const deleteVacation = (id) => {
		setVacations(vacations.filter((vacation) => vacation.id !== id))
	};

	return (
		<div className="container">
			<Header />

			{/* User Inputs */}
			<div className="user-inputs">
				<TextInput text="First Name" />
				<TextInput text="Last Name" />
				<TextInput text="Employee Number" />
				<TextInput text="Extension" />
			</div>

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
			<Button />
		</div>
	);
}

export default App;
