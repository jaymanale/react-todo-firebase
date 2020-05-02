import React from 'react';
import Fire from './../config/fire';

class Home extends React.Component {
  constructor(props) {
    console.log('Home', props);
    super(props);
    this.state = {
      task: '',
      allTask: [],
    };
  }

  logout = () => {
    localStorage.removeItem('user');
    Fire.auth().signOut();
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  addTask = (event) => {
    event.preventDefault();
    const { task, allTask } = this.state;
    const tasks = [...allTask, task];
    this.setState({ allTask: tasks });
  };

  render() {
    return (
      <div className="container text-center m-auto">
        <div>
          <span className="display-4">Todo App</span>
          <button className="float-right" onClick={this.logout}>
            Logout
          </button>
        </div>
        <form>
          <div className="form-group">
            <input
              type="text"
              name="task"
              className="form-control"
              id="task"
              placeholder="Enter task"
              onChange={this.handleChange}
            />
          </div>
          <button
            type="submit"
            onClick={this.addTask}
            className="btn btn-primary m-auto"
          >
            Add Task
          </button>
        </form>
      </div>
    );
  }
}

export default Home;
