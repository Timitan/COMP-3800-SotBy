import React from 'react'
import { useState } from 'react'
import { ReactSession } from 'react-client-session';
import './create_resource.css'
import Header from "./components/Header";

function isAdmin() {
    let userStatus = ReactSession.get("admin");
    if (userStatus === 1) {
        return true;
    }
    return false;
}

function Create_resource(socket) {
    socket = socket.socket;
    const [model_num, setModelNum] = useState('');
    const [model_name, setModelName] = useState('');
    const [quantity_total, setQuantityTotal] = useState('');
    const [model_location, setModelLocation] = useState('');

    const create_resource = (e) => {
        e.preventDefault();

        const new_resource = { model_num: model_num, 
                               model_name: model_name,
                               quantity_total: quantity_total,
                               model_location: model_location };
        socket.emit('resourceAdded', new_resource, null);
        
        // feedback upon successful creation
        socket.on('resourceAdded', (user) => {
            document.getElementById("successMessage").innerText = "Resource successfully created."
        });

        // displays error msg upon failure 
        socket.on('error', (error) => {
            document.getElementById("successMessage").innerText = "An error has occured! Please check your inputs.";
            
        });
    }

    return isAdmin() ? (
        <div className="resource-container">
			<Header />
            <form className="form" onSubmit={create_resource}>
                <div className="new-resource-form">
                    <label>Model Number: </label>
                    <input 
                        className="new-resource-input" 
                        type="text" 
                        placeholder="Model Number..." 
                        value={model_num} 
                        onChange={(e) => setModelNum(e.target.value)} /><br></br>
                    <label>Model Name: </label>
                    <input 
                        className="new-resource-input" 
                        type="text" 
                        placeholder="Model Name..." 
                        value={model_name} 
                        onChange={(e) => setModelName(e.target.value)} /><br></br>
                    <label>Quantity Total: </label>
                    <input 
                        className="new-resource-input" 
                        type="text" 
                        placeholder="Quantity Total..." 
                        value={quantity_total} 
                        onChange={(e) => setQuantityTotal(e.target.value)} /><br></br>
                    <label>Model Location: </label>
                    <input 
                        className="new-resource-input" 
                        type="text" 
                        placeholder="Model Location..." 
                        value={model_location} 
                        onChange={(e) => setModelLocation(e.target.value)} /><br></br>
                </div>

                <input type="submit" value="Create Resource" className='btn' />
                <p id="successMessage"></p>
            </form>
        </div>
    ) : window.location.href="/"
}

export default Create_resource