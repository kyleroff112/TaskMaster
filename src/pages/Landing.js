import React, { Component } from 'react';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSignup: true,
    };
  }

  toggleForm = () => {
    this.setState((prevState) => ({
      showSignup: !prevState.showSignup,
    }));
  };

  render() {
    const { showSignup } = this.state;

    return (
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6 mx-auto">
            {showSignup ? <SignupForm /> : <LoginForm />}
            <button
              className="btn btn-link"
              onClick={this.toggleForm}
            >
              {showSignup ? 'Already have an account? Log in here.' : 'Don\'t have an account? Sign up here.'}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;

