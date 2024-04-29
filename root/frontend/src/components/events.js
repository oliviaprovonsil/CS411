import React from "react";
import NavBar from "./navbar";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { businesses } from './apiService';
import './events.css'

function Events() {
  const location = useLocation();
  const data = location.state?.data;

  // Extract the first item from the data.businesses array
  const firstEvent = data?.businesses[0];

  return (
    <div className = "events-container"> 
      <NavBar />
      <div className = "events-title">
        {/* Render Input to Title*/}
        {firstEvent && (
          <div className = "inline">
            <h2>Things To Do Today in </h2>
            <p>{JSON.stringify(firstEvent)}</p>
          </div>
        )}

           {/* Render the list of events excluding the first event */}
           {data ? (
          <div className = "event-list">
            <ul>
              {data.businesses.slice(1).map((item, index) => ( // Exclude the first event
                <li key={index}>{JSON.stringify(item)}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div>Loading...</div>
        )}
         {/* Button to route to "yourtrips" page */}
         <div className="save-container">
          <Link to="/yourtrips">
            <button className="button">Go to Your Trips</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Events;