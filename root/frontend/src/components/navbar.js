/*import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
const OAuth2Data = require('../credentials1.json');
const client_ID = OAuth2Data.web.client_id;*/

import './navbar.css'
import logo from '../TravelBuddyLogo.svg';
import logoText from '../TravelBuddyText.svg'
import { Link, useMatch, useResolvedPath } from "react-router-dom"

function NavBar() {
   
    return (
        <nav className="nav">
            <div className="logoContainer">
                <img src={logo} className="logo" alt="logo" />
                <img src={logoText} className="logoText" alt="logo text" />
            </div>
        <ul>
            <li>
                <a href="/your-trips">Your Trips</a>
            </li>
        </ul>
        </nav>

    );
}


export default NavBar;
