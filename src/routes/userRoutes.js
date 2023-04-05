const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Task = require('../models/Task');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware function to authenticate the token
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    req.userId = decoded._id; // add decoded._id as the userId in the request object
    next();
  } catch (err) {
    res.status(401).json({ message: 'Not authorized to access this resource' });
  }
};


// Create a new user
router.post('/signup', async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      tokens: [] // initialize tokens as an empty array
    });
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    res.status(201).json({ user, token });
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
    const authenticatedUser = await user.matchPassword(req.body.password);
    const tasks = await Task.find({ user_id: user._id });
    res.status(200).json({ user: authenticatedUser, tasks, token: authenticatedUser.tokens[0].token });
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

// Get all tasks for a user
router.get('/:id/tasks', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user_id: req.userId }); // use req.userId instead of req.params.id
    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// // Get all completed tasks for a user
// router.get(':id/tasks', auth, async (req, res) => {
//   try {
//     const tasks = await Task.find({ user_id: req.userId, completed: true }); // use req.userId instead of req.params.id
//     res.status(200).json(tasks);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Update a task to completed for a user
// router.put('/tasks/:id', auth, async (req, res) => {
//   try {
//     const updatedTask = await Task.findOneAndUpdate(
//       { _id: req.params.id, user_id: req.userId },
//       { $set: { completed: true } },
//       { new: true }
//     );
//     if (!updatedTask) {
//       return res.status(404).json({ message: 'Task not found' });
//     }
//     res.json(updatedTask);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });


// Post a new task for a user
router.post('/tasks', auth, async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      user_id: req.user._id // add the user's ID to the task
    });
    await task.save();
    res.status(201).json({ task });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Delete a task for a user
router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user_id: req.user._id });
    if (!task) {
      throw new Error('Task not found');
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.post('/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.status(200).json({ message: 'Successfully logged out' });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;