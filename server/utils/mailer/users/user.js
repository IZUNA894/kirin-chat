module.exports.verifySignupEmail = parameters => {
  const { email, hash } = parameters;
  const link = `http://localhost:8080/api/v1/users/verify/email/${hash}`;
  const mailOptions = {
    from: "Webellite <no-reply@webellite.com>",
    to: email,
    subject: "Kirin Chat App: Verify your email",
    text: `Your verification link is for Kirin Chat App \n ${link}`
  };
  return mailOptions;
};

module.exports.forgotPasswordEmail = parameters => {
  const { email, hash } = parameters;
  const link = `http://localhost:8080/api/v1/users/password/reset/${hash}`;
  const mailOptions = {
    from: "Webellite <no-reply@webellite.com>",
    to: email,
    subject: "Kirin Chat App: Reset your password",
    text: `Clink on the link to change your password for Kirin Chat App \n ${link}`
  };
  return mailOptions;
};
