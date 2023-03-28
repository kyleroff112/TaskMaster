import React, { useState } from 'react';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);

  const handleLogin = async (credentials) => {
    // handle login logic here
    setLoggedIn(true);
  };

  const handleSignup = async (credentials) => {
    // handle signup logic here
    setLoggedIn(true);
  };

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
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

