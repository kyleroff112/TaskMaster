import React, { useState, useEffect } from "react";
import { taskService } from "../api/services/taskService";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    //Fetch tasks from the API for the logged-in user
    taskService.getTasks(userId).then((tasks) => {
      setTasks(tasks);
    });
  }, [userId]);

  return (
    <div className="container">
      <h1 className="mt-5 mb-4">Task List</h1>
      <ul className="list-group">
        {tasks.map((task) => (
          <li className="list-group-item" key={task.id}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>
              <strong>Start time:</strong> {task.start_time}
            </p>
            <p>
              <strong>End time:</strong> {task.end_time}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
