const tagsService = require('../business/tagsService');

const path = '/api/tags/';

var tagsApi = function (app) {
  app.get(path + "default", function(req, res) {
    tagsService.getDefaultTags(function(tags) {
      res.json(tags);
    },
    function(err) {
        res.error(err);
    });
  });

  app.post(path + "default", function(req, res) {
    tagsService.addDefaultTag(req.body, function(tags) {
      res.json(tags);
    },
    function(err){
        res.error(err);
    });
  });

  app.get(path + "user/:id", function(req, res) {
    if (req.params[0] == null) {
      res.end(Response.error());
    }

    tagsService.getUserTags(req.params[0], function(tags) {
      res.json(tags);
    },
    function(err) {
        res.error(err);
    });
  });
};

module.exports = tagsApi;