const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/trex-db', {useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', function(){
    throw "Error while connecting to the database. Please check your connection and try again";
});

db.once('open', function(){
    console.log("***Database connection successfully established!***");
});

module.exports = mongoose;
