const exampleModel = require("../models/exampleModel");
const articleManager = require("../managers/articleManager");

var service = function(app) {
  app.get("/", function(req, res) {
    exampleModel.find({}).then(function(data) {
      res.end(JSON.stringify(data));
    });
  });

  app.get("/:id", function(req, res) {
    exampleModel.findById(req.params[0], function(err, data) {
      res.end(JSON.stringify(data));
    });
  });

  app.post("/", function(req, res) {
    var model = new exampleModel(req.body);

    model.save().catch(function(err) {
      console.log(err);
    });

    res.end();
  });

  app.get("/articles/search?keyword=:param", function(req, res) {
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

        articleManager
          .searchArticleOnMedium(req.params[0])
          .then(response => {
            let toReturn = JSON.stringify(response);

            res.setHeader("Content-Type", "application/json");
            res.end(toReturn);
          });

        return;
      });
  });
};

module.exports = service;
