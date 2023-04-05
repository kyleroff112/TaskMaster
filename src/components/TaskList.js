import React, { useState, useEffect } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

function TaskList({ tasks, handleDeleteTask }) {
  const [taskList, setTaskList] = useState(tasks);

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);
  return (
    <div>
      <h1 className="text-center my-4">My Tasks</h1>
      {taskList && taskList.length > 0 ? (
        <ListGroup>
          {taskList.map(task => (
            <ListGroupItem key={task.id}>
              <h5>{task.title}</h5>
              <p>{task.description}</p>
              <button className="btn btn-danger" onClick={() => handleDeleteTask(task.id)}>Delete</button>
              {/* {!task.completed && <button className="btn btn-success" onClick={() => handleCompleteTask(task)}>Complete</button>} */}
            </ListGroupItem>
          ))}
        </ListGroup>
      ) : (
        <p>No tasks found</p>
      )}
    </div>
  );
}

export default TaskList;
