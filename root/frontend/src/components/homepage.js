import ApiService from './apiService';
import './homepage.css'
import NavBar from'./navbar'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';


/* import { GoogleLogin } from 'react-google-login';
const OAuth2Data = require('../credentials1.json');
const client_ID = OAuth2Data.web.client_id; */

function HomePage() {
    
    /* Arrival-Departure*/
    const [value, setValue] = useState('');
    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const handleChange = (event) => {
        setValue(event.target.value);
    };

  

      const handleKeyDown =  async (event) => {
        if (event.key === 'Enter'){
          event.preventDefault();
          SearchButton();
    
          try {
            const response = await fetch('http://localhost:5000/search', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({searchQuery: input}),
            });
            const data = await response.json();
            navigate('/events', { state: { data: data } });
            console.log("this is from the frontend", data);
            setInput('')
          } catch (err){
            console.error("Error in user input:", err);
          }
        }
      }

      const handleButtonClick = async () => {
        SearchButton();
    };

    const SearchButton = async () => {
        try {
            const response = await fetch('http://localhost:5000/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ searchQuery: input }),
            });
            const data = await response.json();
            navigate('/events', { state: { data: data } });
            setInput('');
        } catch (err) {
            console.error("Error in user input:", err);
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
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter a city or zipcode"
                />
            </div>


            <div className="search-button">
            <Link to="/events">
                <button className="search" onClick={handleButtonClick}> Search</button>
            </Link>
            </div>
        </div>
    );
}


export default HomePage;
