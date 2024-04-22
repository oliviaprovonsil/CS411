import React from "react";
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import NavBar from "./navbar";

function Events() {
  const location = useLocation(); // Access location object
  const events = location.state?.events; // Access events passed through state

  return (
    <div>
      <NavBar />
      <h1>Events</h1>
      <div>
        {events ? events.map(event => (
          <div key={event.id}>
            <h2>{event.name}</h2>
            <p>{event.location.address1}</p>
            <p>{event.phone}</p>
          </div>
        )) : <p>No events found</p>}
      </div>
    </div>
  );
};

export default Events;
