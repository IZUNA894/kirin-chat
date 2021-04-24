const AWS = require("./aws");

const SES = new AWS.SES();

module.exports.defaultSES = () => {
  return SES;
};
