const mongoose = require("mongoose");
const { randomInteger } = require("../setup/utils");
const templates = require("../setup/templates");
const { Schema } = mongoose;

const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

const DeploymentSchema = Schema({
  url: {
    type: String,
    required: true,
    validate: {
      validator: (val) => URL_REGEX.test(val),
      message: (props) => `${props.value} is not a valid url!`,
    },
  },
  templateName: {
    type: String,
    required: true,
    validate: {
      validator: (val) =>
        templates.find((item) => item.name === val) !== undefined,
      message: "Invalid value",
    },
  },
  version: {
    type: String,
    required: true,
    validate: {
      validator: function (val) {
        const templateName = this.templateName;
        const template = templates.find((item) => item.name === templateName);

        if (template && !template.versions.includes(val)) {
          return false;
        } else {
          return true;
        }
      },
      message: "Invalid value",
    },
  },
  deployedAt: {
    type: Date,
    default: () => new Date().getTime() + randomInteger(30, 60) * 1000,
  },
});

module.exports = mongoose.model("deployment", DeploymentSchema);
