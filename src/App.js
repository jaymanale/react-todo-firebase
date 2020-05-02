import React from 'react';
import './App.css';
import Fire from './config/fire';
import Login from './components/login';
import Home from './components/home';

class App extends React.Component {
  constructor(props) {
    console.log('constructor props:', props);
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    Fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }

  render() {
    const { user } = this.state;
    return (
      <div className="container">
        {this.state.user ? <Home user={user} /> : <Login />}
      </div>
    );
  }
}

export default App;
