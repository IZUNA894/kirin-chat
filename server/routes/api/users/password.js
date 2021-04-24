const express = require("express");
const router = express.Router();

const controller = require("../../../controllers/userController");

router.get("/reset/:hash", (request, response) => {
  const parameters = request.params;
  controller
    .verifyForgotPassword(parameters)
    .then(result => {
      // response.redirect("/reset-password");
      response.send("passwrod reset successfully to 12345");
    })
    .catch(error => {
      response.send("passwrod reset  error occurred ");
    });
});

router.post("/forgot", (request, response) => {
  const parameters = request.body;
  controller
    .forgotPassword(parameters)
    .then(result => {
      response.send(result);
    })
    .catch(error => {
      response.send(error);
    });
});

router.post("/change", (request, response) => {
  const parameters = request.body;
  controller
    .changePassword(parameters)
    .then(result => {
      response.send(result);
    })
    .catch(error => {
      response.send(error);
    });
});

module.exports = router;
