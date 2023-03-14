const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/signup', async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const user = new User({ username, password, email });
    await user.save();
    res.json({ message: 'User created successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
