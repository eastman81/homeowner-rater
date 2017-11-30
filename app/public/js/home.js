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
$("#add-user").on("click", function(event) {
    // Don't refresh the page!
    event.preventDefault();

    name = $("#name-input").val().trim();
    email = $("#email-input").val().trim();
    password = $("#password-input").val().trim();

    $("#name-display").text(sessionStorage.getItem("name"));

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
      
      // A function to handle what happens when the form is submitted to create a new user
      function handleUserFormSubmit(event) {
        // Don't do anything if the name fields hasn't been filled out
        if (!name) {
          return;
        }
        // Calling the upsertUser function and passing in the value of the name input
        upsertUser({
          name: name,
          email: email
        });
      }

    function upsertUser(userData) {
        $.post("/api/users", userData);
    }
    handleUserFormSubmit();

    $("#name-input").val("");
    $("#email-input").val("");
    $("#password-input").val("");
});

$("#login-user").on("click", function(event) {
    // Don't refresh the page!
    event.preventDefault();

    name = $("#name-login").val().trim();
    email = $("#email-login").val().trim();
    password = $("#password-login").val().trim();

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });

    // Testing if we're signed in
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var queryURL = "api/email/" + email; 

            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function(response){
                // Clear sessionStorage
                sessionStorage.clear();

                // Store all content into sessionStorage
                sessionStorage.setItem("userID", response);
                console.log("Storage userID: " + response);
            });

            console.log("User logged in");
            database.ref(name).set({
                name: name,
                email: email,
                password: password
            });

            function goToBlog() {
                window.location.href = "./blog";
            };

            goToBlog();
        } else {
            // alert("Incorrect Password");
            alert("Not signed in");
        }
    });

    // location.reload();
});

$("#signout-user").on("click", function(event) {
    firebase.auth().signOut().then(function() {
        console.log("Sign-out successful.");
        sessionStorage.clear();

    }).catch(function(error) {
        // An error happened.
    });
});