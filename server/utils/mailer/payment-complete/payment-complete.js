const pug = require("pug");

const generatePaymentCompleteMailWith = pug.compileFile(
  "server/views/payment-complete.pug"
);

module.exports.paymentComplete = (parameters) => {
  const { to, name, url } = parameters;
  const PaymentCompleteMail = generatePaymentCompleteMailWith({ name: name, url: url });
  const mailOptions = {
    from: "Knockyoursalesoff <no-reply@knockyoursalesoff.com>",
    // replyTo: "amit@upxar.com",
    to: to,
    subject: "Knockyoursalesoff: Payment Complete",
    html: PaymentCompleteMail,
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
        path: "server/public/assets/images/payment.png",
        cid: "payment@outreachoctopus.com",
      }
    ],
  };
  return mailOptions;
};
