    const mongoose = require('../../dataAccess/db');

const groupSchema = new mongoose.Schema({
    name: String,
    Id: String,
    members: [String],
    tags: [String],
    createdAt: { type: Date, default: Date.now }
});

const model = mongoose.model('group', groupSchema);

module.exports = model;