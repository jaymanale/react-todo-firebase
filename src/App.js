import React from 'react';
import './App.css';
import Fire from './config/fire';
import Login from './components/login';
import Home from './components/home';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: localStorage.getItem('user'),
    };
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    Fire.auth().onAuthStateChanged((user) => {
      console.log('User', user);
      if (user) {
        localStorage.setItem('user', user.uid);
        localStorage.setItem('email', user.email);
        this.setState({ user });
      } else {
        localStorage.removeItem('user');
        localStorage.removeItem('email');
        this.setState({ user: null });
      }
    });
  }

  render() {
    const { user } = this.state;
    return (
      <div className="container">{this.state.user ? <Home /> : <Login />}</div>
    );
  }
}

export default App;
