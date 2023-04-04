import React, { useState } from "react";

function TaskForm({ userId, createTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTask = async (event) => {
    event.preventDefault();

    // Create a new task object with the user ID
    const newTask = {
      title,
      description,
      userId,
    };

    try {
      // Add the new task to the API by calling the createTask function passed down from the parent component
      const response = await createTask(newTask);
      console.log(response.data);

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
      <form onSubmit={handleAddTask}>
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
