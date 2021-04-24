const express = require("express");

const router = express.Router();

const controller = require("./../../../controllers/userMediaController");

router.get("/avatars/:name", (request, response) => {
  const parameters = request.params;
  controller
    .downloadUserAvatar(parameters)
    .then(result => {
      response.set("Content-Type", result.metaData);
      response.send(result.file);
    })
    .catch(error => {
      response.send(error);
    });
});

module.exports = router;
