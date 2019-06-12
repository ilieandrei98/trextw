const mongoose = require('../../../dataAccess/db');

const userPreferencesSchema= new mongoose.Schema({
    title: String,
    mediumId: String,
    previewContent: String,
    popularity: {type: Number, default: 1},
    tags: [String],
    text: String,
    previewImage: String,
    createdAt: { type: Date, default: Date.now }
});

const model = mongoose.model('article', articleSchema);

module.exports = model;