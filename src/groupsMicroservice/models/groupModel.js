const mongoose = require('../../dataAccess/db');

const tagSchema = new mongoose.Schema(
    {
      tag: String,
      relevance: Number
    },
    { noId: true }
  );
  
const groupSchema = new mongoose.Schema({
    groupName: String,
    tags: [tagSchema]
});

const model = mongoose.model('groups', groupSchema);

module.exports = model;