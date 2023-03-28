const express = require('express');
const router = express.Router();
const userService = require('../api/services/userService');

// Create a new user
router.post('/signup', async (req, res) => {
  try {
    const user = await userService.signup(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Authenticate a user
router.post('/login', async (req, res) => {
  try {
    const user = await userService.login(req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;


