const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const mongodbUrl = "mongodb://127.0.0.1/storeprices";

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log("db ininiated already");
    return callback(null, _db);
  }
  MongoClient.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((client) => {
      _db = client;
      console.log("connected to the database}}");
      return callback(null, _db);
    })
    .catch((err) => {
      console.log("init_db err  ???", err);
      callback(err, _);
    });
};

const getDb = () => {
  if (!_db) {
    throw new Error("Database not initialized!!!");
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};
