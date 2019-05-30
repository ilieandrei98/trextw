const mongoose = require('../../dataAccess/db');

const metaArticleSchema = new mongoose.Schema({
    title: String,
    mediumId: String,
    articleId: String,
    previewContent: String,
    popularity: Int16Array,
    createdAt: { type: Date, default: Date.now },
    tags: [String]
});

const model = mongoose.model('metaArticle', metaArticleSchema);

module.exports = model;