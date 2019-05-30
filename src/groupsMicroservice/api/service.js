const groupModel = require('../models/groupModel');
const ObjectId = require('mongoose').Types.ObjectId;

var service = function (app) {
    app.get('/groups', function (req, res) {
        exampleModel.find({}).then(function(data){
            res.end(JSON.stringify(data));
        });
    });

    app.get('/groups/:id', function(req, res){
        groupModel.findById(req.params[0], function(err, data){
            res.end(JSON.stringify(data));
        });
    });

    app.post('/groups', function (req, res) {
        var model = new groupModel(req.body);
        
        model.save().catch(function(err){
            console.log(err);
        });

        res.end();
    });
}

module.exports = service;