var db = require("../models");

module.exports = function(app) {
  app.get("/api/owners", function(req, res) {
    db.owner.findAll({
      include: [db.post]
    }).then(function(dbowner) {
      res.json(dbowner);
    });
  });

  app.get("/api/owners/:id", function(req, res) {
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
