const express = require("express");
const Deployment = require("../models/Deployment");
const templates = require("../config/templates");
const router = express.Router();

function generateError(msg, fields) {
  return { error: msg, fields };
}

function respondWithUnknownError(e, res) {
  console.log(e);
  res.status(500).send("Unknown error");
}

router.get("/", async function (req, res) {
  try {
    const deployments = await Deployment.find()
      .sort({ deployedAt: -1 })
      .limit(100);
    res.json(deployments);
  } catch (e) {
    respondWithUnknownError(e, res);
  }
});

router.post("/", async function (req, res) {
  try {
    const data = req.body;
    const deployment = new Deployment(data);
    await deployment.save();
    res.json(deployment);
  } catch (e) {
    if (e.errors) {
      res.status(400).json(generateError("Invalid form", e.errors));
    } else {
      respondWithUnknownError(e, res);
    }
  }
});

router.delete("/:id", async function (req, res) {
  const { id } = req.params;

  try {
    const deployment = await Deployment.findById(id);

    if (!deployment) {
      return res
        .status(404)
        .json(generateError(`Can't find deployment with id=${id}`));
    }

    await deployment.remove();
    res.json({ id });
  } catch (e) {
    respondWithUnknownError(e, res);
  }
});

module.exports = router;
