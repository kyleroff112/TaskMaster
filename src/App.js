import React, { useState } from 'react';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import axios from 'axios';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);

  const handleLogin = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', credentials);
      if (response && response.data) {
        setLoggedIn(true);
        setShowLoginForm(false);
        console.log('login successful');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignup = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/signup', credentials);
      if (response && response.data) {
        setLoggedIn(true);
        setShowLoginForm(false);
        console.log('signup successful');
      }
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <div className="App">
      {loggedIn ? (
        <Dashboard />
      ) : (
        <div>
          <Landing showLoginForm={showLoginForm} handleLogin={handleLogin} handleSignup={handleSignup} />
        </div>
      )}
    </div>
  );
}

export default App;
