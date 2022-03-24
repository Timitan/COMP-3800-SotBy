const VacationEntry = ({vacation, onApprove, onReject}) => {
  return (
    <div className="approval-entry">
        <div className="approval-entry-name">{vacation.username}</div>
        <div className="approval-entry-start">{vacation.start_date}</div>
        <div className="approval-entry-end">{vacation.end_date}</div>
        <div className="approval-entry-duration">{vacation.duration}</div>
        <button className="approval-entry-btn" />
    </div>
  )
}

export default VacationEntry