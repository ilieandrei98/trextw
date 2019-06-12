const authenticationService = require('../business/authenticationService');

const path = '/api/users/';

var authenticationApi = function (app) {
    app.post(path + 'register', function (req, res) {
        authenticationService.register(req.body, function(user){
            res.json(user);
        },
        function(err){
            res.error(err);
        });
    });

    app.post(path + 'add-topics', function (req, res) {
        authenticationService.addTopics(req.body, function(user){
            res.json(user);
        },
        function(err){
            res.error(err);
        });
    });

    app.post(path + 'login', function (req, res) {
        authenticationService.login(req.body, function(user){
            res.json(user);
        },
        function(err){
            res.error(err);
        });
    });


};

module.exports = authenticationApi;