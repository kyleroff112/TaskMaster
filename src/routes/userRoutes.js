const express = require('express');
const router = express.Router();
const User = require('../models/User');

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
    const user = await User.findOne({ email: req.body.email });
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

// get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
