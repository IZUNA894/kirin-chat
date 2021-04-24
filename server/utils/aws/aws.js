const AWS = require("aws-sdk");
const config = require("../../config");

AWS.config.update({
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  region: config.AWS_REGION,
  apiVersion: "latest"
});

module.exports = AWS;
