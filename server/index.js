const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");
const { default: axios } = require("axios");
const { USERS } = require("./user");
const { TODOS } = require("./todo");

async function startServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs: `
      type User {
         id : ID!
         name : String!
         email : String!
         phone : String!
         website : String!
      }

       type Todo {
           id : ID!
           title : String!
           completed : Boolean!
           user : User
       }

       type Query {
           getTodos : [Todo]
           getAllUsers : [User]
           getUser(id : ID!) : User
       }
    `,

    resolvers: {
      Todo: {
        user: (parent) => USERS.find((todo) => todo.id === parent.userId),
      },

      Query: {
        getTodos: () => TODOS,
        getAllUsers: () => USERS,
        getUser: (parent, { id }) => USERS.find((user) => user.id === id),
      },
    },

    // resolvers: {
    //   Todo: {
    //     user: async (parent) => {
    //       const user = await axios.get(
    //         `https://jsonplaceholder.typicode.com/users/${parent.userId}`
    //       );
    //       return user.data;
    //     },
    //   },

    //   Query: {
    //     getTodos: async () =>
    //       (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,
    //     getAllUsers: async () =>
    //       (await axios.get("https://jsonplaceholder.typicode.com/users")).data,
    //     getUser: async (parent, { id }) => {
    //       return (
    //         await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
    //       ).data;
    //     },
    //   },
    // },
  });

  app.use(express.json());
  app.use(cors());

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.listen(8000, () => console.log("Server is running on port 8000"));
}

startServer();
