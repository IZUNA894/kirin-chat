const express = require("express");
const router = express.Router();

const controller = require("../../../controllers/messageController");

router.get("/all", (request, response) => {
  const parameters = request.query;
  controller
    .getAllMessages(parameters)
    .then(result => {
      response.send(result);
    })
    .catch(error => {
      response.send(error);
    });
});

module.exports = router;
