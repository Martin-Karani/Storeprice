const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const server = require("../server");

const { SECRET_KEY } = require("../config");
const { ObjectID } = require("mongodb");

module.exports = async (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const memberId = jwt.verify(token, SECRET_KEY);
        const member = await server
          .getDb()
          .db()
          .collection("members")
          .findOne({ _id: ObjectID(memberId._id) });
        return member;
      } catch (err) {
        throw new AuthenticationError("invalid/Expired token");
      }
    }
    throw new Error("Authentication token must be ' Bearer [token]");
  }
  throw new Error("Authentication header must be provided");
};
