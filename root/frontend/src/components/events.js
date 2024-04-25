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
          {data.businesses}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
    </div>
    )
};

export default Events;