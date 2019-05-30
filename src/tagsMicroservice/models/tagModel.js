const mongoose = require("../../dataAccess/db");

const tagSchema = new mongoose.Schema({
  tagName: {
    type: String,
    unique: true,
    required: true
  }
});

const tagModel = mongoose.model("DefaultTag", tagSchema);

module.exports = tagModel;
