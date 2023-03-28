import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        username,
        password,
      });
      if (response && response.data) {
        setSuccessMessage(response.data.message);
        setUsername('');
        setPassword('');
        console.log('login successful');
      }
    } catch (err) {
      setErrorMessage(err.response.data.message);
    }
  };



  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="login-form-container">
        <h2>Login</h2>
        <form onSubmit={handleLoginSubmit}>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              className="form-control"
              id="loginusername"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="loginpassword">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
