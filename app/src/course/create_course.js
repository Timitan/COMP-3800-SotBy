import React from 'react'
import { useState } from 'react'

// import './create_course.css'

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
        socket.emit('courseAdded', new_course);
    }

    return (
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
                    placeholder="Start Date..." 
                    value={start_date} 
                    onChange={(e) => setStartDate(e.target.value)} /><br></br>
                <label>End Date: </label>
                <input 
                    className="new-course-input" 
                    type="text" 
                    placeholder="End Date..." 
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
    )
}

export default Create_Course