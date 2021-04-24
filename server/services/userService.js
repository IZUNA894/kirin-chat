const { toObjectId: ObjectId } = require("../database");
const { getUserCollection: UserCollection } = require("../database");
// const AreaCategoryCollection = require("../database").getAreaCategoryCollection();

module.exports.checkDuplicateUser = parameters => {
  const { email, phone } = parameters;
  return UserCollection()
    .findOne({
      $or: [{ email }, { phone }]
    })
    .then(result => {
      return result === null ? true : false;
    });
};

module.exports.checkDuplicateUsername = parameters => {
  const { username } = parameters;
  return UserCollection()
    .findOne({
      username
    })
    .then(result => {
      return result === null ? true : false;
    });
};

module.exports.findUserByEmail = ({ email }) => {
  return UserCollection().findOne({
    email: new RegExp(email, "i")
    // role: "admin",
  });
};
