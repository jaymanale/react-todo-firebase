import React from 'react';
import Fire from './../config/fire';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  signUp = (event) => {
    event.preventDefault();

    const { email, password } = this.state;
    Fire.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log('SignUp User :', user);
      })
      .catch((e) => console.log('Sign Up Error:', e));
  };

  signIn = (event) => {
    event.preventDefault();

    const { email, password } = this.state;
    Fire.auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log('sign In User', user);
      })
      .catch((e) => console.log('Error in SignIn', e));
  };

  render() {
    return (
      <form>
        <input type="email" name="email" onChange={this.handleChange} />
        <input type="password" name="password" onChange={this.handleChange} />
        <button type="submit" onClick={this.signUp}>
          Sign Up
        </button>
        <button type="submit" onClick={this.signIn}>
          Sign In
        </button>
      </form>
    );
  }
}

export default Login;
