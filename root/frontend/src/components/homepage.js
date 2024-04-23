import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from './navbar';
import './homepage.css';

const cities = [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
    'London', 'Paris', 'Berlin', 'Madrid', 'Rome', 'Moscow', 'Beijing', 'Tokyo', 'Seoul', 'Mumbai',
    'Cairo', 'Lagos', 'Cape Town', 'Nairobi', 'Sydney', 'Melbourne', 'Buenos Aires', 'São Paulo', 'Lima', 'Bogotá',
    'Vancouver', 'Toronto', 'Montreal', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg', 'Quebec City', 'Halifax', 'Victoria',
    'Jakarta', 'Shanghai', 'Karachi', 'Delhi', 'Istanbul', 'Dhaka', 'Bangkok', 'Kuala Lumpur', 'Athens', 'Lisbon',
    'Budapest', 'Prague', 'Warsaw', 'Stockholm', 'Vienna', 'Amsterdam', 'Brussels', 'Helsinki', 'Oslo', 'Copenhagen',
    'Kiev', 'St. Petersburg', 'Lahore', 'Chennai', 'Bangalore', 'Hyderabad', 'Pune', 'Ahmedabad', 'Kathmandu', 'Colombo',
    'Mexico City', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana', 'Santiago', 'Caracas', 'Quito', 'Tehran',
    'Dubai', 'Doha', 'Riyadh', 'Jeddah', 'Mecca', 'Baghdad', 'Amman', 'Beirut', 'Jerusalem', 'Rio de Janeiro',
    'Algiers', 'Accra', 'Addis Ababa', 'Antananarivo', 'Auckland', 'Busan', 'Brisbane', 'Casablanca', 'Chiang Mai', 'Da Nang',
    'Dakar', 'Dar es Salaam', 'Durban', 'Fukuoka', 'Guangzhou', 'Hanoi', 'Ho Chi Minh City', 'Hong Kong', 'Isfahan', 'Islamabad',
    'Johannesburg', 'Khartoum', 'Kinshasa', 'Kolkata', 'Kyoto', 'Luanda', 'Lusaka', 'Lyon', 'Marrakech', 'Minsk',
    'Monaco', 'Montevideo', 'Nagoya', 'Naples', 'Osaka', 'Panama City', 'Perth', 'Port Elizabeth', 'Port Moresby', 'Rabat',
    'San Francisco', 'Sapporo', 'Seattle', 'Seville', 'Singapore', 'St. Louis', 'Tel Aviv', 'Tripoli', 'Tunis', 'Ulaanbaatar',
    'Valencia', 'Venice', 'Vladivostok', 'Wellington', 'Xiamen', 'Yangon', 'Zagreb', 'Zurich'
];

function HomePage() {
    const [input, setInput] = useState("");
    const [filteredCities, setFilteredCities] = useState([]);

    const handleInputChange = (e) => {
        const userInput = e.target.value;
        setInput(userInput);

        if (!userInput) {
            setFilteredCities([]);
            return;
        }

        const filter = userInput.toLowerCase();
        const filtered = cities.filter(city => city.toLowerCase().includes(filter));
        setFilteredCities(filtered.slice(0, 5)); // Limit to 5 suggestions
    };

    const handleSelectCity = (city) => {
        setInput(city);
        setFilteredCities([]);
    };

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (cities.includes(input)) {
                await handleSearch();
            }
        }
    };

    const handleButtonClick = async () => {
        if (cities.includes(input)) {
            await handleSearch();
        }
    };

    const handleSearch = async () => {
        try {
            const response = await fetch('http://localhost:5000/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ searchQuery: input }),
            });
            const data = await response.json();
            console.log("Response from the frontend", data);
            setInput(''); // Clear input after successful search
        } catch (err) {
            console.error("Error in user input:", err);
        }
    };

    return (
        <div className="background-container">
            <NavBar />
            <h1>
                <span className="white-text">Enjoy Vacation. </span>
                <span className="blue-text"> Rain or Shine.</span>
            </h1>

            <div id="text-input">
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter a city or zipcode"
                />
                {filteredCities.length > 0 && (
                    <ul className="city-dropdown">
                        {filteredCities.map((city, index) => (
                            <li key={index} onClick={() => handleSelectCity(city)}>{city}</li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="search-button">
                <Link to="/events">
                    <button className="search" onClick={handleButtonClick}>Search</button>
                </Link>
            </div>
        </div>
    );
}

export default HomePage;
