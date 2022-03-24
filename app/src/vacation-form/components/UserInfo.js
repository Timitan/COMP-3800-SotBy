import React from 'react'
import { useState } from 'react'

const UserInfo = ({ onAdd, onSubmit }) => {

    const [first, setFirst] = useState('')
    const [last, setLast] = useState('')
    const [emp, setEmp] = useState('')
    const [ext, setExt] = useState('')

    const twoHandlers = (change, e) => {
        change(e)
        onAdd({ first, last, emp, ext })
    }

    const submit = (e) => {
        e.preventDefault()

        onAdd({ first, last, emp, ext })
        onSubmit()
        window.location.reload(false);
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
                <input className="vacation-input-large" type="text" placeholder="First Name..." value={first} onChange={(e) => twoHandlers(setFirst, e.target.value)} />
                <input className="vacation-input-large" type="text" placeholder="Last Name..." value={last} onChange={(e) => twoHandlers(setLast, e.target.value)} />
                <input className="vacation-input-large" type="text" placeholder="Employee Number..." value={emp} onChange={(e) => twoHandlers(setEmp, e.target.value)} />
                <input className="vacation-input-large" type="text" placeholder="Extension..." value={ext} onChange={(e) => twoHandlers(setExt, e.target.value)} />
            </div>

            <input type="submit" value="Submit Form" className='btn' />

        </form>
    )
}

export default UserInfo