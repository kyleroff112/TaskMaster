import React, { useState, useEffect } from 'react';
import Landing from './pages/landing';
import Dashboard from './pages/dashboard';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from './utils/mutations';
import { CREATE_USER } from './utils/mutations';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [userId, setUserId] = useState(null);

  const [login] = useMutation(LOGIN_USER)
  const [signup] = useMutation(CREATE_USER)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
      setShowLoginForm(false);
      setUserId(localStorage.getItem('userId'));
    }
  }, []);

  const handleLogin = async (credentials) => {
    const response = await login({ variables: { ...credentials } });
    console.log(response);
    if (response && response.data) {
      localStorage.setItem('token', response.data.login.token);
      localStorage.setItem('userId', response.data.login.user.id);
      setLoggedIn(true);
      setShowLoginForm(false);
      setUserId(response.data.login.user.id);
      console.log('login successful');
    }
  };

  const handleSignup = async (credentials) => {
    try {
      const response = await signup({ variables: { ...credentials } });
      console.log(response);
      if (response && response.data) {
        localStorage.setItem('token', response.data.createUser.token);
        localStorage.setItem('userId', response.data.createUser.user.id);
        setLoggedIn(true);
        setShowLoginForm(false);
        setUserId(response.data.createUser.user.id);
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