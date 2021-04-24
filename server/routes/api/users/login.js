const express = require("express");
const router = express.Router();

const controller = require("../../../controllers/userController");

router.post("/email", (request, response) => {
  const parameters = request.body;
  controller
    .emailLogin(parameters)
    .then((result) => {
      response.send(result);
    })
    .catch((error) => {
      response.send(error);
    });
});

router.post("/phone", (request, response) => {
  const parameters = request.body;
  controller
    .phoneLogin(parameters)
    .then((result) => {
      response.send(result);
    })
    .catch((error) => {
      response.send(error);
    });
});

module.exports = router;
