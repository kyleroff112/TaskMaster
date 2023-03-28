import React, { useState } from 'react';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';
import axios from 'axios';

function Landing(props) {
  const [showSignup, setShowSignup] = useState(!props.showLoginForm);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleToggleForm = () => {
    setShowSignup(!showSignup);
  };

  const handleLoginSubmit = async (event, credentials) => {
    event.preventDefault(); // add this line
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', credentials);
      if (response && response.data) {
        props.handleLogin(credentials);
        setSuccessMessage(response.data.message);
        console.log('login successful');
      }
    } catch (err) {
      setErrorMessage(err.response.data.message);
    }
  };

  const handleSignupSubmit = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/signup', credentials);
      if (response && response.data) {
        props.handleSignup(credentials);
        setSuccessMessage(response.data.message);
      }
    } catch (err) {
      setErrorMessage(err.response.data.message);
    }
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6 mx-auto">
          {showSignup ? (
            <SignupForm handleFormToggle={handleToggleForm} handleSubmit={handleSignupSubmit} />
          ) : (
            <LoginForm handleFormToggle={handleToggleForm} handleSubmit={(event, credentials) => handleLoginSubmit(event, credentials)} handleLogin={props.handleLogin} />
          )}
          <button className="btn btn-link" onClick={handleToggleForm}>
            {showSignup
              ? "Already have an account? Log in here."
              : "Don't have an account? Sign up here."}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Landing;
