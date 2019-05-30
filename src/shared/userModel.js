const mongoose = require('../dataAccess/db');

const tagSchema = new mongoose.Schema(
    {
      tag: String,
      relevance: Number
    },
    { noId: true }
  );

const userSchema = new mongoose.Schema({
    fullName:String,
    username: {
        type:String,
        unique: true
    },
    password:String,
    email:String,
    topics: [tagSchema]
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;