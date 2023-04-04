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
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }


  deleteTask = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
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
      <div className="bg-secondary p-3">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="text-white">Dashboard</h1>
          <button className="btn btn-outline-light" onClick={this.handleLogout}>Logout</button>
        </div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="mb-3">
                <button className="btn btn-primary" onClick={this.handleToggleTaskForm}>Add Task</button>
              </div>
              {showTaskForm && <TaskForm userId={this.props.userId} createTask={this.createTask} />}
              <TaskList tasks={tasks} handleDeleteTask={this.handleDeleteTask} />
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Dashboard
