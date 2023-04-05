const User = require("../models/User");
const Task = require("../models/Task");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const resolvers = {
  Query: {
    users: async (parent, args) => {
      const users = await User.find({});
      return users;
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
        const user = new User({
            username: args.username,
            email: args.email,
            password: args.password,
            tokens: [] // initialize tokens as an empty array
          });
          const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
          user.tokens = user.tokens.concat({ token });
          await user.save();
         return{ user, token };
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
  },
};

module.exports = resolvers;
