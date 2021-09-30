const express = require("express");
// const graphql = require("graphql");
const { ApolloServer } = require("apollo-server");

const typeDefs = require("./graphql/typeDefs/index");
const resolvers = require("./graphql/resolvers/index");
const server = require("./server");

const app = express();

app.use(express.json());

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

server.initDb((err) => {
  if (err) {
    console.log(err);
    console.log("cannot make the connection");
  }
  apollo.listen(5000);
  console.log("listening to port 5000");
});
