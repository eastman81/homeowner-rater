var db = require("../models");

module.exports = function(app) {
  app.get("/api/owners", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.owner.findAll({
      include: [db.post]
    }).then(function(dbowner) {
      res.json(dbowner);
    });
  });

  app.get("/api/owners/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.owner.findOne({
      where: {
        id: req.params.id
      },
      include: [db.post]
    }).then(function(dbowner) {
      res.json(dbowner);
    });
  });

  app.post("/api/owners", function(req, res) {
    db.owner.create(req.body).then(function(dbowner) {
      res.json(dbowner);
    });
  });

  app.delete("/api/owners/:id", function(req, res) {
    db.owner.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbowner) {
      res.json(dbowner);
    });
  });

};
