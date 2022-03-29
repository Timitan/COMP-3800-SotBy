const VacationEntry = ({ vacation, name, onApprove, onReject }) => {

  const numToMonth = (num) => {
    switch (num) {
      case 0:
        return "January"
      case 1:
        return "February"
      case 2:
        return "March"
      case 3:
        return "April"
      case 4:
        return "May"
      case 5:
        return "June"
      case 6:
        return "July"
      case 7:
        return "August"
      case 8:
        return "September"
      case 9:
        return "October"
      case 10:
        return "November"
      case 11:
        return "December"
    }
  }

  const createDate = (timestamp) => {
    const date = new Date(timestamp)
    const month = numToMonth(date.getMonth())
    return date.getDate() + " " + month + ", " + date.getFullYear()
  }

  return (
    <div className="approval-entry approval-entry-row">
      <div className="approval-entry-info approval-entry-column">
        <div className="approval-entry-name">{name[0]} {name[1]}</div>
        <div className="approval-entry-start">From:⠀⠀{createDate(vacation.start_date)}</div> {/* BLANK CHARACTER 52-54 */}
        <div className="approval-entry-end">To:⠀⠀{createDate(vacation.end_date)}</div> {/* BLANK CHARACTER 48-50 */}
        <div className="approval-entry-duration">Duration: {vacation.duration} days</div>
      </div>
      <button className="approval-entry-btn approve-btn">Approve</button>
      <button className="approval-entry-btn reject-btn">Reject</button>
    </div>
  )
}

export default VacationEntry