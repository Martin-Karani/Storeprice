const { UserInputError } = require("apollo-server-errors");
const { ObjectId } = require("mongodb");

const server = require("../../server");
const isAuth = require("../../utils/isAuth");

module.exports = {
  Query: {
    search: async (_, { searchInput }) => {
      try {
        const products = await server
          .getDb()
          .db()
          .collection("products")
          .find({ $text: { $search: searchInput } })
          .toArray();

        return products.map((product) => {
          return { ...product, _id: product._id.toString() };
        });
      } catch (error) {
        throw error;
      }
    },
    compareProducts: async (_, { productIds }) => {
      try {
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
      } catch (error) {
        throw error;
      }
    },
    // getStoreProducts: async (_, { storeId }) => {
    //   try {
    //     const products = [];
    //     const store = await server
    //       .getDb()
    //       .db()
    //       .collection("store")
    //       .findOne({ _id: ObjectId(storeId) });

    //     store.categories.map(async (category) => {
    //       const product1 = await server
    //         .getDb()
    //         .db()
    //         .collection("products")
    //         .find({ _id: { $in: store.products } })
    //         .toArray();
    //       products.concat(product1);
    //     });
    //   } catch (error) {
    //     throw error;
    //   }
    // },
  },
  Mutation: {
    addReview: async (_, { productId, review, rating }, context) => {
      try {
        const member = isAuth(context);

        if (!member) {
          throw new UserInputError("Member not authorized to review a product");
        }
        if (review.trim() === "") {
          throw UserInputError("Empty Review", {
            errors: {
              review: "Review can not be empty",
            },
          });
        }

        const updatedProduct = await server
          .getDb()
          .db()
          .collection("products")
          .updateOne(
            { _id: ObjectId(productId) },
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
        if (updatedProduct.modifiedCount > 0) {
          return "review added succussfully ";
        } else if (updatedProduct.matchedCount > 0) {
          return "found but not updated";
        } else {
          return "not found";
        }
      } catch (error) {
        throw Error(error);
      }
    },

    askQuestion: async (_, { productId, question }, context) => {
      try {
        const member = isAuth(context);

        if (!member) {
          throw new UserInputError("Store not authorized to create a product");
        }
        if (question.trim() === "") {
          throw new UserInputError("Empty Question", {
            errors: {
              question: "Question can not be empty",
            },
          });
        }
        const updatedProduct = await server
          .getDb()
          .db()
          .collection("products")
          .updateOne(
            { _id: ObjectId(productId) },
            {
              $push: {
                questions: {
                  questionId: new Date().toISOString() + member._id,
                  question: question,
                  answer: [],
                  creator: member._id,
                  createdAt: new Date().toISOString(),
                },
              },
            }
          );
        if (updatedProduct.modifiedCount > 0) {
          return "question added succussfully ";
        } else if (updatedProduct.matchedCount > 0) {
          return "found but not updated";
        } else {
          return "not found";
        }
      } catch (error) {
        throw error;
      }
    },

    answerQuestion: async (_, { productId, questionId, answer }, context) => {
      try {
        const member = isAuth(context);

        if (!member) {
          throw new UserInputError("Store not authorized to create a product");
        }
        if (answer.trim() === "") {
          throw new UserInputError("Empty answer ", {
            errors: {
              answer: "answer can not be empty",
            },
          });
        }
        const product = await server
          .getDb()
          .db()
          .collection("products")
          .findOne({ _id: ObjectId(productId) });

        product &&
          product.questions.map((item) => {
            if (item.questionId == questionId) {
              item.answer.push({
                answerId: "",
                creator: member._id,
                answer: answer,
              });
            }
          });

        const updatedProduct = await server
          .getDb()
          .db()
          .collection("products")
          .updateOne(
            { _id: ObjectId(productId) },
            { $set: { questions: product.questions } }
          );

        if (updatedProduct.modifiedCount > 0) {
          return "updated Successfully";
        } else if (updatedProduct.matchedCount > 0) {
          return "found but not updated";
        } else {
          return "not found";
        }
      } catch (error) {
        throw error;
      }
    },
    addExpertReview: async (
      _,
      { productId, review, createdAt, url, site },
      context
    ) => {
      try {
        const member = isAuth(context);

        if (!member.isStore) {
          throw new UserInputError("Member not authorized to review a product");
        }

        const updatedProduct = await server
          .getDb()
          .db()
          .collection("products")
          .updateOne(
            { _id: ObjectId(productId) },
            {
              $push: {
                expertReviews: {
                  reviewId: member._id + new Date().toISOString(),
                  review,
                  url,
                  site,
                  createdAt,
                },
              },
            }
          );
        if (updatedProduct.modifiedCount > 0) {
          return "expect review added succussfully ";
        } else if (updatedProduct.matchedCount > 0) {
          return "found but not updated";
        } else {
          return "not found";
        }
      } catch (error) {
        throw Error(error);
      }
    },
  },
};
