const AWS = require("../utils/aws/s3").defaultS3;
const S3 = AWS();

module.exports.downloadUserAvatar = parameters => {
  const name = `users/avatars/${parameters.name}`;
  return S3.getObject({ Key: name })
    .promise()
    .then(result => {
      const file = Buffer.from(result.Body);
      return { file: file, metaData: result.ContentType };
    })
    .catch(error => {
      throw { status: false, message: error.message };
    });
};
