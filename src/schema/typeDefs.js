const typeDefs = `
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
  }
  type login {
    user: User!
    tasks: [Task!]!
    token: String!
  }
   type Task {
    id: ID!
    title: String!
    description: String!
    user_id: ID!
    completed: Boolean!
    }
    type Query {
      users: [User!]!
      getAllTasks: [Task!]!
    }
    type Mutation {
      createUser(username: String!, email: String!, password: String!): login!
      login(username: String!, password: String!): login!
      createTask(title: String!, description: String!, user_id: ID!): Task!
      deleteTask(id: ID!): Task!
      getAllTasksForUser(userId: ID!): [Task!]!
      updateTask(id: ID!, title: String!, description: String!): Task!
      logout: String!
      }
`;
module.exports = typeDefs;
