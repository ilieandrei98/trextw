const tagModel = require("../models/tagModel");
const userModel = require("../../shared/userModel");

class tagsService {
  getDefaultTags(callback, onError) {
    var searchResult = tagModel.find({});

    searchResult.then(function(data) {
      if (data.length) {
        callback(data);
      } else {
        onError([]);
      }
    });
  }

  addDefaultTag(data, callback, onError) {
    var tag = new tagModel(data);
    tag.save(function(err, data) {
      if (err) {
        onError(err);
      } else {
        callback(data);
      }
    });
  }

  getUserTags(userId, callback, onError) {
    userModel.findById(userId).then(function(res) {
      if (res) {
        var tags = [];
        res.topics.forEach(element => {
          tags.push(element.tag);
        });

        callback(tags);
      } else {
        onError([]);
      }
    });
  }
}

module.exports = new tagsService();
