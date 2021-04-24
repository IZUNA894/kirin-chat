const Service = require("../services/userService");

module.exports.checkDuplicateUser = (request, response, next) => {
  const { email, phone } = request.body;
  return Service.checkDuplicateUser({ email, phone })
    .then(result => {
      result
        ? next()
        : response.send({
            message: "User already exists with this email or phone number",
            status: false
          });
    })
    .catch(error => {
      response.send({
        status: false,
        message: error.message
      });
    });
};

module.exports.checkDuplicateUsername = (request, response, next) => {
  const { username } = request.body;
  return Service.checkDuplicateUsername({ username })
    .then(result => {
      result
        ? next()
        : response.send({
            message: "This username already exists.",
            status: false
          });
    })
    .catch(error => {
      response.send({
        status: false,
        message: error.message
      });
    });
};
