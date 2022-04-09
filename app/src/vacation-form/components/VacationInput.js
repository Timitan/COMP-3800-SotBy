import { useState } from 'react';
// import DatePicker from 'react-datepicker'
// import "react-datepicker/dist/react-datepicker.css";

const VacationInput = ({ onAdd }) => {
  const [NC, setNC] = useState('')
  const [startingMonth, setStartingMonth] = useState('')
  const [startingDay, setStartingDay] = useState('')
  const [endingMonth, setEndingMonth] = useState('')
  const [endingDay, setEndingDay] = useState('')
  const [day, setDay] = useState('')
  const [hour, setHour] = useState('')
  const [VABT, setVABT] = useState('')
  const [notes, setNotes] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    onAdd({ NC, startingMonth, startingDay, endingMonth, endingDay, day, hour, VABT, notes })
    setNC('')
    setStartingMonth('')
    setStartingDay('')
    setEndingMonth('')
    setEndingDay('')
    setDay('')
    setHour('')
    setVABT('')
    setNotes('')
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="vacation-row">
          <input className="vacation-input" type="text" placeholder="..." value={NC} onChange={(e) => setNC(e.target.value)} />
          <input className="vacation-input-half" type="text" placeholder="MM..." value={startingMonth} onChange={(e) => setStartingMonth(e.target.value)} />
          <input className="vacation-input-half" type="text" placeholder="DD..." value={startingDay} onChange={(e) => setStartingDay(e.target.value)} />
          <input className="vacation-input-half" type="text" placeholder="MM..." value={endingMonth} onChange={(e) => setEndingMonth(e.target.value)} />
          <input className="vacation-input-half" type="text" placeholder="DD..." value={endingDay} onChange={(e) => setEndingDay(e.target.value)} />
          <input className="vacation-input" type="text" placeholder="..." value={day} onChange={(e) => setDay(e.target.value)} />
          <input className="vacation-input" type="text" placeholder="..." value={hour} onChange={(e) => setHour(e.target.value)} />
          <input className="vacation-input" type="text" placeholder="..." value={VABT} onChange={(e) => setVABT(e.target.value)} />
          <input className="vacation-input-large" type="text" placeholder="..." value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>

        <input type="submit" value="Add" className='btn' />
      </form>
    </div>


  );
};

export default VacationInput;
