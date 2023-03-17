import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import TaskList from './components/TaskList';
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
        <TaskList />
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
