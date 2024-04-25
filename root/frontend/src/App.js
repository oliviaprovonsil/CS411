/* import './App.css'; */

/*import Login from './components/login';
import GoogleButton from './components/googleButton';
import logo from './TravelBuddyLogo.svg';
import logoText from './TravelBuddyText.svg'*/

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login"
import HomePage from './components/homepage';
import YourTrips from './components/yourtrips';
import Events from './components/events';
import ApiService from "./components/apiService";

const OAuth2Data = require('./credentials1.json');
const client_ID = OAuth2Data.web.client_id;


function App() {
  return (
    
    <div className="App">
      
      <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/yourtrips" element={<YourTrips />} />
        <Route path="/events" element={<Events />} />
      </Routes>
      </BrowserRouter>
      {/* <ApiService /> */}
    </div>
  );
}

export default App;
