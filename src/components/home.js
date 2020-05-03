import React from 'react';
import Fire from './../config/fire';
import icon from './../resource/icon2.png';
import Loader from './loader';
import logoutIcon from './../resource/logout.png';
import editIcon from './../resource/edit2.png';
import deleteIcon from './../resource/delete.png';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      task: '',
      id: null,
      loading: true,
      edit: false,
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
      .catch((e) => {
        console.log('Error in Add:', e);
      });
  };
  updateTask = (item) => {
    this.setState({ id: item.id, task: item.task, edit: true });
  };

  saveUpdateTask = (event) => {
    event.preventDefault();
    const { id, task, allTask } = this.state;
    console.log('ID', id);
    const originalTasks = [...allTask];
    console.log('all', originalTasks);
    const taskId = id;
    const taskName = task;

    const updateTask = originalTasks.filter((item) => item.id != id);
    updateTask.unshift({ task: task, id: id, status: 'ACT' });
    this.setState({ allTask: updateTask, task: '', edit: false, id: null });

    Fire.database()
      .ref('todo/')
      .child(this.getUser())
      .child(taskId)
      .set({
        task: taskName,
        status: 'ACT',
      })
      .then((update) => {
        console.log('update:', update);
        //        this.getUserTask();
      })
      .catch((e) => {
        console.log('error in update', e);
        this.setState({ allTask: originalTasks });
      });
  };
  removeTask = (id) => {
    Fire.database()
      .ref('todo/')
      .child(this.getUser())
      .child(id)
      .remove()
      .then((user) => {
        console.log('Delete:', user);
        this.getUserTask();
      })
      .catch((e) => console.log('Delete error', e));
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
        this.setState({
          allTask: tasks,
          task: '',
          loading: false,
          edit: false,
        });
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
        <span className=" ml-1">Todo</span>
        <img
          src={logoutIcon}
          alt="logout"
          className="link float-right m-2"
          width="40"
          height="40"
          onClick={this.logout}
        />
        {/* <button
          className="btn btn-outline-danger float-right mt-2 mr-md-3"
          onClick={this.logout}
        >
          Logout
        </button> */}
      </nav>
    );
  };

  generateTodoAddForm = () => {
    const { edit } = this.state;
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
            {edit ? (
              <button
                type="submit"
                onClick={this.saveUpdateTask}
                className="btn btn-primary btn-block"
              >
                Update Task
              </button>
            ) : (
              <button
                type="submit"
                onClick={this.addTask}
                className="btn btn-primary btn-block"
              >
                Add Task
              </button>
            )}
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
                <div key={item.id} className="card border-primary   mb-3 w-100">
                  <div className="card-body text-dark">
                    <p className="card-text">{item.task}</p>
                  </div>
                  <div className="card-footer">
                    <img
                      src={editIcon}
                      alt="edit"
                      className=" p-2"
                      width="40"
                      height="40"
                      onClick={() => this.updateTask(item)}
                    />
                    <img
                      src={deleteIcon}
                      alt="delete"
                      className=" ml-3 p-2"
                      width="40"
                      height="40"
                      onClick={() => this.removeTask(item.id)}
                    />
                  </div>
                </div>
              ))}
          </ul>
        </div>
      </div>
    );
  };

  render() {
    const { loading, allTask, edit } = this.state;
    return (
      <div className="container">
        {this.generateNavBar()}
        {this.generateTodoAddForm()}
        {loading ? <Loader /> : this.generateTodoListItems()}
      </div>
    );
  }
}

export default Home;
