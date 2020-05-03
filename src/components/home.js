import React from 'react';
import Fire from './../config/fire';
import icon from './../resource/icon2.png';
import Loader from './loader';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      task: '',
      loading: true,
      allTask: [],
    };
  }

  getUser = () => {
    let userMail = localStorage.getItem('email');
    return userMail.substring(0, userMail.indexOf('@'));
  };
  logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('email');
    Fire.auth().signOut();
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  addTask = (event) => {
    event.preventDefault();

    // add data to DB
    Fire.database()
      .ref('todo/')
      .child(this.getUser())
      .push({
        task: this.state.task,
        status: 'ACT',
      })
      .then((user) => this.getUserTask())
      .catch();
  };

  getUserTask = () => {
    let tasks = [];
    Fire.database()
      .ref('todo/')
      .child(this.getUser())
      .once('value')
      .then((snapshot) => {
        console.log('user obj', snapshot.val());
        snapshot.forEach((item) => {
          tasks.push({ id: item.key, ...item.val() });
        });
        this.setState({ allTask: tasks, task: '', loading: false });
      })
      .catch((e) => console.log('fetch data error:', e));
  };

  componentDidMount() {
    // get data from DB
    this.getUserTask();
  }

  generateNavBar = () => {
    return (
      <nav className="navbar-fluid navbar-primary bg-light mb-4">
        <span className="navbar-brand p-2">
          <img src={icon} width="40" height="40" alt="todo icon" />
        </span>
        <span className="navbar-brand font-weight-bold ml-1">Todo App</span>
        <button
          className="btn btn-outline-danger float-right mt-2 mr-2"
          onClick={this.logout}
        >
          Logout
        </button>
      </nav>
    );
  };

  generateTodoForm = () => {
    return (
      <div className="row">
        <form className="w-100 form-inline">
          <div className="col-sm-12 col-md-8">
            <div className="form-group">
              <input
                type="text"
                name="task"
                className="form-control w-100"
                id="task"
                value={this.state.task}
                placeholder="Enter task"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className=" col-sm-12 col-md-4 ">
            <button
              type="submit"
              onClick={this.addTask}
              className="btn btn-primary btn-block"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    );
  };

  generateTodoListItems = () => {
    const { allTask } = this.state;
    return (
      <div className="row mt-3">
        <div className="col-sm-12 col-md-8 offset-md-2">
          <ul className="list-group">
            {allTask &&
              allTask.map((item) => (
                <li key={item.id} className="list-group-item">
                  {item.task}
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  };

  render() {
    const { loading, allTask } = this.state;
    return (
      <div className="container">
        {this.generateNavBar()}
        {this.generateTodoForm()}
        {loading ? <Loader /> : this.generateTodoListItems()}
      </div>
    );
  }
}

export default Home;
