const mongoose = require('mongoose');
const casual = require('casual');
const User = require('./src/models/User');
const Task = require('./src/models/Task');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/taskapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', async () => {
  console.log('Connected to MongoDB database');

  // Create 10 users
  const users = [];
  for (let i = 0; i < 10; i++) {
    const user = new User({
      username: casual.username,
      email: casual.email,
      password: casual.password,
    });
    users.push(user);
  }

  // Save users to the database
  await User.insertMany(users);

  // Create 5 tasks for each user
  const tasks = [];
  for (const user of users) {
    for (let i = 0; i < 5; i++) {
      const task = new Task({
        title: casual.title,
        description: casual.description,
        user_id: user._id,
      });
      tasks.push(task);
    }
  }

  // Save tasks to the database
  await Task.insertMany(tasks);

  console.log(`Created ${users.length} users with ${tasks.length} tasks`);
  mongoose.disconnect();
});
