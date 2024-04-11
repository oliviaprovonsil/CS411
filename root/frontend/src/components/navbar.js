/*import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
const OAuth2Data = require('../credentials1.json');
const client_ID = OAuth2Data.web.client_id;*/

import './navbar.css'
import logo from '../TravelBuddyLogo.svg';
import logoText from '../TravelBuddyText.svg'
import { Link } from 'react-router-dom';

function NavBar() {
   
    return (
        <nav className="nav">
            <div className="logoContainer">
                <Link to="/homepage">
                <img src={logo} className="logo" alt="logo" />
                <img src={logoText} className="logoText" alt="logo text" />
                </Link>
            </div>
        <ul>
            <li>
                <Link to="/yourtrips">Your Trips</Link>
            </li>
        </ul>
        </nav>

    );
}


export default NavBar;
