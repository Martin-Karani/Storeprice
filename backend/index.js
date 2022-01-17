const express = require("express");
// const graphql = require("graphql");
const { ApolloServer } = require("apollo-server-express");
// import * as path from "path";
const path = require("path");
const { graphqlUploadExpress } = require("graphql-upload");
const typeDefs = require("./graphql/typeDefs/index");
const resolvers = require("./graphql/resolvers/index");
const server = require("./server");

async function startServer() {
  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
  });
  context: ({ req }) => ({ req }), await apollo.start();

  const app = express();

  app.use(express.json());

  // This middleware should be added before calling `applyMiddleware`.
  app.use(graphqlUploadExpress());

  apollo.applyMiddleware({ app });

  app.use(express.static(path.join(__dirname, "./upload")));

  server.initDb((err) => {
    if (err) {
      console.log(err);
      console.log("cannot make the connection");
    }
    app.listen(5000);
    console.log("listening to port 5000");
  });

  // console.log(`🚀 Server ready at http://localhost:5000}`);
}

startServer();
