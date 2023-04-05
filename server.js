const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./src/routes/userRoutes');
const { ApolloServer } = require('apollo-server');
const { typeDefs, resolvers } = require('./src/schema');



// Create Express app
const app = express();

// Use middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB database');
});

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

// Use routes
app.use('/api/users', userRoutes);

// Start server
const PORT = process.env.PORT || 5000;

apolloServer.listen(PORT, () => {
  console.log(`GraphQL is running at ${PORT}`);
});



