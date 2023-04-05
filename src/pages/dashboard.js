import React, { Component } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import axios from 'axios';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      showTaskForm: false
    };
  }

  async componentDidMount() {
    const tasks = await this.getTasks();
    this.setState({ tasks });
  }

  getTasks = async () => {
    console.log('userId:', this.props.userId); // add this line
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${this.props.userId}/tasks`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  

  createTask = async (task) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/users/tasks`, {
        ...task,
        userId: this.props.userId,
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Pass the token as a Bearer token
        }
      });
  
      // Update the state with the new task
      this.setState((prevState) => ({
        tasks: [...prevState.tasks, response.data.task],
      }));
  
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
   
  deleteTask = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/users/tasks/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Pass the token as a Bearer token
        }
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  handleCreateTask = async (task) => {
    try {
      const data = await this.createTask(task);
      this.setState((prevState) => ({
        tasks: [...prevState.tasks, data.task]
      }));
    } catch (err) {
      console.log(err);
    }
  };
  
  handleCompleteTask = async (id) => {
    await this.completeTask(id);
    const tasks = await this.getTasks();
    this.setState({ tasks });
  }
  
  handleDeleteTask = async (id) => {
    await this.deleteTask(id);
    const tasks = await this.getTasks();
    this.setState({ tasks });
  }

  handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  handleToggleTaskForm = () => {
    this.setState((prevState) => ({
      showTaskForm: !prevState.showTaskForm
    }));
  };

  render() {
    const { tasks, showTaskForm } = this.state;
    console.log("Tasks State:", tasks); // Added console.log statement
    return (
      <div className="dashboard-container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          <a className="navbar-brand" href="/">Dashboard</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <button className="btn btn-outline-primary" onClick={this.handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </nav>
        <div className="dashboard-content">
          <div className="container mt-5">
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <div className="mb-3">
                  <button className="btn btn-primary mt-3" onClick={this.handleToggleTaskForm}>Create a New Task</button>
                </div>
                {showTaskForm && <TaskForm userId={this.props.userId} createTask={this.createTask} />}
                <TaskList tasks={tasks} handleDeleteTask={this.handleDeleteTask} handleCompleteTask={this.handleCompleteTask} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  

}

export default Dashboard
