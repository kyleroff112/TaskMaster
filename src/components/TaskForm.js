import React, { useState } from "react";
import axios from "axios";

function TaskForm({ userId, onCreateTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Create a new task object with the user ID
    const newTask = {
      title,
      description,
      user_id: userId
    };
  
    try {
      // Add the new task to the API
      const response = await axios.post(`http://localhost:5000/api/users/${userId}/tasks`, newTask);
      console.log(response.data);
  
      // Call the onCreateTask function with the new task data
      onCreateTask(response.data);
  
      // Clear the form
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className="container">
      <h1 className="mt-5 mb-4">Add Task</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Enter task title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            placeholder="Enter task description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
