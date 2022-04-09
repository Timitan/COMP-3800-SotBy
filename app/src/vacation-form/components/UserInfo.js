import React from 'react'
import { useState } from 'react'

const UserInfo = ({ onAdd }) => {

    const [first, setFirst] = useState('')
    const [last, setLast] = useState('')
    const [emp, setEmp] = useState('')
    const [ext, setExt] = useState('')

    const submit = (e) => {
        e.preventDefault()
        onAdd(first, last)
        setFirst('')
        setLast('')
        setEmp('')
        setExt('')
    }

    return (
        <form onSubmit={submit}>
            <div className="vacation-row">
                <label className="vacation-input-labels">First Name</label>
                <label className="vacation-input-labels">Last Name</label>
                <label className="vacation-input-labels">Employee Number</label>
                <label className="vacation-input-labels">Extension</label>
            </div>
            <div className="vacation-row">
                <input className="vacation-input-large" type="text" placeholder="First Name..." value={first} onChange={(e) => setFirst(e.target.value)} />
                <input className="vacation-input-large" type="text" placeholder="Last Name..." value={last} onChange={(e) => setLast(e.target.value)} />
                <input className="vacation-input-large" type="text" placeholder="Employee Number..." value={emp} onChange={(e) => setEmp(e.target.value)} />
                <input className="vacation-input-large" type="text" placeholder="Extension..." value={ext} onChange={(e) => setExt(e.target.value)} />
            </div>

            <input type="submit" value="Submit Form" className='btn' />

        </form>
    )
}

export default UserInfo