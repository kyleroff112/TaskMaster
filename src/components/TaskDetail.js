import React from 'react';

const TaskDetail = ({ task }) => {
    return (
        <div className="card">
            <div className="card-header">
                <h2>Task Details</h2>
            </div>
            <div className="card-body">
                <h5 className="card-title">{task.title}</h5>
                <p className="card-text"><strong>Description:</strong> {task.description}</p>
                <p className="card-text"><strong>Due Date:</strong> {task.dueDate}</p>
            </div>
        </div>
    );
};

export default TaskDetail;
