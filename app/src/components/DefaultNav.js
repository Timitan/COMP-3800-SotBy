import React from 'react';
import '../navbar.css'

const DefaultNav = ({ title }) => {
    return (
        <ul>
            <li id="login"><a href="/login">Login</a></li>
        </ul>
    );
};
  
DefaultNav.defaultProps = {
    title: 'Default Nav',
}
  
export default DefaultNav;
  