module.exports = {
  MONGO_URL:
    "mongodb+srv://<username>:<password>@cluster1.tuia5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  MONGO_DATABASE_NAME_TEST: "kirin-test",
  AWS_BUCKET: "kirin-izuna",
  AWS_REGION: "ap-south-1",
  AWS_USERNAME: "",
  AWS_ACCESS_KEY_ID: "",
  AWS_SECRET_ACCESS_KEY: ""
};

module.exports.imageUploadFilter = (request, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|PNG|JPEG)$/)) {
    return cb(new Error("Only image files are allowed"), false);
  }
  cb(null, true);
};

module.exports.getOTPForChurchSignUp = () => {
  let minm = 10000;
  let maxm = 99999;
  return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
};

module.exports.generateSignupOTPForUser = () => {
  let minm = 100000;
  let maxm = 999999;
  return (Math.floor(Math.random() * (maxm - minm + 1)) + minm).toString();
};

module.exports.generateSignupToken = () => {
  var result = "";
  var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

module.exports.generateForgotPasswordToken = () => {
  var result = "";
  var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 50; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
