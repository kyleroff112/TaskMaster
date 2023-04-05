import React, { useState } from "react";
import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";
import Dashboard from "./dashboard";
import axios from "axios";

function Landing(props) {
  const [showSignup, setShowSignup] = useState(!props.showLoginForm);

  const handleToggleForm = () => {
    setShowSignup(!showSignup);
  };

  const handleLoginSubmit = async (event, credentials) => {
    event.preventDefault(); // add this line
    props.handleLogin(credentials);
  };

  const handleSignupSubmit = async (credentials) => {
    props.handleSignup(credentials);
  };

  return (
    <div>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6 mx-auto">
            {showSignup ? (
              <SignupForm
                handleFormToggle={handleToggleForm}
                handleSubmit={handleSignupSubmit}
              />
            ) : (
              <LoginForm
                handleFormToggle={handleToggleForm}
                handleSubmit={(event, credentials) =>
                  handleLoginSubmit(event, credentials)
                }
                handleLogin={props.handleLogin}
              />
            )}
            <button className="btn btn-link" onClick={handleToggleForm}>
              {showSignup
                ? "Already have an account? Log in here."
                : "Don't have an account? Sign up here."}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
