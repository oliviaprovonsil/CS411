import './App.css';
import Login from './components/login';
import GoogleButton from './components/googleButton';


import logo from './TravelBuddyLogo.svg';
import logoText from './TravelBuddyText.svg'

import HomePage from './components/homepage';
import NavBar from './components/navbar';

const OAuth2Data = require('./credentials1.json');
const client_ID = OAuth2Data.web.client_id;


function App() {


  return (
    <div>
    <div className="App">
      <header className="App-header">
        {/* <Login /> */}
        <NavBar />
        <HomePage />
      </header>
    </div>

    </div>
    
  );
}

export default App;
