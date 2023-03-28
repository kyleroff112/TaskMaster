import React, { useState } from 'react';
import { login } from '../api/services/userService';

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await login(username, password);
      handleLogin(data);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="login-form-container">
        <h2>Login</h2>
        <form onSubmit={handleLoginSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
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

