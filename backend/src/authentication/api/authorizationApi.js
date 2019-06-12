const authorizationService = require('../business/authorizationService')
const secretKey = require('../../../config.json').secretKey;
const path = '/api/authorization/';

var authorizationApi = function(app){
    app.post(path, function(req, res){
        const token = authorizationService.createToken(req.body, secretKey);
        res.json({
            token:token
        });
    });

    app.post(path + 'verify', function(req, res){
        const token = req.body.token;
        authorizationService.verifyToken(token, secretKey, function(err, decode){
            if(err){
                res.json({
                    success: false
                });
            } else{
                res.json({
                    success: true
                });
            }
        });
    });
};

module.exports = authorizationApi;