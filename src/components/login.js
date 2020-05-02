import React from 'react';
import Fire from './../config/fire';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  signUp = (event) => {
    event.preventDefault();

    const { email, password, error } = this.state;
    Fire.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log('SignUp User :', user);
      })
      .catch((e) => this.setState({ error: e.message }));
  };

  signIn = (event) => {
    event.preventDefault();

    const { email, password } = this.state;
    Fire.auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log('sign In User', user);
      })
      .catch((e) => this.setState({ error: e.message }));
  };

  loginForm = () => {
    return (
      <div className="row h-100">
        <div className="col-md-6 mt-auto mb-auto">
          <form>
            <div className="form-group">
              <input
                type="email"
                name="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                onChange={this.handleChange}
              />
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <button
                  type="submit"
                  onClick={this.signUp}
                  className="btn btn-secondary btn-block m-auto"
                >
                  Sign Up
                </button>
              </div>
              <div className="col-sm-12 col-md-6">
                <button
                  type="submit"
                  onClick={this.signIn}
                  className="btn btn-primary btn-block m-auto"
                >
                  Sign In
                </button>
              </div>
            </div>
            {this.state.error && (
              <p className="text-center text-danger mt-1">{this.state.error}</p>
            )}
          </form>
        </div>
        <div className="col-md-6">logo goes here</div>
      </div>
    );
  };

  render() {
    return this.loginForm();
  }
}

export default Login;
