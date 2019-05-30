const groupModel = require('../models/groupModel');
const ObjectId = require('mongoose').Types.ObjectId;

const path = "/api/groups/"

var service = function (app) {
    app.get(path, function (req, res) {
        exampleModel.find({}).then(function(data){
            res.end(JSON.stringify(data));
        });
    });

    app.get(path + ':id', function(req, res){
        groupModel.findById(req.params[0], function(err, data){
            res.end(JSON.stringify(data));
        });
    });

    app.post(path, function (req, res) {
        var model = new groupModel(req.body);
        
        model.save().catch(function(err){
            console.log(err);
        });

        res.end();
    });
}

module.exports = service;