import Vacation from "./Vacation"

const VacationList = ({ vacations, onDelete }) => {
	return (
		<>
			{vacations.map((vacation) => (
				<div key={vacation.id} className="vacation-column vacation-inputs">
					<Vacation vacation={vacation} onDelete={onDelete}
					/>
				</div>
			))}
		</>
	);
};

export default VacationList;
