import React, { Component } from 'react';
import TaskForm from '../components/TaskForm';
import axios from 'axios';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  }

  async componentDidMount() {
    const tasks = await this.getTasks();
    this.setState({ tasks });
  }

  getTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${this.props.userId}/tasks`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  createTask = async (task) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/users/${this.props.userId}/tasks`, task);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  deleteTask = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  handleCreateTask = async (task) => {
    await this.createTask(task);
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

  render() {
    const { tasks } = this.state;
    return (
      <div className="bg-secondary p-3">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="text-white">Dashboard</h1>
          <button className="btn btn-outline-light" onClick={this.handleLogout}>Logout</button>
        </div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <TaskForm userId={this.props.userId} onCreateTask={this.handleCreateTask} />
              {/* <TaskList /> */}
            </div>
          </div>
        </div>
      </div>
    );
  }

}


export default Dashboard;
