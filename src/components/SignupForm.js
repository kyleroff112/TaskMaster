import React, { useState } from 'react';
import axios from 'axios';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';



const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [signup] = useMutation(CREATE_USER)
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await signup({ variables: { email, password, username } });;
      setSuccessMessage('Signup successful! Please login.');
      setUsername('');
      setPassword('');
      setEmail('');
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="signup-form-container">
        <h1>TaskMaster</h1>
        <h2>Signup Form</h2>
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <form onSubmit={handleSignupSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              className="form-control"
              id="signupusername"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="form-control"
              id="signuppassword"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <button className="btn btn-primary" type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
