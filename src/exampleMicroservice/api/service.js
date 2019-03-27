const exampleModel = require('../models/exampleModel');
const ObjectId = require('mongoose').Types.ObjectId;

var service = function (app) {
    app.get('/', function (req, res) {
        exampleModel.find({}).then(function(data){
            res.end(JSON.stringify(data));
        });
    });

    app.get('/:id', function(req, res){
        exampleModel.findById(req.params[0], function(err, data){
            res.end(JSON.stringify(data));
        });
    });

    app.post('/', function (req, res) {
        var model = new exampleModel(req.body);
        
        model.save().catch(function(err){
            console.log(err);
        });

        res.end();
    });
}

module.exports = service;