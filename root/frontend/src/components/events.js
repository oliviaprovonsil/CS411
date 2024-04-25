import React from "react";
import NavBar from "./navbar"
import { useLocation } from 'react-router-dom';
import { businesses } from './apiService'

function Events() {
  // const location = useLocation();
  // const data = location.state.data;
  // console.log("from events", data)

  
  return (
    <div>
        <NavBar />
        <h1>Events</h1>
    </div>
    )
};

export default Events;