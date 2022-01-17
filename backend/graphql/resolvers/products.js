const { UserInputError } = require("apollo-server-errors");
const mongodb = require("mongodb");

const server = require("../../server");
const isAuth = require("../../utils/isAuth");

const findStore = async (storeId) => {
  const store = await server
    .getDb()
    .db()
    .collection("stores")
    .findOne({ _id: mongodb.ObjectId(storeId) });
  return {
    storeName: store.storeName,
    location: store.location,
    coverImg: store.storeImg[0],
  };
};

const findMember = async (memberId) => {
  const member = await server
    .getDb()
    .db()
    .collection("members")
    .findOne({ _id: mongodb.ObjectId(memberId) });
  return {
    userName: member.userName,
  };
};

module.exports = {
  Query: {
    getProducts: async (_, { category }) => {
      try {
        const products = await server
          .getDb()
          .db()
          .collection(category)
          .find()
          .toArray();

        return products.map((product) => {
          return {
            ...product,
            _id: product._id.toString(),
          };
        });
      } catch (err) {
        throw err;
      }
    },
    getSelectedProducts: async (_, { productIds }) => {
      console.log(productIds);
      let productsids = [];
      productIds &&
        productIds.forEach((id) => productsids.push(mongodb.ObjectId(id)));
      try {
        const selectedProducts = await server
          .getDb()
          .db()
          .collection("products")
          .find({ _id: { $in: productsids } })
          .toArray();

        return selectedProducts.map((product) => {
          return {
            ...product,
            _id: product._id.toString(),
          };
        });
      } catch (error) {
        throw error;
      }
    },
    getProduct: async (_, { category, productName }) => {
      try {
        const product = await server
          .getDb()
          .db()
          .collection(category)
          .findOne({ name: productName });

        return {
          ...product,
          _id: product._id.toString(),
          questions: product.questions.map((question) => {
            return {
              ...question,
              creator: findMember.bind(this, question.creator),
            };
          }),
          inStorePrices: product.inStorePrices.map((item) => {
            return {
              ...item,
              store: findStore.bind(this, item.storeId),
            };
          }),
        };
      } catch (err) {
        throw new Error("Product not found");
      }
    },
  },
  Mutation: {
    createProduct: async (_, { productInput }, context) => {
      try {
        // const store = isAuth(context);

        // if (!store.isStore) {
        //   throw new UserInputError("Store not authorized to create a product");
        // }
        const exists = await server
          .getDb()
          .db()
          .collection(productInput.category)
          .findOne({ name: productInput.name });

        if (exists) {
          throw new UserInputError("Product Name already exists");
        }
        const product = JSON.parse(JSON.stringify(productInput));
        product.onlinePrices = [];
        product.inStorePrices = [];
        product.questions = [];
        product.priceHistory = [];
        console.log("creating");
        const { ops } = await server
          .getDb()
          .db()
          .collection(productInput.category)
          .insertOne(product);

        if (ops) return "product added successfully";
      } catch (err) {
        throw err;
      }
    },
    updateProduct: async (_, { productId, fields }, context) => {
      try {
        const store = isAuth(context);

        if (!store.isStore) {
          throw new UserInputError("Store not authorized to create a product");
        }

        const fieldsJson = JSON.parse(JSON.stringify(fields));
        const product = await server
          .getDb()
          .db()
          .collection(fields.category)
          .findOne({ _id: mongodb.ObjectId(productId) });

        const newProduct = {
          ...product,
          ...fieldsJson,
        };

        const updatedProduct = await server
          .getDb()
          .db()
          .collection(fields.category)
          .replaceOne({ _id: mongodb.ObjectID(productId) }, newProduct);

        if (updatedProduct.modifiedCount > 0) {
          return "product updated successfully";
        } else if (updatedProduct.matchedCount > 0) {
          return "found but not updated";
        } else {
          return "not found";
        }
      } catch (err) {
        throw err;
      }
    },
    deleteProduct: async (_, { productId, category }) => {
      try {
        const product = await server
          .getDb()
          .db()
          .collection(category)
          .deleteOne({ _id: mongodb.ObjectId(productId) });

        if (product.deletedCount < 1) {
          throw new Error("product does not exits");
        }
        return "deleted";
      } catch (err) {
        throw new Error(err);
      }
    },

    addOnlinePrice: async (_, { onlinePriceInput }, context) => {
      try {
        const { isStore } = isAuth(context);

        // if (!isStore) {
        //   throw new UserInputError("Authorized only");
        // }
        onlinePriceInput.updatedAt = new Date().toISOString();

        const updatedProduct = await server
          .getDb()
          .db()
          .collection(onlinePriceInput.category)
          .updateOne(
            { _id: mongodb.ObjectId(onlinePriceInput.productId) },
            {
              $push: {
                onlinePrices: onlinePriceInput,
                priceHistory: {
                  onlineSite: onlinePriceInput.onlineSite,
                  storeName: onlinePriceInput.storeName,
                  price: onlinePriceInput.price,
                  date: new Date().toISOString(),
                },
              },
            }
          );
        if (updatedProduct.modifiedCount > 0) {
          const product = await server
            .getDb()
            .db()
            .collection(onlinePriceInput.category)
            .findOne({ _id: mongodb.ObjectId(onlinePriceInput.productId) });

          if (
            product.lowestPrice > onlinePriceInput.price ||
            product.lowestPrice === null
          ) {
            await server
              .getDb()
              .db()
              .collection(onlinePriceInput.category)
              .updateOne(
                { _id: mongodb.ObjectId(onlinePriceInput.productId) },
                { $set: { lowestPrice: onlinePriceInput.price } }
              );
          }
          if (
            product.highestPrice < onlinePriceInput.price ||
            product.highestPrice === null
          ) {
            await server
              .getDb()
              .db()
              .collection(onlinePriceInput.category)
              .updateOne(
                { _id: mongodb.ObjectId(onlinePriceInput.productId) },
                { $set: { highestPrice: onlinePriceInput.price } }
              );
          }
          return "Online Price added successfully";
        } else {
          throw new Error("product not updated");
        }
      } catch (err) {
        throw err;
      }
    },

    updateOnlinePrice: async (
      _,
      { updateOnlinePriceInput: { productId, onlinePriceId, url, price } },
      context
    ) => {
      try {
        const { isStore } = isAuth(context);

        if (!isStore) {
          throw new UserInputError('"Authorized only');
        }

        // product.onlinePrices.map((item) => {
        //   if (item._id === onlinePriceId) {
        //     item.price = price;
        //     item.url = url;
        //   } else {
        //     throw new Error("not updated");
        //   }
        // });

        // const productUpdated = await server
        //   .getDb()
        //   .db()
        //   .collection("products")
        //   .updateOne(
        //     { _id: mongodb.ObjectId(productId) },
        //     { $set: { onlinePrices: {} }
        //   );

        if (productUpdated.modifiedCount > 0) {
          return "Online Store updated succefully";
        } else if (updatedProduct.matchedCount > 0) {
          return "found but not updated";
        } else {
          return "not found";
        }
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    deleteOnlinePrice: async (
      _,
      { productId, onlinePriceId, category },
      context
    ) => {
      try {
        const { isStore } = isAuth(context);
        if (!isStore) {
          throw new UserInputError('"Authorized only');
        }
        const updatedProduct = await server
          .getDb()
          .db()
          .collection(category)
          .updateOne(
            { _id: mongodb.ObjectId(productId) },
            { $pull: { onlinePrices: { _id: onlinePriceId } } }
          );
        if (updatedProduct.modifiedCount > 0) {
          return "deleted";
        } else if (updatedProduct.matchedCount > 0) {
          return "found but not updated";
        } else {
          return "not found";
        }
      } catch (err) {
        throw err;
      }
    },

    // IN-STORE MUTATIONS

    addInStorePrice: async (_, { category, productId, price }, context) => {
      try {
        const member = isAuth(context);
        if (!member.isStore) {
          throw new UserInputError('"Authorized only');
        }

        const store = await server
          .getDb()
          .db()
          .collection("stores")
          .findOne({ _id: mongodb.ObjectId(member.storeId) });

        //  REMEMBER TO ADD CATEGORIES TO THE STORE

        if (store) {
          const priceCard = {
            _id: productId + member.storeId,
            productId,
            storeId: store._id,
            price,
            updatedAt: new Date().toISOString(),
          };

          const product = await server
            .getDb()
            .db()
            .collection(category)
            .updateOne(
              { _id: mongodb.ObjectId(productId) },
              { $push: { inStorePrices: priceCard } }
            );

          if (product.modifiedCount > 0) {
            const updatedProduct = await server
              .getDb()
              .db()
              .collection("stores")
              .updateOne(
                { _id: mongodb.ObjectId(member.storeId) },
                {
                  $addToset: {
                    categories: category,
                  },
                  $push: {
                    products: mongodb.ObjectId(productId),
                    priceHistory: {
                      storeName: member.storeName,
                      price,
                      date: new Date().toISOString(),
                    },
                  },
                }
              );
            if (updatedProduct.modifiedCount > 0) {
              return " Price added successfully";
            } else if (updatedProduct.matchedCount > 0) {
              return "found but not updated";
            } else {
              return "not found";
            }
          } else {
            throw new Error("Product does not exist");
          }
        } else {
          throw new Error("Your store not found");
        }
      } catch (err) {
        throw err;
      }
    },
    updateInStorePrice: async (_, { productId, price, category }, context) => {
      try {
        const store = isAuth(context);
        if (!store) {
          throw new UserInputError('"Authorized only');
        }

        const product = await server
          .getDb()
          .db()
          .collection(category)
          .findOne({
            _id: mongodb.ObjectId(productId),
          });

        product.inStorePrices.map((item) => {
          // console.log(item.storeId, store.storeId);
          if (item.storeId.toString() === store.storeId) {
            console.log(item.price, price);
            return (item.price = price);
          }
        });

        const productUpdated = await server
          .getDb()
          .db()
          .collection(category)
          .updateOne(
            {
              _id: mongodb.ObjectId(productId),
            },
            { $set: { inStorePrices: product.inStorePrices } }
          );

        if (productUpdated.modifiedCount > 0) {
          return "InstorePrice updated succefully";
        } else if (productUpdated.matchedCount > 0) {
          return "Nothing Changed in the Update";
        } else {
          return "Not Updated";
        }
      } catch (err) {
        throw err;
      }
    },
    likeProduct: async (_, { productId }, context) => {
      try {
        const user = isAuth(context);
        if (!user) {
          throw new UserInputError("Must be Logged In");
        }
      } catch (error) {
        throw error;
      }
    },

    deleteInStorePrice: async (_, { productId, category }, context) => {
      try {
        const store = isAuth(context);
        if (!store.isStore) {
          throw new UserInputError("Authorized only");
        }

        const product = await server
          .getDb()
          .db()
          .collection(category)
          .findOne({
            _id: mongodb.ObjectId(productId),
          });
        const newProduct = product.inStorePrices.filter(
          (item) => item.storeId.toString() !== store.storeId
        );

        const productUpdated = await server
          .getDb()
          .db()
          .collection(category)
          .updateOne(
            {
              _id: mongodb.ObjectId(productId),
            },
            { $set: { inStorePrices: newProduct } }
          );

        if (productUpdated.modifiedCount > 0) {
          return "InstorePrice deleted succefully";
        } else if (productUpdated.matchedCount > 0) {
          return "Nothing changed in the InstorePrice";
        } else {
          return "Product not found";
        }
      } catch (error) {
        throw error;
      }
    },
  },
};
