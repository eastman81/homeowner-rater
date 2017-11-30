var db = require("../models");

module.exports = function(app) {
  app.get("/api/owners", function(req, res) {
    db.owner.findAll({
      include: [db.post]
    }).then(function(dbowner) {
      res.json(dbowner);
    });
  });

  // Search for Specific owner, then provides JSON
  app.get("/api/:owners?", function(req, res) {
    
    if (req.params.owners){
      db.owner.findOne({
        where: {
          routeName: req.params.owners
        }
      }).then(function(result) {
        res.json(result);
      });
    }

    // Otherwise...
    else {
      // Otherwise display the data for all of the characters.
      // (Note how we're using Sequelize here to run our searches)
      db.owner.findAll({})
        .then(function(result) {
          return res.json(result);
        });
    }

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

    console.log("Route created :" + req.body.routeName);


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
