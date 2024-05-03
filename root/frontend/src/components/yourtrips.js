import React from "react";
import NavBar from "./navbar"
import { useEffect, useState } from 'react';

function YourTrips() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch('http://localhost:5000/getTrips');
        const data = await response.json();
        setTrips(data);
    };
    fetchData();
}, []);

    return (
      <div>
          <NavBar />
          <h1>Your Trips</h1>
          <div>
              {trips.map((trip, index) => (
                  <div key={index}>
                      <h3>{trip.location}</h3> 
                      <ul>
                      {trip.businesses.slice(1).map((business, idx) => (  
                              <li key={idx}>{business}</li>  
                          ))}
                      </ul>
                  </div>
              ))}
          </div>
      </div>
  );
}

export default YourTrips;