const AWS = require("./aws");
const generateOTP = require("../../config").getOTPForUserSignUp;

const SNS = new AWS.SNS();

module.exports.sendOTPForUserSignup = (parameters) => {
  const { country_code, phone, otp } = parameters;
  return SNS.publish({
    Message: `Your OTP for verification is ${otp}`,
    PhoneNumber: `+${country_code}${phone}`,
  })
    .promise()
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw new Error('Error sending OTP');
    });
};
