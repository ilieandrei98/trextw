const userModel = require('../../shared/userModel');
const userDto = require('../models/userDto');

class authenticationService {
    register(data, callback, onError) {
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

    addTopics(data, callback, onError) {
        userModel.findById(data.userId).then(res => {
            var topics = data.topics;
            res.topics = [];

            topics.forEach(element => {
                var topic = new Object();
                topic.tag = element;
                topic.relevance = parseInt(100 / topics.length);

                res.topics.push(topic);
            });

            var user = new userModel(res);        
            user.save(function(err, data){
                if(err) {
                    onError(err);
                }
                else {
                    callback(data);
                }
            });
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