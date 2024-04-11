import './homepage.css'
import NavBar from'./navbar'
import React, { useState } from 'react';


/* import { GoogleLogin } from 'react-google-login';
const OAuth2Data = require('../credentials1.json');
const client_ID = OAuth2Data.web.client_id; */

function HomePage() {
    const [value, setValue] = useState('');
    const [arrivalDate, setArrivalDate] = useState('');
    const [departureDate, setDepartureDate] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleArrivalDateChange = (event) => {
        setArrivalDate(event.target.value);
    };

    const handleDepartureDateChange = (event) => {
        const newDepartureDate = event.target.value;

        // Perform validation
        if (new Date(newDepartureDate) <= new Date(arrivalDate)) {
            alert('Departure date must be later than arrival date');
            // Reset the departure date
            setDepartureDate('');
        } else {
            setDepartureDate(newDepartureDate);
        }
    
      }

    return (
        <div>
            <NavBar />
            <h1>Use Your Travel Buddy</h1>
            
            <div id="text-input">
                <input 
                    type="text"
                    value={value}
                    onChange={handleChange}
                    placeholder="Enter your zipcode"
                />
            </div>

            <div id="arrival-date">
                <p>Arrival Date:</p>
                <input 
                    type="date" 
                    name="arrival" 
                    value={arrivalDate} 
                    onChange={handleArrivalDateChange}
                />
            </div>

            <div id="departure-date">
                <p>Departure Date:</p>
                <input 
                    type="date" 
                    name="departure" 
                    value={departureDate} 
                    onChange={handleDepartureDateChange}
                />
            </div>  

            <div className="search-button">

            </div>  
        </div>
    );
}


export default HomePage;
