const { UserInputError } = require("apollo-server-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = require("../../config");
const server = require("../../server");
const {
  validateMemberInput,
  validateLoginInput,
} = require("../../utils/validators");

function generateToken(id) {
  return jwt.sign(
    {
      _id: id,
    },
    SECRET_KEY,
    { expiresIn: "21 days" }
  );
}

module.exports = {
  Query: {
    getUser: async (_, __, context) => {
      try {
        const user = isAuth(context);
        if (user) {
          return user;
        }
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    createMember: async (_, { memberInput }) => {
      try {
        const { valid, errors } = validateMemberInput(
          memberInput.userName,
          memberInput.email,
          memberInput.password,
          memberInput.confirmPassword
        );
        if (!valid) {
          throw new UserInputError("errors", { errors });
        }

        const memberExists = await server
          .getDb()
          .db()
          .collection("members")
          .findOne({
            $or: [
              { email: memberInput.email },
              { userName: memberInput.userName },
            ],
          });

        if (memberExists) {
          if (memberExists.email === memberInput.email) {
            throw new UserInputError(" Email is taken ", {
              errors: {
                email: " Email is taken",
              },
            });
          } else {
            throw new UserInputError("user name is taken ", {
              errors: {
                userName: "this UserName is taken",
              },
            });
          }
        }
        const member = JSON.parse(JSON.stringify(memberInput));
        member.password = await bcrypt.hash(memberInput.password, 12);
        member.isStore = false;

        const { ops } = await server
          .getDb()
          .db()
          .collection("members")
          .insertOne(member);

        const token = generateToken(ops[0]._id);

        return { ...ops[0], token, password: null };
      } catch (err) {
        throw err;
      }
    },
    login: async (_, { email, password }) => {
      try {
        const { valid, errors } = validateLoginInput(email, password);

        if (!valid) {
          throw new UserInputError("wrong credentials", { errors });
        }

        const member = await server
          .getDb()
          .db()
          .collection("members")
          .findOne({ email: email });

        if (!member) {
          errors.general = "Member not Found";
          throw new UserInputError("Member not Found", { errors });
        }
        const confirmPassword = await bcrypt.compare(password, member.password);

        if (!confirmPassword) {
          errors.general = "password did not match";
          throw new UserInputError("password did not match", { errors });
        }

        const token = generateToken(member._id);

        return {
          ...member,
          password: null,
          token,
        };
      } catch (err) {
        throw err;
      }
    },
  },
};
