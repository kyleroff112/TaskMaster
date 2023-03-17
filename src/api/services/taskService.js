import { BASE_URL } from '../utils/apiUtils';

async function getTasks() {
  const response = await fetch(`${BASE_URL}/tasks`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Failed to get tasks');
  }
}

async function createTask(task) {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(task)
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Failed to create task');
  }
}

async function updateTask(task) {
  const response = await fetch(`${BASE_URL}/tasks/${task.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(task)
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Failed to update task');
  }
}

async function deleteTask(id) {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (response.ok) {
    return true;
  } else {
    throw new Error('Failed to delete task');
  }
}

export const taskService = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};
