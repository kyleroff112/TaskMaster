import React, { Component } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { createTask, getTasks, deleteTask } from '../services/taskService';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  }

  async componentDidMount() {
    const tasks = await getTasks();
    this.setState({ tasks });
  }

  handleCreateTask = async (task) => {
    await createTask(task);
    const tasks = await getTasks();
    this.setState({ tasks });
  }

  handleDeleteTask = async (id) => {
    await deleteTask(id);
    const tasks = await getTasks();
    this.setState({ tasks });
  }

  render() {
    const { tasks } = this.state;

    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <TaskForm onCreateTask={this.handleCreateTask} />
            <TaskList tasks={tasks} onDeleteTask={this.handleDeleteTask} />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
