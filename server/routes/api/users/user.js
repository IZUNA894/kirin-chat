const express = require("express");
const multer = require("multer");
const router = express.Router();

const loginRoutes = require("./login");
const verifyRoutes = require("./verify");
const passwordRoutes = require("./password");
const peopleRoutes = require("./people");
const {
  checkDuplicateUser: duplicateUser,
  checkDuplicateUsername: duplicateUsername
} = require("../../../middlewares/user");
const upload = multer({});
const controller = require("../../../controllers/userController");

router.post("/resend", (request, response) => {
  const parameters = request.body;
  controller
    .resendOTP(parameters)
    .then(result => {
      response.send(result);
    })
    .catch(error => {
      response.send(error);
    });
});

router.post(
  "/signup",
  duplicateUser,
  duplicateUsername,
  (request, response) => {
    const parameters = request.body;
    controller
      .signup(parameters)
      .then(result => {
        response.send(result);
      })
      .catch(error => {
        response.send(error);
      });
  }
);

router.get("/", (request, response) => {
  const parameters = request.query;
  controller
    .getUserById(parameters)
    .then(result => {
      response.send(result);
    })
    .catch(error => {
      response.send(error);
    });
});

router.put("/", (request, response) => {
  const parameters = request.body;
  controller
    .updateUserById(parameters)
    .then(result => {
      response.send(result);
    })
    .catch(error => {
      response.send(error);
    });
});

//upload avatar
router.post("/avatars", upload.single("media"), (request, response) => {
  const { body: parameters, file } = request;

  controller
    .uploadAvatarUser(parameters, file)
    .then(result => {
      response.send(result);
    })
    .catch(error => {
      response.send(error);
    });
});

//delete avatar
router.delete("/avatars", (request, response) => {
  const parameters = request.body;
  controller
    .deleteAvatarUser(parameters)
    .then(result => {
      response.send(result);
    })
    .catch(error => {
      response.send(error);
    });
});

router.use("/login", loginRoutes);
router.use("/verify", verifyRoutes);
router.use("/password", passwordRoutes);
router.use("/people", peopleRoutes);
//Export methods
module.exports = router;
