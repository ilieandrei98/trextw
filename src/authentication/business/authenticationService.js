const userModel = require('../models/userModel');
const userDto = require('../models/userDto');

class authenticationService {
    register(data, callback, onError){
        var user = new userModel(data);        
        user.save(function(err, data){
            if(err){
                onError(err);
            }
            else{
                callback(data);
            }
        });
    }

    login(data, callback, onError){
        var searchResult = userModel.find({
            username: data.username,
            password: data.password
        });

        searchResult.then(function (data) {
            if (data.length) {
                var loggedInUser = new userDto(data.firstOrUndefined());

                callback(loggedInUser);
            }
            else {
                var response = {
                    message: "Error, user not found"
                };

                onError(response);
            }
        });
    }
};

module.exports = new authenticationService();