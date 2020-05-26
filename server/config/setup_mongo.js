const mongoose = require("mongoose");
const generateDeployments = require("./generate_deployments");

async function setupMongo(url) {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to MongoDB!");

    //generateDeployments();
  } catch (e) {
    console.error("Connection to DB failed", e.message);
    process.exit(1);
  }
}

module.exports = setupMongo;
