import './homepage.css'
import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
const OAuth2Data = require('../credentials1.json');
const client_ID = OAuth2Data.web.client_id;



function HomePage() {

    const [value, setValue] = useState('');

    const handleChange = (event) => {
      setValue(event.target.value);
    };
  
   
    return (
        
        <div id="text-input">
          <input type="text" 
          value={value} 
          onChange={handleChange}
          placeholder="Enter your zipcode" />
        </div>
    );
}


export default HomePage;
