const group = require('../models/groupModel');
const ObjectId = require('mongoose').Types.ObjectId;

var service = function (app) {
    app.get('/groups', function (req, res) {
       
        group.find({}, function (err, groups) {
           
            if (groups.length == 0)
            {
                res.statusCode = 404;
                res.send('Not found');
            }
            else {
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(groups));  
            }
           
        })
    });

    app.get('/groups/:id', function (req, res) {
        group.findById(req.params[0], function (err, data) {
                      
            if (data.length == 0)
            {
                res.statusCode = 404;
                res.send('Not found');
            }
            else
            if (err) {
                res.statusCode = 500;
                res.end();
            }
            else {
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(data));  
            }
        });
    });

    app.delete('/groups/delete/:id', function (req, res) {
        group.findOneAndDelete(req.params[0], (err, group) => {
            if (err) {
                res.statusCode = 500;
                res.end();
            }    
            
            res.statusCode = 204;
            res.end();
        });

       
    })

    app.post('/groups/create', function (req, res) {
        var model = new group(req.body);
        res.statusCode = 201;
        model.save().catch(function (err) {
            console.log(err);
            res.statusCode = 500;
        });

        res.end();
    });
}
module.exports = service;
