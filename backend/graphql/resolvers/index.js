const productsSolvers = require("./products");
const storesSolvers = require("./stores");
const memberSolvers = require("./members");
const universalSolvers = require("./universal");

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
  Mutation: {
    ...productsSolvers.Mutation,
    ...storesSolvers.Mutation,
    ...memberSolvers.Mutation,
    ...universalSolvers.Mutation,
  },
};
