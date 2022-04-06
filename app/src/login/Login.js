import React from 'react'
import { useState } from 'react'
import { ReactSession } from 'react-client-session';
import Header from "./components/Header";

import './login.css'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const authenticate = async (e) => {
        let res_data = {};

        e.preventDefault()

        const user = { username: username, password: password };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };

        await fetch('http://localhost:3000/login', requestOptions)
            .then(response => response.json())
            .then(data => res_data = data);
            
        console.log(res_data.status);
        if (res_data.status === 200) {
            ReactSession.set("username", res_data.username);
            ReactSession.set("first_name", res_data.first_name);
            ReactSession.set("last_name", res_data.last_name);
            ReactSession.set("admin", res_data.admin);
            window.location.href="/";
        } else {
            document.getElementById("successMessage").innerText = "Incorrect username or password!"
        }

    }

    return (
        <div className="vacation-container">
            {/* <AdminNav /> */}
            <Header />
            <form className="form" onSubmit={authenticate}>
                <div className="login-form">
                    <label>Username: </label>
                    <input 
                        className="login-input" 
                        type="text" 
                        placeholder="Username..." 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} /><br></br>
                    <label>Password: </label>
                    <input 
                        className="login-input" 
                        type="password" 
                        placeholder="Password..." 
                        value={password} 
                        onChange={(e) => setPassword (e.target.value)} />
                </div>
                <input type="submit" value="Login" className='btn' />
                <div id="successMessage"></div>
            </form>
        </div>
    )
}

export default Login