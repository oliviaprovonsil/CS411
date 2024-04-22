import axios from 'axios';
import './homepage.css'
import NavBar from './navbar'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


/* import { GoogleLogin } from 'react-google-login';
const OAuth2Data = require('../credentials1.json');
const client_ID = OAuth2Data.web.client_id; */

function HomePage() {

    /* Arrival-Departure*/
    const [value, setValue] = useState('');
    const navigate = useNavigate();
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

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/location', { city: value });
            // Navigate to '/events' route and pass event data
            navigate('/events', { state: { events: response.data.events } });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="background-container">
            <NavBar />
            <h1>
                <span class="white-text">Enjoy Vacation. </span>
                <span class="blue-text"> Rain or Shine.</span>
            </h1>

            <div id="text-input">
                <input
                    type="text"
                    value={value}
                    onChange={handleChange}
                    placeholder="Enter a city or zipcode"
                />
            </div>

            <div id="arrival-departure-container">
                <div id="arrival-date">
                    <p>Arrival:</p>
                    <input type="date" name="arrival" value={arrivalDate} onChange={handleArrivalDateChange} />
                </div>
                <div id="departure-date">
                    <p>Departure:</p>
                    <input type="date" name="departure" value={departureDate} onChange={handleDepartureDateChange} />
                </div>
            </div>

            <div className="search-button">
                <Link to="/events">
                    <button className="search" onClick={handleSubmit}>Search</button>
                </Link>
            </div>
        </div>
    );
}


export default HomePage;
