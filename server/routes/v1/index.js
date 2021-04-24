const express = require("express");
const router = express.Router();

const apiRoutes = require("../api");

router.use("/v1", apiRoutes);

module.exports = router;
