import React from 'react';
import { GoogleLogin } from 'react-google-login';
const OAuth2Data = require('../credentials1.json');
const client_ID = OAuth2Data.web.client_id;

function GoogleButton() {

    const onSuccess = (res) => {
        console.log("Login Successful: ", res.profileObj)
    }
    const onFailure = (res) => {
        console.log("Login Failed: ", res)
    }
    
    return (
        <div id="googleLogin">
            <GoogleLogin 
            clientId={client_ID}
            buttonText="Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
            />
        </div>
    );
}

export default GoogleButton;
