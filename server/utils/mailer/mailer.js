const mailer = require("nodemailer");

const SES = require("../aws/ses").defaultSES;
const transporter = mailer.createTransport({ SES: SES() });

// const {
//   verifySignupEmail: verifyOrganizationEmail
// } = require("./organizations/organization");
const {
  verifySignupEmail: verifyUserEmail,
  forgotPasswordEmail
} = require("./users/user");
// const { forgotPassword } = require("./forgot-password/forgot-password");
// const { forgotUserPassword } = require("./forgot-password/forgot-password");
// const { sendProspectContract } = require("./contract/prospect");
// const { sendClientContract } = require("./contract/client");
// const SmartChalkMail = require("./smartchalk/smart-chalk");
// const AfterSalesMail = require("./after-sales/after-sales");
// const SmartChalkIntro = require("./smartchalk-intro/smartchalk-intro");
// const Partneremail = require("./partner-email/partner-email");

module.exports.sendChurchSignUpVerificationMail = parameters => {
  const mailOptions = verifyOrganizationEmail(parameters);
  return transporter
    .sendMail(mailOptions)
    .then(result => {
      return result;
    })
    .catch(error => {
      return error;
    });
};

module.exports.sendUserSignUpVerificationMail = parameters => {
  const mailOptions = verifyUserEmail(parameters);
  return transporter
    .sendMail(mailOptions)
    .then(result => {
      return result;
    })
    .catch(error => {
      return error;
    });
};

// module.exports.sendOrganizationForgotPasswordMail = parameters => {
//   const mailOptions = forgotPassword(parameters);
//   return transporter
//     .sendMail(mailOptions)
//     .then(result => {
//       return {
//         status: true,
//         message:
//           "You will recieve an email with reset instructions if you are registerted with us"
//       };
//     })
//     .catch(error => {
//       throw new Error(
//         `Error sending email please contact support ${error.message}`
//       );
//     });
// };

module.exports.sendUserForgotPasswordMail = parameters => {
  const mailOptions = forgotPasswordEmail(parameters);
  return transporter
    .sendMail(mailOptions)
    .then(result => {
      return {
        status: true,
        message:
          "You will recieve an email with reset instructions if you are registerted with us"
      };
    })
    .catch(error => {
      throw new Error(
        `Error sending email please contact support ${error.message}`
      );
    });
};

// module.exports.sendProspectContractMail = parameters => {
//   const mailOptions = sendProspectContract(parameters);
//   return transporter.sendMail(mailOptions);
// };

// module.exports.sendClientContractMail = parameters => {
//   const mailOptions = sendClientContract(parameters);
//   return transporter.sendMail(mailOptions);
// };
