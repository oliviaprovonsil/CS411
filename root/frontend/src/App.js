/* import './App.css'; */

/*import Login from './components/login';
import GoogleButton from './components/googleButton';
import logo from './TravelBuddyLogo.svg';
import logoText from './TravelBuddyText.svg'*/

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import HomePage from './components/homepage';
import YourTrips from './components/yourtrips';
import Events from './components/events';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/yourtrips" element={<YourTrips />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Render the App component to the DOM
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

export default App;
