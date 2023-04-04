import React, { useState, useEffect } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

function TaskList({ tasks }) {
  const [taskList, setTaskList] = useState(tasks);

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  return (
    <div>
      <h1 className="text-center my-4">My Tasks</h1>
      <ListGroup>
        {taskList.map(task => (
          <ListGroupItem key={task._id}>
            <h5>{task.title}</h5>
            <p>{task.description}</p>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}

export default TaskList;
