const User = require("../models/User");
const Task = require("../models/Task");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const resolvers = {
  Query: {
    users: async (parent, args) => {
      const users = await User.find({});
      return users;
    },
    getAllTasks: async (parent, args) => {
      const tasks = await Task.find({});
      return tasks;
    },
  
  },
  Mutation: {
    createUser: async (parent, args) => {
      const user = new User({
        username: args.username,
        email: args.email,
        password: args.password,
        tokens: [], // initialize tokens as an empty array
      });
      const token = jwt.sign(
        { _id: user._id.toString() },
        process.env.JWT_SECRET
      );
      user.tokens = user.tokens.concat({ token });
      await user.save();
      return { user, token };
    },
    login: async (parent, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user) {
        throw new Error("Invalid login credentials");
      }
      const authenticatedUser = await user.matchPassword(args.password);
      const tasks = await Task.find({ user_id: user._id });
      return {
        user: authenticatedUser,
        tasks,
        token: authenticatedUser.tokens[0].token,
      };
    },
    createTask: async (parent, args) => {
      const task = new Task({
        title: args.title,
        description: args.description,
        user_id: args.user_id,
      });
      await task.save();
      return task;
    },
    deleteTask: async (parent, args) => {
      const task = await Task.findByIdAndDelete(args.id);
      return task;
    },
    updateTask: async (parent, args) => {
      const task = await Task.findByIdAndUpdate(
        args.id,
        {
          title: args.title,
          description: args.description,
          completed: args.completed,
        },
        { new: true }
      );
      return task;
    },
    logout: async (parent, args) => {
      const user = await User.findByIdAndUpdate(
        args.id,
        {
          tokens: [],
        },
        { new: true }
      );
      return "Successfully logged out";
    },
    getAllTasksForUser: async (parent, args) => {
      const tasks = await Task.find({ user_id: args.userId });
      return tasks;
    },
  },
};

module.exports = resolvers;
