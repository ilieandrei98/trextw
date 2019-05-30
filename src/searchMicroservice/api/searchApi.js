const articleManager = require("../managers/articleManager");
const preferenceManager = require("../managers/preferenceManager");

const path = '/api/articles/';
var service = function(app) {
  app.get(path + "search?keyword=:param", function(req, res) {
    if (req.params[0] == null) {
      res.end(Response.error());
    }

    articleManager
      .searchArticleInDatabase(req.params[0])
      .then(articlesResponse => {
        if (articlesResponse.length) {
          let toReturn = JSON.stringify(articlesResponse);

          res.setHeader("Content-Type", "application/json");
          res.end(toReturn);

          articleManager.searchArticleOnMedium(req.params[0]);

          return;
        }

        articleManager.searchArticleOnMedium(req.params[0]).then(response => {
          let toReturn = JSON.stringify(response);

          res.setHeader("Content-Type", "application/json");
          res.end(toReturn);
        });

        return;
      });
  });

  app.get(path + "preferences/:id", function(req, res) {
    if (req.params[0] == null) {
      res.end(Response.error());
    }

    preferenceManager
      .getUserPreferenceTags(req.params[0])
      .then(result => {          
        
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(result));
      });
  });
};

module.exports = service;
