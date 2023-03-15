const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use('/api', require('./authRoutes'));

// Define a schema for your data
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
});

// Set up a connection to your MongoDB database
mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true });

// Create a model based on your schema
const User = mongoose.model('User', userSchema);

console.log(User);

module.exports = User;
