const mongoose = require("../dataAccess/db");
const uniqueArrayPlugin = require("mongoose-unique-array");

const tagSchema = new mongoose.Schema(
  {
    tag: { type: String, required: true },
    relevance: { type: Number, required: true }
  },
  { noId: true }
);

const groupSchema = new mongoose.Schema({
  groupName: {
    type: String,
    unique: true,
    required: true
  },
  tags: {
    type: [tagSchema],
    required: true
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  createdAt: { type: Date, default: Date.now }
});
groupSchema.plugin(uniqueArrayPlugin);

const model = mongoose.model("groups", groupSchema);

module.exports = model;
