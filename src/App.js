const LoginForm = ({ handleLogin, handleSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); // Define the setLoggedIn function

  const handleLogin = async ({ username, password }) => {
    try {
      const response = await fetch('/App', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      setLoggedIn(true); // Use the setLoggedIn function
    } catch (err) {
      setError(err.message); // Use the setError function
    }
  };

  const handleSignup = async ({ username, password }) => {
    try {
      const response = await fetch('/App', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      setLoggedIn(true); // Use the setLoggedIn function
    } catch (err) {
      setError(err.message); // Use the setError function
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      await handleLogin({ username, password });
    } catch (err) {
      setError(err.message); // Use the setError function
    }
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    try {
      await handleSignup({ username: signupUsername, password: signupPassword });
    } catch (err) {
      setError(err.message); // Use the setError function
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
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button className="btn btn-primary" type="submit">Login</button>
        </form>
        <hr />
        <h2>Signup</h2>
        <form onSubmit={handleSignupSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="form-group">
            <label htmlFor="signupUsername">Username:</label>
            <input
              type="text"
              className="form-control"
              id="signupUsername"
              value={signupUsername}
              onChange={(event) => setSignupUsername(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="signupPassword">Password:</label>
            <input
              type="password"
              className="form-control"
              id="signupPassword"
              value={signupPassword}
              onChange={(event) => setSignupPassword(event.target.value)}
            />
          </div>
          <button className="btn btn-primary" type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
