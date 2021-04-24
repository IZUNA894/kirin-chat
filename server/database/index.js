const { MongoClient, ObjectId } = require("mongodb");

const {
  MONGO_URL: mongoURL,
  MONGO_DATABASE_NAME_TEST: databaseName
} = require("../config");

let client = undefined;
let db = undefined;
let userCollection = undefined;
let signupTokenCollection = undefined;
let loginOTPCollection = undefined;
let forgotPasswordTokenCollection = undefined;
let messageCollection = undefined;

module.exports.connect = options => {
  return MongoClient.connect(mongoURL, { useUnifiedTopology: true })
    .then(mongoClient => {
      client = mongoClient;
      db = client.db(databaseName);

      userCollection = db.collection("users");

      signupTokenCollection = db.collection("signup_tokens");
      loginOTPCollection = db.collection("login_tokens");
      forgotPasswordTokenCollection = db.collection("forgot_tokens");
      messageCollection = db.collection("messages");
      return db;
    })
    .catch(error => {
      throw error;
    });
};

module.exports.toObjectId = id => {
  return ObjectId(id);
};

module.exports.generateHexString = () => {
  const _id = new ObjectId();
  return _id.toHexString();
};

module.exports.getMessageCollection = () => {
  //Safe check
  if (db) {
    return messageCollection;
  }
  return null;
};

module.exports.getUserCollection = () => {
  //Safe check
  if (db) {
    return userCollection;
  }
  return null;
};

module.exports.getsignupTokenCollection = () => {
  //Safe check
  if (db) {
    return signupTokenCollection;
  }
  return null;
};

module.exports.getloginOTPCollection = () => {
  //Safe check
  if (db) {
    return loginOTPCollection;
  }
  return null;
};

module.exports.getforgotPasswordTokenCollection = () => {
  //Safe check
  if (db) {
    return forgotPasswordTokenCollection;
  }
  return null;
};

process.on("SIGINT", async () => {
  client.close(async () => {
    // await agenda.stop();

    console.log("Database connection terminated");
    process.exit(0);
  });
});

process.on("SIGTERM", async () => {
  client.close(async () => {
    // await agenda.stop();

    console.log("Database connection terminated");
    process.exit(0);
  });
});
