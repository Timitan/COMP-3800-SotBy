import { FaTimes } from 'react-icons/fa'

const Vacation = ({ vacation, onDelete }) => {
	return (
		<div className="vacation-row vacation vacation-header">
			<div className="vacation-grid-box padding-top">{vacation.NC}</div>
			<div className="vacation-grid-box padding-top">{vacation.startingMonth}</div>
			<div className="vacation-grid-box padding-top">{vacation.startingDay}</div>
			<div className="vacation-grid-box padding-top">{vacation.endingMonth}</div>
			<div className="vacation-grid-box padding-top">{vacation.endingDay}</div>
			<div className="vacation-grid-box padding-top">{vacation.day}</div>
			<div className="vacation-grid-box padding-top">{vacation.hour}</div>
			<div className="vacation-grid-box padding-top">{vacation.VABT}</div>
			<div className="vacation-grid-box vacation-label-notes padding">
				{vacation.notes}
			</div>
			<FaTimes onClick={() => onDelete(vacation.id)} style={{width: '2%', height: '2%', color: 'red', cursor:'pointer'}}/>
		</div>
	);
};

export default Vacation;
