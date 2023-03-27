const express = require('express');
const router = express.Router();
const taskService = require('../services/taskService');

// Get all tasks
router.get('/', taskService.getAllTasks);

// Get a task by ID
router.get('/:id', taskService.getTaskById);

// Create a new task
router.post('/', taskService.createTask);

// Update an existing task
router.put('/:id', taskService.updateTask);

// Delete a task
router.delete('/:id', taskService.deleteTask);

module.exports = router;
