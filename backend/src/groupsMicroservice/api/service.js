const group = require("../../shared/groupModel");
const user = require("../../shared/userModel");

const path = "/api/groups";

var service = function(app) {
  app.get(path, function(req, res) {
    group.find({}, function(err, groups) {
      res.end(JSON.stringify(groups));
    });
  });

  app.get(path + "/users/:id", function(req, res) {
    group.find({ members: req.params[0] }, function(err, groups) {
      res.end(JSON.stringify(groups));
    });
  });

  app.get(path + "/:id", function(req, res) {
    group.findById(req.params[0], function(err, data) {
      if (!data) {
        res.statusCode = 404;
      } else {
        res.end(JSON.stringify(data));
      }
    });
  });

  app.delete(path + "/:id", function(req, res) {
    group.findById(req.params[0], (err, targetGroup) => {
      if (err) {
        res.end(JSON.stringify(err));
      }

      if (!req.body.userId) {
        req.statusCode = 404;
        res.end();
        return;
      }
      if (targetGroup.groupCreator == req.body.userId) {
        group.findByIdAndDelete(targetGroup.id, (err, targetGroup) => {
          if (err) {
            res.end(JSON.stringify(err));
          }

          res.statusCode = 204;
          res.end();
        })
      }
      else {
        res.statusCode = 403;
        res.end();
      }
    });
  });

  //edit group
  app.put(path, function (req, res) {
    group.findById(req.body.groupId, (err,targetGroup) => {
      if (err || !targetGroup) {
        res.statusCode = 404;
        res.end();
      }

      if (targetGroup.groupCreator == req.body.userId) {
        if (req.body.groupName) {
        targetGroup.groupName = req.body.groupName;
        }
        if (req.body.tags) {
          targetGroup.tags = req.body.tags;
        }
        targetGroup.save();

        res.statusCode = 200;
        res.end();
        return;
      }
      else {
        res.statusCode = 403;
        res.end();
      }

    })
  })

  //join group
  app.post(path + "/join", function (req, res) {
    if (req.body.groupId&&req.body.userId) {
      group.findById(req.body.groupId, function (err, group) {
        if (err||!group) {
          res.statusCode = 404;
          res.end();

          return;
        }
        else {

          user.findById(req.body.userId, function (err, user) {
            if (err||!user) {
              res.statusCode = 404;
              res.end();

              return;
            }
            else {
              group.members.push(user);
              group.save();
              res.statusCode = 201;
              res.end();

              return;
            }

          })

        }

      })
    }
  })

  //leave group
  app.delete(path + "/leave", function (req, res) {
    if (req.body.groupId && req.body.userId) {
      group.findById(req.body.groupId, function (err, group) {
        if (err || !group) {
          res.statusCode = 404;
          res.end();

          return;
        }
        else {
          if (group.members.indexOf(req.body.userId)==-1) {
            res.statusCode = 404;
            res.end();

            return;
          }
          else {
            group.members.splice(group.members.indexOf(req.body.userId), 1);
            group.save();
            res.statusCode = 204;
            res.end();
            
            return;
          }
        }
      })
    }
  })

  app.post(path, function (req, res) {
  
    var tags = req.body.tags;
    req.body.tags = [];

    tags.forEach(element => {
      var tag = {
        tag: element,
        relevance: parseInt(100 / tags.length)
      };

      req.body.tags.push(tag);
    });
    if (req.body.members) {
      req.body.members.push(req.body.groupCreator);
    }
    else {
      req.body.members = [req.body.groupCreator];
    }

    console.log(req.body);
    
    var model = new group(req.body);
    model
      .save()
      .then(function(response) {
        res.statusCode = 201;
        res.json(response);
      })
      .catch(function(error) {
        res.error(error);
      });
  });

  app.post(path + "/:id/insert-user", function(req, res) {
    group.findById(req.params[0], function(err, result) {
        if(!result) {
            res.statusCode = 404;
            res.end();

            return;
        }

        result.members.push(req.body.userId);
        result
          .save()
          .then(function(response) {
            res.statusCode = 201;
            res.json(response);
          })
          .catch(function(error) {
            res.error(error);
          });
    })
    .catch(function(error) {
      res.error(error);
    });
  });
};

module.exports = service;
