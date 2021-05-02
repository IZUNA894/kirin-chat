const Moment = require("moment");
const { validate } = require("../models");
const {
  generateSignupToken,
  generateSignupOTPForUser,
  generateForgotPasswordToken
} = require("../config");

const ObjectId = require("../database").toObjectId;
const Users = require("../database").getUserCollection();
const Messages = require("../database").getMessageCollection();

module.exports.getAllMessages = parameters => {
  return validate(parameters, "getAllMessages")
    .then(result => {
      const { from, to } = result;
      let token = from < to ? from + to : to + from;
      return Messages.findOne({
        token
      });
    })
    .then(result => {
      //   if (result) {
      return {
        message: "Messages fetched successfully",
        status: true,
        data: result ? result.messages : []
      };
      //   }
      //   throw new Error("no user with this id");
    })
    .catch(error => {
      throw { status: false, message: error.message };
    });
};
