import React from 'react';
import Fire from './../config/fire';
import todo from './../resource/todo.gif';
import Loader from './loader';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  signUp = (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    const { email, password, error } = this.state;
    Fire.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log('SignUp User :', user);
        this.setState({ loading: false });
      })
      .catch((e) => this.setState({ error: e.message, loading: false }));
  };

  signIn = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;
    Fire.auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log('sign In User', user);
        this.setState({ loading: true });
      })
      .catch((e) => this.setState({ error: e.message, loading: false }));
  };

  loginForm = () => {
    return (
      <div className="row h-100">
        <div className="col-sm-12 col-md-6 mt-auto mb-auto">
          <img src={todo} className="img-fluid" alt="todo Task" />
        </div>
        <div className="col-sm-12 col-md-6 mt-auto mb-auto text-center">
          <form>
            <h1>Todo App</h1>
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
            <div className="row m-auto">
              <div className="col-sm-12 col-md-6">
                <button
                  type="submit"
                  onClick={this.signUp}
                  className="btn btn-secondary btn-block mt-2"
                >
                  Sign Up
                </button>
              </div>
              <div className="col-sm-12 col-md-6">
                <button
                  type="submit"
                  onClick={this.signIn}
                  className="btn btn-primary btn-block mt-2"
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
      </div>
    );
  };

  render() {
    if (this.state.loading) {
      return <Loader />;
    }

    return this.loginForm();
  }
}

export default Login;
