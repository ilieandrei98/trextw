const mongoose = require('../dataAccess/db');

const tagSchema = new mongoose.Schema(
    {
      tag: {
        type: String, 
        required: true
      },
      relevance: {
        type: Number, 
        required: true
      },
    },
    { noId: true }
  );

const userSchema = new mongoose.Schema({
    fullName:{
      type: String, 
      required: true
    },
    username: {
        type:String,
        unique: true,
        required: true
    },
    password:{
      type: String, 
      required: true
    },
    email:{
      type: String, 
      required: true
    },
    topics: [tagSchema]
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;