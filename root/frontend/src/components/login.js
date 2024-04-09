import React, { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import './login.css'
import logo from '../TravelBuddyLogo.svg';
import logoText from '../TravelBuddyText.svg'
import GoogleButton from './googleButton';
const OAuth2Data = require('../credentials1.json');
const client_ID = OAuth2Data.web.client_id;
function Login() {
  
    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: client_ID,
                scope: ""
            })
        };

        gapi.load('client:auth2', start)
    })

   
    return(
        <div className="logo-container">
        <img src={logo} className="App-logo" alt="logo" />
        <img src={logoText} className="App-logo-text" alt="logo" />
        <GoogleButton />
    
        </div>
        
    )
}

export default Login