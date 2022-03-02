import Button from "./Button";

import { useState } from 'react';

const VacationInput = ({ onAdd }) => {
  const [NC, setNC] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [day, setDay] = useState('')
  const [hour, setHour] = useState('')
  const [VABT, setVABT] = useState('')
  const [notes, setNotes] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    onAdd({ NC, from, to, day, hour, VABT, notes })
    setNC('')
    setFrom('')
    setTo('')
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
          <input className="vacation-input" type="text" placeholder="..." value={from} onChange={(e) => setFrom(e.target.value)} />
          <input className="vacation-input" type="text" placeholder="..." value={to} onChange={(e) => setTo(e.target.value)} />
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
