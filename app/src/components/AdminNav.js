import React from 'react';
import '../navbar.css'

function logout() {
    localStorage.clear();
}

const AdminNav = ({ title }) => {
    return (
        <ul>
            <li><a href="/create_user">Create User</a></li>
            <li><a href="/create_course">Create Course</a></li>
            <li><a href="/create_resource">Create Resource</a></li>
            <li><a href="/vacationApproval">Approve Vacation</a></li>
            <li id="logout" onMouseDown={logout}><a href="/">Logout</a></li>
        </ul>
    );
};
  
AdminNav.defaultProps = {
    title: 'Admin Nav',
}
  
export default AdminNav;
  