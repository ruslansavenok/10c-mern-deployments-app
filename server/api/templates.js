const express = require("express");
const templates = require("../setup/templates");
const router = express.Router();

// TODO:
// Integrate with Mongo
router.get("/", function (req, res) {
  return res.json(templates);
});

module.exports = router;
