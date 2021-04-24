const express = require("express");

const userRoutes = require("./users/user");
const mediaRoutes = require("./media/media");
const messageRoutes = require("./messages/message");
const router = express.Router();

router.use("/users", userRoutes);
router.use("/media", mediaRoutes);
router.use("/messages", messageRoutes);
module.exports = router;
