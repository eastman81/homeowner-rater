$(document).ready(function() {

  // Getting jQuery references to the post body, title, form, and author select
  var commentInput = $("#comments");
  var ratingInput = $("#rating");
  var nameInput = $("#owner-name");
  var userSelect = sessionStorage.getItem("userID");
  var ownerSel = $("#owner");
  var ownerSelVal; 
  var ownerIdSelect;
  var ownerSelectName;
  var ownerId2Select;
  var ownerSelect2Name;
  var ownerIdFromValue;

  // Adding an event listener for when the form is submitted
  $("#submitOwner").on("click", handleOwnerFormSubmit);
  $("#submitRating").on("click", handleFormSubmit);

  // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
  var url = window.location.search;
  var postId;
  var ownerId;

  var routeInput;

  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the post id from the url
  // In '?post_id=1', postId is 1
  if (url.indexOf("?post_id=") !== -1) {
    postId = url.split("=")[1];
    getPostData(postId, "post");
  }
  // Otherwise if we have an user_id in our url, preset the user select box to be our User
  else if (url.indexOf("?user_id=") !== -1) {
    userId = url.split("=")[1];
  }

  getOwners();

  // Function to get all created owners displayed
  function getOwners() {
    $.get("/api/owners", renderOwnerList);
  }

  // Function to render a list of owners
  function renderOwnerList(data) {
    $(".hidden").removeClass("hidden");
    var rowsToAdd = [];

    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createOwnerRow(data[i]));
    }
    ownerSel.empty();
    console.log(rowsToAdd);
    console.log(ownerSel);
    ownerSel.append(rowsToAdd);
    ownerSel.val(ownerId);
  }

  // Creates the owner options in the dropdown
  function createOwnerRow(owner) {
    var listOption = $("<option>");
    listOption.attr("value", owner.id);
    listOption.text(owner.name);
    console.log(owner.id);

    return listOption;
  }

  // A function to handle what happens when the form is submitted to create a new Owner
  function handleOwnerFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!nameInput.val().trim().trim()) {
      return;
    }
    else{
      routeInput = nameInput.val().trim().trim();
      routeInput = routeInput.replace(/\s+/g, "").toLowerCase();

      console.log("Route name created: " + routeInput);

      // Calling the upsertOwner function and passing in the value of the name input
      upsertOwner({
        name: nameInput
          .val()
          .trim(),
        routeName: routeInput
      });
    }
  }

  // A function for creating an owner. Calls getOwners upon completion
  function upsertOwner(ownerData) {
    $.post("/api/owners", ownerData)
      // on success, run this callback
      .done(function(data) {
        console.log(data);
        alert("Added new owner...");
      })
      .then(getOwner);
  }

  // Function for retrieving owners and getting them ready to be rendered to the page
  function getOwner() {
    routeInput = nameInput.val().trim().trim();
    routeInput = routeInput.replace(/\s+/g, "").toLowerCase();

    $.get("/api/" + routeInput, function(data) {
        ownerSelVal = data.id
        ownerSelectName = data.name
    });
  }

  // A function for handling what happens when the form to create a new post is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
      // Wont submit the post if we are missing a rating or comment
      if (!ratingInput.val().trim() || !commentInput.val().trim() ) {
        return;
      }

      // Constructing a newPost object to hand to the database
      if (nameInput.val().trim()) {
        var newPost = {
          rating: ratingInput
          .val()
          .trim(),
          comment: commentInput
          .val()
          .trim(),
          userId: userSelect,
          ownerId: ownerSelVal
        };
      } else {
        ownerSelVal = ownerSel.val().trim();

        var newPost = {
          rating: ratingInput
          .val()
          .trim(),
          comment: commentInput
          .val()
          .trim(),
          userId: userSelect,
          ownerId: ownerSelVal
        };
      }

      // If we're updating a post run updatePost to update a post
      // Otherwise run submitPost to create a whole new post
      if (updating) {
        newPost.id = postId;
        updatePost(newPost);
      } else {
        submitPost(newPost);
      }
    }

  // Submits a new post and brings user to blog page upon completion
  function submitPost(post) {
    $.post("/api/posts", post, function() {
      window.location.href = "/blog";
    });
  }

  // Gets post data for the current post if we're editing, or if we're adding to an user's existing posts
  function getPostData(id, type) {
    var queryUrl;
    switch (type) {
      case "post":
      queryUrl = "/api/posts/" + id;
      break;
      case "user":
      queryUrl = "/api/users/" + id;
      break;
      default:
      return;
    }
    $.get(queryUrl, function(data) {
      if (data) {
        console.log(data.userId || data.id);
              // If this post exists, prefill our cms forms with its data
              ratingInput.val(data.title);
              commentInput.val(data.body);
              userId = data.userId || data.id;
              // If we have a post with this id, set a flag for us to know to update the post
              // when we hit submit
              updating = true;
            }
          });
  }

  // Update a given post, bring user to the blog page when done
  function updatePost(post) {
    $.ajax({
      method: "PUT",
      url: "/api/posts",
      data: post
    })
    .done(function() {
      window.location.href = "/blog";
    });
  }

});
