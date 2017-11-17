// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/posts", function(req, res) {
    var query = {};
    if (req.query.user_id) {
      query.userId = req.query.user_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.post.findAll({
      where: query,
      include: [db.user]
    }).then(function(dbpost) {
      res.json(dbpost);
    });
  });

  // Get rotue for retrieving a single post
  app.get("/api/posts/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.post.findOne({
      where: {
        id: req.params.id
      },
      include: [db.user]
    }).then(function(dbpost) {
      res.json(dbpost);
    });
  });

  // POST route for saving a new post
  app.post("/api/posts", function(req, res) {
    db.post.create(req.body).then(function(dbpost) {
      res.json(dbpost);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/posts/:id", function(req, res) {
    db.post.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbpost) {
      res.json(dbpost);
    });
  });

  // PUT route for updating posts
  app.put("/api/posts", function(req, res) {
    db.post.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbpost) {
        res.json(dbpost);
      });
  });
};
