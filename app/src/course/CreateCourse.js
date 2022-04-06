import React from 'react'
import { useState } from 'react'
import { ReactSession } from 'react-client-session';
import './create_course.css'
import Header from "./components/Header";

function isAdmin() {
    let userStatus = ReactSession.get("admin");
    if (userStatus === 1) {
        return true;
    }
    return false;
}

function Create_Course(socket) {
    socket = socket.socket;
    const [course_num, setCourseNum] = useState('');
    const [subject, setSubject] = useState('');
    const [course, setCourse] = useState('');
    const [title, setTitle] = useState('');
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');
    const [colour, setColour] = useState('');

    const create_course = (e) => {
        e.preventDefault();

        const new_course = { course_num: course_num, 
                             subject: subject,
                             course: course,
                             title: title,
                             start_date: start_date,
                             end_date: end_date,
                             colour: colour };
        socket.emit('courseAdded1', new_course);

        // feedback upon successful creation
        socket.on('courseAdded1', (user) => {
            document.getElementById("successMessage").innerText = "Course successfully created."
        });

        // displays error msg upon failure 
        socket.on('error', (error) => {
            document.getElementById("successMessage").innerText = "An error has occured! Please check your inputs.";
            
        });
    }

    return isAdmin() ? (
        <div className="resource-container">
			<Header />
            <form className="form" onSubmit={create_course}>
                <div className="new-course-form">
                    <label>Course Number: </label>
                    <input 
                        className="new-course-input" 
                        type="text" 
                        placeholder="Course Number: ..." 
                        value={course_num} 
                        onChange={(e) => setCourseNum(e.target.value)} /><br></br>
                    <label>Subject: </label>
                    <input 
                        className="new-course-input" 
                        type="text" 
                        placeholder="Subject..." 
                        value={subject} 
                        onChange={(e) => setSubject(e.target.value)} /><br></br>
                    <label>Course: </label>
                    <input 
                        className="new-course-input" 
                        type="text" 
                        placeholder="Course..." 
                        value={course} 
                        onChange={(e) => setCourse(e.target.value)} /><br></br>
                    <label>Title: </label>
                    <input 
                        className="new-course-input" 
                        type="text" 
                        placeholder="Title..." 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} /><br></br>
                    <label>Start Date: </label>
                    <input 
                        className="new-course-input" 
                        type="text" 
                        placeholder="YYYY-MM-DD" 
                        value={start_date} 
                        onChange={(e) => setStartDate(e.target.value)} /><br></br>
                    <label>End Date: </label>
                    <input 
                        className="new-course-input" 
                        type="text" 
                        placeholder="YYYY-MM-DD" 
                        value={end_date} 
                        onChange={(e) => setEndDate(e.target.value)} /><br></br>
                    <label>Colour: </label>
                    <input 
                        className="new-course-input" 
                        type="text" 
                        placeholder="Colour..." 
                        value={colour} 
                        onChange={(e) => setColour (e.target.value)} />
                </div>
                <input type="submit" value="Create Course" className='btn' />
                <p id="successMessage"></p>
            </form>
        </div>
    ) : window.location.href="/"
}

export default Create_Course