import React, { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import axios from "axios";
import { useMutation } from "@apollo/client";
import { CREATE_TASK, DELETE_TASK, GET_ALL_TASKS_FOR_USER } from "../utils/mutations";

function Dashboard(props) {
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [getTasksForUser] = useMutation(GET_ALL_TASKS_FOR_USER);
  const [createTaskMut] = useMutation(CREATE_TASK);
  const [deleteTaskMut] = useMutation(DELETE_TASK);

  useEffect(() => {
    const getAllTasks = async () => {
      const data = await getTasks();
      setTasks(data);
    }
    getAllTasks()
  }, []);

  const getTasks = async () => {
    const data = await getTasksForUser({ variables: { userId: props.userId } });
    return data.data.getAllTasksForUser;
  };

  const createTask = async (task) => {
    const data = await createTaskMut({ variables: { ...task, user_id: props.userId } });
    return data.data.createTask;
  };

  const deleteTask = async (id) => {
    const data = await deleteTaskMut({ variables: { id } });
    return data.data.deleteTask;
  };

  const handleCreateTask = async (task) => {
    try {
      const data = await createTask(task);
      setTasks((prev) => [...prev, data]);
    } catch (err) {
      console.log(err);
    }
  };


  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    const data = await getTasks();
    setTasks(data);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleToggleTaskForm = () => {
    setShowTaskForm(!showTaskForm);
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <a className="navbar-brand" href="/">
          Dashboard
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <button
                className="btn btn-outline-primary"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <div className="dashboard-content">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="mb-3">
                <button
                  className="btn btn-primary mt-3"
                  onClick={handleToggleTaskForm}
                >
                  Create a New Task
                </button>
              </div>
              {showTaskForm && (
                <TaskForm userId={props.userId} createTask={handleCreateTask} />
              )}
              <TaskList
                tasks={tasks}
                handleDeleteTask={handleDeleteTask}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
