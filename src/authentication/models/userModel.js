const mongoose = require('../../dataAccess/db');

const userSchema = new mongoose.Schema({
    fullName:String,
    username: {
        type:String,
        unique: true
    },
    password:String,
    email:String,
    topics: [String]
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;