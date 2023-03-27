import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import TaskList from './components/TaskList';
import TaskListTest from './components/TaskListTest';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showTaskList, setShowTaskList] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      setShowTaskList(true);
    } else {
      setShowTaskList(false);
    }
  }, [loggedIn]);

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
        <h1>Welcome to the Dashboard</h1>
      ) : (
        <div>
          <LoginForm handleLogin={handleLogin} handleSignup={handleSignup} />
          <SignupForm handleSignup={handleSignup} />
        </div>
      )}
      {showTaskList && <TaskListTest />}
    </div>
  );
}


export default App;
