const express = require("express");
const router = express.Router();

const controller = require("../../../controllers/userController");

router.get("/all", (request, response) => {
  const parameters = request.query;
  controller
    .getAllPeople(parameters)
    .then(result => {
      response.send(result);
    })
    .catch(error => {
      response.send(error);
    });
});

router.get("/friends/all", (request, response) => {
  const parameters = request.query;
  controller
    .getAllFriends(parameters)
    .then(result => {
      response.send(result);
    })
    .catch(error => {
      response.send(error);
    });
});

router.post("/friends", (request, response) => {
  const parameters = request.body;
  controller
    .addFriend(parameters)
    .then(result => {
      response.send(result);
    })
    .catch(error => {
      response.send(error);
    });
});

router.delete("/friends", (request, response) => {
  const parameters = request.body;
  controller
    .removeFriend(parameters)
    .then(result => {
      response.send(result);
    })
    .catch(error => {
      response.send(error);
    });
});

module.exports = router;
