<<<<<<< HEAD
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
=======
    const mongoose = require('../../dataAccess/db');

const groupSchema = new mongoose.Schema({
    name: String,
    Id: String,
    members: [String],
    tags: [String],
    createdAt: { type: Date, default: Date.now }
});

const model = mongoose.model('group', groupSchema);
>>>>>>> 63ef63420f060ecbe3c6bf80a6a6f4d2edb6c496

module.exports = model;