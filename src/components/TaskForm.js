import React, { useState } from "react";
import { addTask } from "../api/taskApi";

function TaskForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        // Create a new task object
        const newTask = {
            title,
            description,
            start_time: startTime,
            end_time: endTime,
        };

        // Add the new task to the API
        addTask(newTask).then((response) => {
            console.log(response);
        });

        // Clear the form
        setTitle("");
        setDescription("");
        setStartTime("");
        setEndTime("");
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
                <div className="form-group">
                    <label htmlFor="start_time">Start Time</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        id="start_time"
                        value={startTime}
                        onChange={(event) => setStartTime(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="end_time">End Time</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        id="end_time"
                        value={endTime}
                        onChange={(event) => setEndTime(event.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Add Task
                </button>
            </form>
        </div>
    );
}

export default TaskForm;
