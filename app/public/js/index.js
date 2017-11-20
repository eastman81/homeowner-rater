// Name for app, My Favorite Homeowner

// Initialize Firebase
var config = {
apiKey: "AIzaSyAhu_Jaq3JhCE3BJ7wg43DrH7b6FtpZND0",
authDomain: "home-owner-rater.firebaseapp.com",
databaseURL: "https://home-owner-rater.firebaseio.com",
projectId: "home-owner-rater",
storageBucket: "home-owner-rater.appspot.com",
messagingSenderId: "275239062934"
};
firebase.initializeApp(config);

// Make it work
// Create a variable to reference the database
var database = firebase.database();

// Initial Values
var name = "";
var email = "";
var password = "";

// Capture Button Click
$("#add-user").on("click", function() {
  // Don't refresh the page!
  event.preventDefault();

  // YOUR TASK!!!
  // Code in the logic for storing and retrieving the most recent user.
  // Don't forget to provide initial data to your Firebase database.
  name = $("#name-input").val().trim();
  email = $("#email-input").val().trim();
  password = $("#password-input").val().trim();

  // create the log in one next to this one, or make it load the log in one
  // will need to pull his master, and then split it into my branch
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });

  database.ref().set({
    name: name,
    email: email,
    password: password
  });

});

// Firebase watcher + initial loader HINT: .on("value")
database.ref().on("value", function(snapshot) {

  // Log everything that's coming out of snapshot
  // console.log(snapshot.val());
  console.log(snapshot.val().name);
  console.log(snapshot.val().email);

  // Change the HTML to reflect
  $("#name-display").text(snapshot.val().name);
  $("#email-display").text(snapshot.val().email);

  // Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

// module.exports = email;

// we will need to make a way to find a specific user, not at root level
