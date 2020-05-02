import React from 'react';
import Fire from './../config/fire';

class Home extends React.Component {
  constructor(props) {
    console.log('Home', props);
    super(props);
    this.state = {};
  }

  logout = () => {
    Fire.auth().signOut();
  };

  render() {
    return (
      <div>
        <h1> Welcome to home</h1>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default Home;
