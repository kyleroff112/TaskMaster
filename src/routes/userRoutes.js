const express = require('express');
const router = express.Router();
const authService = require('../api/services/authService');
const userService = require('../api/services/userService');

// Create a new user
router.post('/signup', authService.signup);

// Authenticate a user
router.post('/login', authService.login);



module.exports = router;

