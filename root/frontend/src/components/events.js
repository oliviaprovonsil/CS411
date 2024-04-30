import React from "react";
import NavBar from "./navbar"
import { useLocation } from 'react-router-dom';
import { businesses } from './apiService'

function Events() {
  const location = useLocation();
  const data = location.state?.data;

  
  return (
    <div>
        <NavBar />
        <h1>Events</h1>
        <div>
      {/* Render your data here */}
      {data ? (
        <div>
          <ul>
            {data.businesses.map((item, index) => (
              <li key={index}>{JSON.stringify(item)}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
    </div>
    )
};

export default Events;