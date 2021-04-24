const pug = require("pug");

const generateVerifyEmailMailWith = pug.compileFile(
  "server/views/verify-email.pug"
);

module.exports.verifyEmail = (parameters) => {
  const { to, name, url } = parameters;
  const VerifyEmailMail = generateVerifyEmailMailWith({ name: name, url: url });
  const mailOptions = {
    from: "Knockyoursalesoff <no-reply@knockyoursalesoff.com>",
    // replyTo: "amit@upxar.com",
    to: to,
    subject: "Knockyoursalesoff: Verify your Email",
    html: VerifyEmailMail,
    cc: "nitish.makhija@yahoo.com",
    bcc: "harshit3131@gmail.com",
    attachments: [
      {
        path: "server/public/assets/images/knockyoursalesoff.png",
        cid: "outreach-octopus-logo@outreachoctopus.com",
      },
      {
        path: "server/public/assets/images/facebook2x.png",
        cid: "facebook2x@outreachoctopus.com",
      },
      {
        path: "server/public/assets/images/instagram2x.png",
        cid: "instagram2x@outreachoctopus.com",
      },
      {
        path: "server/public/assets/images/twitter2x.png",
        cid: "twitter2x@outreachoctopus.com",
      },
      {
        path: "server/public/assets/images/linkedin2x.png",
        cid: "linkedin2x@outreachoctopus.com",
      },
      {
        path: "server/public/assets/images/verify.png",
        cid: "verify@outreachoctopus.com",
      }
    ],
  };
  return mailOptions;
};
