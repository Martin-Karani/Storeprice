const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const { UserInputError } = require("apollo-server");

const server = require("../../server");
const { SECRET_KEY } = require("../../config");
const isAuth = require("../../utils/isAuth");
const { generateToken } = require("./members");
const { validateStoreInput } = require("../../utils/validators");

async function findProducts(productIds) {
  try {
    const products = await server
      .getDb()
      .db()
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray();

    return products.map((product) => {
      return { ...product, _id: product._id.toString() };
    });
  } catch (error) {
    throw err;
  }
}

module.exports = {
  Query: {
    getStores: async () => {
      try {
        const stores = await server
          .getDb()
          .db()
          .collection("stores")
          .find()
          .toArray();
        return stores.map((store) => {
          return {
            ...store,
            _id: store._id.toString(),
            password: null,
          };
        });
      } catch (err) {
        throw err;
      }
    },
    getStore: async (_, { storeId }) => {
      try {
        const store = await server
          .getDb()
          .db()
          .collection("stores")
          .findOne({ _id: ObjectId(storeId) });

        return {
          ...store,
          _id: store._id.toString(),
          products: findProducts.bind(this, store.products),
        };
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    createStore: async (_, { memberInput, town, location, phoneNo }) => {
      try {
        const { valid, errors } = validateStoreInput(
          memberInput.userName,
          memberInput.email,
          memberInput.password,
          memberInput.confirmPassword,
          phoneNo,
          location,
          town
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
          throw new UserInputError("Store name or Email is taken ", {
            errors: {
              storeName: "this store name or Email is taken",
            },
          });
        }

        const store = {
          phoneNo,
          town,
          location,
          storeName: memberInput.userName,
          products: [],
          storeImg: [],
          categories: [],
        };

        const { ops } = await server
          .getDb()
          .db()
          .collection("stores")
          .insertOne(store);

        hashedpassword = await bcrypt.hash(memberInput.password, 12);

        const member = {
          email: memberInput.email,
          password: hashedpassword,
          userName: memberInput.userName,
          isStore: true,
          storeId: ops[0]._id,
        };

        const createdMember = await server
          .getDb()
          .db()
          .collection("members")
          .insertOne(member);

        const token = generateToken(createdMember.ops[0]._id);

        return {
          ...createdMember.ops[0],
          password: null,
          token,
        };
      } catch (err) {
        throw err;
      }
    },
    editStore: async (_, { storeInput }, context) => {
      try {
        const member = isAuth(context);
        if (!member.isStore) {
          throw new UserInputError("member not authorized");
        }
        console.log(member);
        const store = JSON.parse(JSON.stringify(storeInput));

        const isUpdated = await server
          .getDb()
          .db()
          .collection("stores")
          .updateOne({ _id: ObjectId(member.storeId) }, { $set: store });

        if (isUpdated.modifiedCount > 0) {
          return "UPdated succefully";
        } else if (isUpdated.matchedCount > 0) {
          throw new Error("matched but not updated");
        } else {
          throw new Error("not updated");
        }
      } catch (err) {
        throw err;
      }
    },
    addStoreReview: async (_, { storeId, review, rating }, context) => {
      try {
        const member = isAuth(context);

        if (!member) {
          throw new UserInputError("Member not authorized to review a product");
        }

        const updatedStore = await server
          .getDb()
          .db()
          .collection("stores")
          .updateOne(
            { _id: ObjectId(storeId) },
            {
              $push: {
                reviews: {
                  reviewId: member._id + new Date().toISOString(),
                  review: review,
                  rating: rating,
                  creator: member._id,
                  createdAt: new Date().toISOString(),
                },
              },
            }
          );
        if (updatedStore.modifiedCount > 0) {
          return "review added succussfully ";
        } else if (updatedStore.matchedCount > 0) {
          return "found but not updated";
        } else {
          return "not found";
        }
      } catch (error) {
        throw Error(error);
      }
    },
    deleteStore: async (_, { memberId }, context) => {
      const isStore = isAuth(context);
      if (!isStore) {
        throw new UserInputError("member not authorized");
      }
      const member = await server
        .getDb()
        .db()
        .collection("members")
        .findOne({ _id: ObjectId(memberId) });

      const store = await server
        .getDb()
        .db()
        .collection("stores")
        .deleteOne({ _id: ObjectId(member.storeId) });

      if (store.deleted) {
        await server
          .getDb()
          .db()
          .collection("members")
          .deleteOne({ _id: ObjectId(member._id) });

        return "deleted";
      } else {
        throw new Error("member not deleted");
      }
    },
  },
};
