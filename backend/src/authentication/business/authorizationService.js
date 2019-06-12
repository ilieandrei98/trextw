const userModel = require('../../shared/userModel');
const userDto = require('../models/userDto');
const jwt = require('jsonwebtoken');

class authorizationService {
    createToken(body, secretKey){
        const payload = {
            username: body.username,
        };

        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
        
        return token;
    }

    verifyToken(token, secretKey, callback){
        jwt.verify(token, secretKey, callback);
    }
};

module.exports = new authorizationService();