const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Task = require('../models/Task');

// Create a new user
router.post('/signup', async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Authenticate a user
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      throw new Error('Invalid login credentials');
    }
    const isMatch = await user.matchPassword(req.body.password);
    if (!isMatch) {
      throw new Error('Invalid login credentials');
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new task for a user
router.post('/:id/tasks', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new Error('User not found');
    }
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      user_id: user._id,
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all tasks for a user
router.get('/:id/tasks', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new Error('User not found');
    }
    const tasks = await Task.find({ user_id: user._id });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
