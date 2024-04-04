import './App.css';
import logo from './TravelBuddyLogo.svg';
import logoText from './TravelBuddyText.svg'
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
const OAuth2Data = require('./credentials.json');
const client_ID = OAuth2Data.web.client_id;


function App() {

  <GoogleOAuthProvider clientId={client_ID}>...</GoogleOAuthProvider>;

  const onSuccess = (res) => {
    console.log("Login Successful: ", res);
};
const onFailure = (res) => {
    console.log("Login Failure: ", res);
}
  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-container">
        <img src={logo} className="App-logo" alt="logo" />
        <img src={logoText} className="App-logo-text" alt="logo" />
        </div>
        <div id="signInButton">
            <GoogleLogin 
            clientId={client_ID}
            buttonText="Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true} />
            </div>
      </header>
    </div>
  );
}

export default App;
