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
  type Query {
    users: [User!]!
  }
  type Mutation {
    createUser(username: String!, email: String!, password: String!): login!
    login(username: String!, password: String!): login!
    }
   type Task {
    id: ID!
    title: String!
    description: String!
    user_id: ID!
    completed: Boolean!
    }  
`;
module.exports = typeDefs;
