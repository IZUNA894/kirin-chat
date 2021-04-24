const joi = require("joi");
const moment = require("moment-timezone");
const { toObjectId: ObjectId } = require("../database");

///User
const verifyOTPUser = require("./user/login/verifyOTPUser")(joi);
const verifyEmailUser = require("./user/login/verifyEmailUser")(joi);
const resendOTPForUser = require("./user/login/resendOTPForUser")(joi);

const addUser = require("./user/addUser")(joi);
const editUser = require("./user/editUser")(joi);
const getUserById = require("./user/getUserById")(joi);

const userEmailLogin = require("./user/login/emailLogin")(joi);
const userPhoneLogin = require("./user/login/phoneLogin")(joi);
const resetPasswordForUser = require("./user/password/resetPasswordForUser")(
  joi
);
const forgotPasswordForUser = require("./user/password/forgotPasswordForUser")(
  joi
);
const verifyForgotHash = require("./user/password/verifyForgotHash")(joi);

//people
const addFriend = require("./user/people/addFriend")(joi);

//message
const getAllMessages = require("./message/getAllMessages")(joi);

const schemas = {
  addUser,
  userEmailLogin,
  userPhoneLogin,
  verifyEmailUser,
  verifyOTPUser,
  resendOTPForUser,
  getUserById,
  editUser,
  resetPasswordForUser,
  forgotPasswordForUser,
  verifyForgotHash,
  //people
  addFriend,
  getAllMessages
};

const schemaValidator = (object, type) => {
  return new Promise((resolve, reject) => {
    if (!object) {
      reject(new Error("object to validate not provided"));
    }
    if (!type) {
      reject(new Error("schema type to validate not provided"));
    }
    const Schema = schemas[type];
    const { error, value } = Schema.validate(object);
    if (error) {
      reject(error);
    }
    resolve(value);
  });
};

module.exports = Object.create({ validate: schemaValidator, schemas });
