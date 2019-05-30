const mongoose = require("../../../dataAccess/db");

const tagSchema = new mongoose.Schema(
  {
    tag: String,
    relevance: Number
  },
  { noId: true }
);

const userSchema = new mongoose.Schema({
  userName: String,
  firstName: String,
  lastName: String,
  password: String,
  preferences: [tagSchema]
});

const model = mongoose.model("users", userSchema);

module.exports = model;
