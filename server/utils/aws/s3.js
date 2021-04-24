const AWS = require("./aws");
const config = require("../../config");

const S3 = new AWS.S3({ params: { Bucket: config.AWS_BUCKET } });

module.exports.defaultS3 = () => {
  return S3;
};
