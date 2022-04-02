import React from 'react'
import { useState } from 'react'
import { ReactSession } from 'react-client-session';
import './create_user.css'
import Header from "./components/Header";


function Create_User(socket) {
    socket = socket.socket;
    const [username, setUsername] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [datejoined, setDateJoined] = useState('');
    const [admin, setAdmin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const name = ReactSession.get("username");
    console.log(name);


    const create_user = (e) => {
        e.preventDefault();

        const new_user = { username: username, 
                           firstname: firstname,
                           lastname: lastname,
                           datejoined: datejoined,
                           admin: admin,
                           email: email,
                           password: password };
        socket.emit('userAdded', new_user, null);
        // if successful, need to redirect to main page
    }

    return (
        <div className="user-container">
			<Header />
            <form className="form" onSubmit={create_user}>
                <div className="new-user-form">
                    <label>Username: </label>
                    <input 
                        className="new-user-input" 
                        type="text" 
                        placeholder="Username..." 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} /><br></br>
                    <label>First name: </label>
                    <input 
                        className="new-user-input" 
                        type="text" 
                        placeholder="First name..." 
                        value={firstname} 
                        onChange={(e) => setFirstName(e.target.value)} /><br></br>
                    <label>Last name: </label>
                    <input 
                        className="new-user-input" 
                        type="text" 
                        placeholder="Last name..." 
                        value={lastname} 
                        onChange={(e) => setLastName(e.target.value)} /><br></br>
                    <label>Date joined: </label>
                    <input 
                        className="new-user-input" 
                        type="text" 
                        placeholder="Date joined..." 
                        value={datejoined} 
                        onChange={(e) => setDateJoined(e.target.value)} /><br></br>
                    <label>Admin: </label>
                    <input 
                        className="new-user-input" 
                        type="text" 
                        placeholder="Admin..." 
                        value={admin} 
                        onChange={(e) => setAdmin(e.target.value)} /><br></br>
                    <label>Email: </label>
                    <input 
                        className="new-user-input" 
                        type="text" 
                        placeholder="Email..." 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} /><br></br>
                    <label>Password: </label>
                    <input 
                        className="new-user-input" 
                        type="text" 
                        placeholder="Password..." 
                        value={password} 
                        onChange={(e) => setPassword (e.target.value)} />
                </div>

                <input type="submit" value="Create User" className='btn' />
                <p id="successMessage"></p>
            </form>
        </div>
    )
}

export default Create_User