const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const setupMongo = require("./config/setup_mongo");
const { deployments, templates } = require("./api");

const app = express();
const PORT = process.env.PORT || 3001;
const DB_URL =
  process.env.DB_URL ||
  "mongodb+srv://ruslansavenok:QgJCF7gkxpXAOcSV@cluster0-uuvgz.mongodb.net/test?retryWrites=true&w=majority";

setupMongo(DB_URL);

app.use(cors());
app.use(express.json());
app.use(morgan("combined"));
app.use("/api/deployments", deployments);
app.use("/api/templates", templates);

app.listen(PORT, function () {
  console.log(`Server started at port=${PORT}`);
});
