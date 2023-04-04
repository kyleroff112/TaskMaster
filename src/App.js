import React, { useState, useEffect } from 'react';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import axios from 'axios';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
      setShowLoginForm(false);
      setUserId(localStorage.getItem('userId'));
    }
  }, []);

  const handleLogin = async (credentials) => {
    const response = await axios.post('http://localhost:5000/api/users/login', credentials);
    if (response && response.data) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      setLoggedIn(true);
      setShowLoginForm(false);
      setUserId(response.data.userId);
      console.log('login successful');
    }
  };

  const handleSignup = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/signup', credentials);
      if (response && response.data) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
        setLoggedIn(true);
        setShowLoginForm(false);
        setUserId(response.data.userId);
        console.log('signup successful');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (

    <div className="App">
      {loggedIn ? (
        <Dashboard userId={userId} setLoggedIn={setLoggedIn} setShowLoginForm={setShowLoginForm} />
      ) : (
        <div>
          <Landing showLoginForm={showLoginForm} handleLogin={handleLogin} handleSignup={handleSignup} />
        </div>
      )}
    </div>
  );
}
export default App;