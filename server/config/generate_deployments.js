const Deployment = require("../models/Deployment");
const templates = require("../config/templates");

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function addDeployment() {
  const template = templates[randomInteger(0, templates.length - 1)];
  const data = {
    url: "https://10clouds.com",
    templateName: template.name,
    version: template.versions[randomInteger(0, template.versions.length - 1)],
  };

  const deployment = new Deployment(data);

  try {
    await deployment.save();
    console.log("Generated deployment", new Date(), data);
  } catch (e) {
    console.log("Failed to generate deployment", data, e);
  }
}

function generateDeployments() {
  const timeout = randomInteger(5, 30);

  console.log(`Schedule to generate deployment in ${timeout} seconds`);

  setTimeout(function () {
    addDeployment();
    generateDeployments();
  }, timeout * 1000);
}

module.exports = generateDeployments;
