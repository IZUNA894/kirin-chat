const Moment = require("moment");
const { validate } = require("../models");
const {
  generateSignupToken,
  generateSignupOTPForUser,
  generateForgotPasswordToken
} = require("../config");
const {
  sendUserSignUpVerificationMail: sendVerificationLink,
  sendUserForgotPasswordMail: sendForgotPasswordMail
} = require("../utils/mailer/mailer");

const { sendOTPForUserSignup: sendOTP } = require("../utils/aws/sns");
const ObjectId = require("../database").toObjectId;
const Users = require("../database").getUserCollection();
const SignupTokens = require("../database").getsignupTokenCollection();
const LoginOTP = require("../database").getloginOTPCollection();
const ForgotTokens = require("../database").getforgotPasswordTokenCollection();
const Messages = require("../database").getMessageCollection();
const { defaultS3: AWS } = require("../utils/aws/s3");
const S3 = AWS();

module.exports.verifyOTPSignup = parameters => {
  return validate(parameters, "verifyOTPUser")
    .then(result => {
      const { phone, otp } = result;
      return LoginOTP.findOneAndDelete({ phone: phone, otp: otp });
    })
    .then(result => {
      const { value } = result;
      if (value) {
        const { phone } = value;
        return Users.findOne({ phone }, { projection: { password: 0 } });
      }
      throw new Error("OTP Expired please request again");
    })
    .then(result => {
      //generate a token from jwt here
      return {
        status: true,
        message: "OTP verified successfully",
        data: result
      };
    })
    .catch(error => {
      throw { status: false, message: error.message };
    });
};

module.exports.verifyEmailSignup = parameters => {
  return validate(parameters, "verifyEmailUser")
    .then(result => {
      const { hash } = result;
      return SignupTokens.findOneAndDelete({ hash }, { returnOriginal: false });
    })
    .then(result => {
      const { value } = result;
      if (value) {
        const { email } = value;
        return Users.updateOne({ email }, { $set: { email_verified: true } });
      }
      throw new Error("Link expired");
    })
    .then(() => {
      return {
        status: true,
        message: "Email verified successfully",
        data: "success"
      };
    })
    .catch(error => {
      throw { status: false, message: error.message, data: "error" };
    });
};

module.exports.verifyForgotPassword = parameters => {
  return validate(parameters, "verifyForgotHash")
    .then(result => {
      const { hash } = result;
      return ForgotTokens.findOneAndDelete({ hash }, { returnOriginal: false });
    })
    .then(result => {
      const { value } = result;
      if (value) {
        const { email } = value;
        return Users.updateOne({ email }, { $set: { password: "12345" } });
      }
      throw new Error("Link expired");
    })
    .then(result => {
      const { modifiedCount } = result;
      if (modifiedCount === 1) {
        return {
          status: true,
          message: "Success"
        };
      }
      throw new Error("Please contact support");
    })
    .catch(error => {
      throw { status: false, message: error.message };
    });
};

module.exports.emailLogin = parameters => {
  return validate(parameters, "userEmailLogin")
    .then(async result => {
      const { email, password: providedPassword } = result;
      const userDocument = await Users.findOne({
        email: new RegExp(email, "i")
      });
      if (userDocument) {
        const { password } = userDocument;
        if (password === providedPassword) {
          delete userDocument.password;
          return userDocument;
        }
        throw new Error("Password provided is incorrect");
      }
      throw new Error("No user exists with this email");
    })
    .then(async result => {
      const { email, email_verified } = result;
      if (email_verified) {
        return {
          status: true,
          message: "Logged in successfully",
          data: result
        };
      } else {
        const crptoHash = generateSignupToken();
        const { value } = await SignupTokens.findOneAndUpdate(
          { email: email },
          { $set: { hash: crptoHash, activity: "login" } },
          { returnOriginal: false }
        );
        const { messageId } = await sendVerificationLink(value);
        return {
          status: false,
          message: "Please verify your email",
          data: messageId
        };
      }
    })
    .catch(error => {
      throw { status: false, message: error.message };
    });
};

module.exports.phoneLogin = parameters => {
  let { phone } = parameters;
  return Users.findOne({ phone }, { projection: { password: 0 } })
    .then(result => {
      if (result) {
        const { country_code } = result;
        const otp = generateSignupOTPForUser();
        return LoginOTP.findOneAndUpdate(
          { phone },
          {
            $setOnInsert: {
              otp: otp,
              phone,
              country_code: country_code,
              attempt: 0,
              date_issued: Math.floor(Date.now() / 1000)
            }
          },
          { upsert: true, returnOriginal: false }
        );
      }
      throw new Error("No user found with this number");
    })
    .then(result => {
      const { otp, country_code } = result.value;
      return sendOTP({ country_code: country_code, phone: phone, otp: otp });
    })
    .then(result => {
      const { MessageId } = result;
      return { status: true, message: "Please verify OTP", data: MessageId };
    })
    .catch(error => {
      throw { status: false, message: error.message };
    });
};

module.exports.resendOTP = parameters => {
  return validate(parameters, "resendOTPForUser")
    .then(result => {
      const { phone, country_code } = result;
      return LoginOTP.findOneAndUpdate(
        { phone: phone },
        { $set: { country_code: country_code } }
      );
    })
    .then(result => {
      const { value } = result;
      if (value) {
        const { attempt, date_issued, phone, country_code } = value;
        const issued = Moment.unix(date_issued);
        const now = Moment.unix(Math.floor(Date.now() / 1000));
        const difference = now.diff(issued, "minutes");
        const otp = generateSignupOTPForUser();
        if (attempt < 5) {
          if (difference >= 2) {
            return LoginOTP.findOneAndUpdate(
              { phone: phone },
              {
                $set: {
                  otp: otp,
                  country_code: country_code,
                  date_issued: Math.floor(Date.now() / 1000)
                },
                $inc: { attempt: 1 }
              },
              { returnOriginal: false }
            );
          }
          throw new Error("Please wait for 2 Mins before requesting OTP");
        } else {
          if (difference >= 10) {
            return LoginOTP.findOneAndUpdate(
              { phone: phone },
              {
                $set: {
                  otp: otp,
                  country_code: country_code,
                  date_issued: Math.floor(Date.now() / 1000),
                  attempt: 0
                }
              },
              { returnOriginal: false }
            );
          }
          throw new Error(
            "Please wait for 10 Minutes you have reached your limit"
          );
        }
      }
      throw new Error("This record does not exists");
    })
    .then(result => {
      const { value } = result;
      if (value) {
        const { phone, country_code, otp } = value;
        return sendOTP({ phone, country_code, otp });
      }
      throw new Error(
        "Manual deletion from database caused this inconsistency"
      );
    })
    .then(result => {
      const { MessageId } = result;
      return {
        status: true,
        message: "OTP Resend successfully",
        data: MessageId
      };
    })
    .catch(error => {
      throw { status: false, message: error.message };
    });
};

module.exports.signup = parameters => {
  return validate(parameters, "addUser")
    .then(result => {
      return Users.insertOne(result);
    })
    .then(result => {
      const { ops, insertedCount } = result;
      if (insertedCount === 1) {
        const { country_code, phone, email } = ops[0];
        const otp = generateSignupOTPForUser();
        const crptoHash = generateSignupToken();
        return Promise.all([
          LoginOTP.insertOne({
            phone: phone,
            country_code: country_code,
            otp: otp,
            attempt: 0,
            date_issued: Math.floor(Date.now() / 1000)
          }),
          SignupTokens.insertOne({
            email: email,
            hash: crptoHash,
            activity: "sign_up"
          })
        ]);
      }
      throw new Error("Error signing up user");
    })
    .then(result => {
      const { phone, otp, country_code } = result[0].ops[0];
      return sendOTP({ country_code: country_code, phone: phone, otp: otp });
    })
    .then(result => {
      const { MessageId } = result;
      return {
        status: true,
        message: "User signed up successfully",
        data: MessageId
      };
    })
    .catch(error => {
      throw { status: false, message: error.message };
    });
};

module.exports.forgotPassword = parameters => {
  return validate(parameters, "forgotPasswordForUser")
    .then(result => {
      const { email } = result;
      return Users.findOne(
        { email: new RegExp(email, "i") },
        {
          projection: {
            email: 1
          }
        }
      );
    })
    .then(result => {
      if (result) {
        const { email } = result;
        return ForgotTokens.findOneAndUpdate(
          { email },
          { $set: { hash: generateSignupToken() } },
          { upsert: true, returnOriginal: false }
        );
      }
      throw new Error(
        "You will recieve an email with reset instructions if you are registerted with us"
      );
    })
    .then(result => {
      //smart would be to check
      const { value } = result;
      if (value) {
        return sendForgotPasswordMail(value);
      }
      throw new Error("Error sending email please contact support");
    })
    .catch(error => {
      throw { status: true, message: error.message };
    });
};

module.exports.changePassword = parameters => {
  return validate(parameters, "resetPasswordForUser")
    .then(result => {
      const { user_id, password, new_password } = result;
      return Users.findOneAndUpdate(
        {
          _id: ObjectId(user_id),

          password: password
        },
        { $set: { password: new_password } },
        { projection: { password: 0 }, returnOriginal: false }
      );
    })
    .then(result => {
      const { value } = result;
      if (value) {
        return {
          status: true,
          message: "Password updated successfully",
          data: value
        };
      }
      throw new Error("Incorrect credentials provided");
    })
    .catch(error => {
      throw { status: true, message: error.message };
    });
};

module.exports.getUserById = parameters => {
  return validate(parameters, "getUserById")
    .then(result => {
      const { user_id } = result;
      return Users.findOne(
        { _id: ObjectId(user_id) },
        { projection: { password: 0 } }
      );
    })
    .then(result => {
      if (result) {
        return {
          message: "User fetched successfully",
          status: true,
          data: result
        };
      }
      throw new Error("no user with this id");
    })
    .catch(error => {
      throw { status: false, message: error.message };
    });
};

module.exports.updateUserById = parameters => {
  return validate(parameters, "editUser")
    .then(result => {
      const { user_id } = result;
      delete result.user_id;
      return Users.findOneAndUpdate(
        { _id: ObjectId(user_id) },
        { $set: result },
        { returnOriginal: false, projection: { password: 0 } }
      );
    })
    .then(result => {
      const { value } = result;
      if (value) {
        return {
          message: "User updated successfully",
          status: true,
          data: value
        };
      }
      throw new Error("no user with this id");
    })
    .catch(error => {
      throw { status: false, message: error.message };
    });
};

//uploading avatar user here
module.exports.uploadAvatarUser = (parameters, file) => {
  return validate(parameters, "getUserById")
    .then(async result => {
      const { user_id } = result;
      delete result.user_id;
      var options = {
        Key: `users/avatars/${Date.now()}`,
        Body: file.buffer,
        ContentType: file.mimetype
      };
      const { Key } = await S3.upload(options).promise();
      result.avatar_media_type = file.mimetype;
      result.avatar_media_url = Key;
      return Users.findOneAndUpdate(
        { _id: ObjectId(user_id) },
        { $set: result },
        { returnOriginal: false }
      );
    })
    .then(result => {
      const { value } = result;

      if (!value) {
        throw new Error("no user found");
      }

      return {
        status: true,
        message: "User updated successfully",
        data: value
      };
    })
    .catch(error => {
      throw { status: false, message: error.message };
    });
};

//deleting avatar user here
module.exports.deleteAvatarUser = parameters => {
  return validate(parameters, "getUserById")
    .then(async result => {
      const { user_id } = result;
      delete result.user_id;

      return Users.findOneAndUpdate(
        { _id: ObjectId(user_id) },
        {
          $unset: { avatar_media_type: "", avatar_media_url: "" }
        }
      );
    })
    .then(result => {
      const { value } = result;
      if (!value) {
        throw new Error("no user found");
      }

      return {
        status: true,
        message: "User updated successfully",
        data: result.ops[0]
      };
    })
    .catch(error => {
      throw { status: false, message: error.message };
    });
};

//get all people to show ...
module.exports.getAllPeople = parameters => {
  return validate(parameters, "getUserById")
    .then(result => {
      const { user_id } = result;
      return Users.aggregate([
        {
          $match: {
            _id: ObjectId(user_id)
          }
        },
        {
          $lookup: {
            from: "users",
            let: { user_id: "$_id", friends: "$friends" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $ne: ["$_id", "$$user_id"] },
                      { $not: [{ $in: ["$_id", "$$friends"] }] }
                    ]
                  }
                }
              },
              {
                $project: { first_name: 1, last_name: 1, email: 1, username: 1 }
              }
            ],
            as: "people"
          }
        },
        {
          $project: {
            people: 1
          }
        }
      ]).next();
    })
    .then(result => {
      return {
        message: "People List fetched successfully",
        status: true,
        data: result.people
      };

      // throw new Error("no user with this id");
    })
    .catch(error => {
      throw { status: false, message: error.message };
    });
};

module.exports.addFriend = parameters => {
  return validate(parameters, "addFriend")
    .then(result => {
      const { user_id, friend_id } = result;
      return Promise.all([
        Users.findOneAndUpdate(
          { _id: { $in: [ObjectId(user_id)] } },
          { $push: { friends: ObjectId(friend_id) } },
          { returnOriginal: false, projection: { password: 0 } }
        ),
        Users.findOneAndUpdate(
          { _id: { $in: [ObjectId(friend_id)] } },
          { $push: { friends: ObjectId(user_id) } },
          { returnOriginal: false, projection: { password: 0 } }
        )
      ]);
    })
    .then(result => {
      const { value } = result[0];
      if (value) {
        return {
          message: "Friend added to your Friend List successfully",
          status: true,
          data: value
        };
      }
      throw new Error("no user with this id");
    })
    .catch(error => {
      throw { status: false, message: error.message };
    });
};

module.exports.removeFriend = parameters => {
  return validate(parameters, "removeFriend")
    .then(result => {
      const { user_id, friend_id, to, from } = result;
      return Promise.all([
        Users.findOneAndUpdate(
          { _id: { $in: [ObjectId(user_id)] } },
          { $pull: { friends: ObjectId(friend_id) } },
          { returnOriginal: false, projection: { password: 0 } }
        ),
        Users.findOneAndUpdate(
          { _id: { $in: [ObjectId(friend_id)] } },
          { $pull: { friends: ObjectId(user_id) } },
          { returnOriginal: false, projection: { password: 0 } }
        ),
        Messages.find({
          $or: [
            { $and: [{ from: from }, { to: to }] },
            { $and: [{ from: to }, { to: from }] }
          ]
        }).toArray()
      ]);
    })
    .then(result => {
      const { value } = result[0];
      if (value) {
        return {
          message: "Friend removed from your Friend List successfully",
          status: true,
          data: value
        };
      }
      throw new Error("no user with this id");
    })
    .catch(error => {
      throw { status: false, message: error.message };
    });
};

module.exports.getAllFriends = parameters => {
  return validate(parameters, "getUserById")
    .then(result => {
      const { user_id } = result;
      return Users.aggregate([
        {
          $match: { _id: ObjectId(user_id) }
        },
        {
          $lookup: {
            from: "users",
            let: { friends: "$friends" },
            pipeline: [
              { $match: { $expr: { $in: ["$_id", "$$friends"] } } },
              {
                $project: {
                  first_name: 1,
                  last_name: 1,
                  username: 1,
                  avatar_media_url: 1
                }
              }
            ],
            as: "friends"
          }
        },
        {
          $project: {
            friends: "$friends"
          }
        }
      ]).next();
    })
    .then(result => {
      return {
        message: "Friends fetched successfully",
        status: true,
        data: result.friends
      };

      // throw new Error("no user with this id");
    })
    .catch(error => {
      throw { status: false, message: error.message };
    });
};
