const mongoose = require('../../dataAccess/db');

const exampleSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const model = mongoose.model('example', exampleSchema);

module.exports = model;