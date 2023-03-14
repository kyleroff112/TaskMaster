const mongoose = require('mongoose');

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

// Define a route handler for creating a new user document
app.post('/App', (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  user.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error creating user');
    } else {
      res.send('User created successfully');
    }
  });
});
