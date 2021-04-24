const express = require("express");
const router = express.Router();

const controller = require("../../../controllers/userController");

router.get("/email/:hash", (request, response) => {
  const parameters = request.params;
  controller
    .verifyEmailSignup(parameters)
    .then(result => {
      // response.redirect("/app-email-verified");
      response.send("email-verified");
    })
    .catch(error => {
      // response.redirect("/email-verification-failed");
      response.send("email verified successfully");
    });
});

router.post("/phone", (request, response) => {
  const parameters = request.body;
  controller
    .verifyOTPSignup(parameters)
    .then(result => {
      response.send(result);
    })
    .catch(error => {
      response.send(error);
    });
});

module.exports = router;
