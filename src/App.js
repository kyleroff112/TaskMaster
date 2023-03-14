import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async (credentials) => {
    // handle login logic here
    setLoggedIn(true);
  };

  const handleSignup = async (credentials) => {
    // handle signup logic here
    setLoggedIn(true);
  };

  return (
    <div className="App">
      {loggedIn ? (
        <h1>Welcome to the app!</h1>
      ) : (
        <div>
          <LoginForm handleLogin={handleLogin} handleSignup={handleSignup} />
          <SignupForm handleSignup={handleSignup} />
        </div>
      )}
    </div>
  );
}

export default App;
