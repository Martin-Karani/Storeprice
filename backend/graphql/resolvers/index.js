const productsSolvers = require("./products");
const storesSolvers = require("./stores");
const memberSolvers = require("./members");
const universalSolvers = require("./universal");
const { GraphQLUpload } = require("graphql-upload");

module.exports = {
  Product: {
    likeCount: (parent) => parent.likes.length,
  },
  Query: {
    ...productsSolvers.Query,
    ...storesSolvers.Query,
    ...memberSolvers.Query,
    ...universalSolvers.Query,
  },
  Upload: GraphQLUpload,
  Mutation: {
    ...productsSolvers.Mutation,
    ...storesSolvers.Mutation,
    ...memberSolvers.Mutation,
    ...universalSolvers.Mutation,
  },
};
