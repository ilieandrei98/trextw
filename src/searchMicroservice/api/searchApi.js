const articleManager = require("../managers/articleManager");
const preferenceManager = require("../managers/preferenceManager");
const articleModel = require("../models/articleModel");
const userModel = require("../../shared/userModel");

const path = "/api/articles/";
var service = function(app) {
  app.get(path + ":id", function(req, res) {
    articleModel.findById(req.params[0], function(err, data) {
      if (!data) {
        res.statusCode = 404;
      } else {
        res.end(JSON.stringify(data));
      }
    });
  });

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

    preferenceManager.getUserPreferenceTags(req.params[0]).then(result => {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(result));
    });
  });

  app.get(path + "preferences/group/:id", function(req, res) {
    if (req.params[0] == null) {
      res.end(Response.error());
    }

    preferenceManager.getGroupPreferenceTags(req.params[0]).then(result => {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(result));
    });
  });

  app.post(path + ":id/likes/add", function(req, res) {
    if (req.params[0] == null) {
      res.end(Response.error());
    }

    articleModel
      .findById(req.params[0])
      .then(result => {
        var article = new articleModel(result);

        article.popularity++;
        article.save().catch(function(err) {
          res.error(err);
        });

        userModel
          .findById(req.body.userId)
          .then(user => {
            if(!user) {
              return;
            }

            article.tags.forEach(element => {
              if (!user.topics.find(x => x.tag == element)) {
                user.topics.push({
                  tag: element,
                  relevance: 1
                });
              } else {
                user.topics.forEach(tagElement => {
                  if (tagElement.tag == element) {
                    tagElement.relevance++;
                  }
                });
              }
            });

            let total = 0;
            for (let i = 0; i < user.topics.length; i++) {
              total += user.topics[i].relevance;
            }

            for (let i = 0; i < user.topics.length; i++) {
              user.topics[i].relevance = parseInt(
                user.topics[i].relevance / total * 100
              );
              
              if(user.topics[i].relevance == 0) {
                user.topics[i].relevance = 1;
              }
            }

            var userToSave = new userModel(user);
            userToSave.save().catch(function(err) {
              res.end(err);
            });

            res.end();
          })
          .catch(function(err) {
            res.error(err);
          });
      })
      .catch(function(err) {
        res.error(err);
      });
  });
};

module.exports = service;
