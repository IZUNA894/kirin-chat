module.exports.verifySignupEmail = (parameters) => {
  const { email, hash } = parameters;
  const link = `https://www.knockyoursalesoff.com/api/v1/organizations/verify/${hash}`;
  const mailOptions = {
    from: "Knockyoursalesoff <no-reply@knockyoursalesoff.com>",
    to: email,
    subject: "Knockyoursalesoff: Verify your email",
    text: `Your verification link is \n ${link}`,
  };
  return mailOptions;
};

module.exports.forgotPasswordReset = (parameters) => {
  const { to } = parameters;
  // const partnerEmail = generatePartneremailMailWith({ name: name });
  const mailOptions = {
    from: "Knockyoursalesoff <no-reply@knockyoursalesoff.com>",
    // replyTo: "amit@upxar.com",
    to: "nitish.makhija@yahoo.com",
    subject: "Knockyoursalesoff: Verify your email",
    text: "I hope this message gets sent!",
  };
  return mailOptions;
};
