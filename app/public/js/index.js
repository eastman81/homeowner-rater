$("#search-btn").on("click", function() {

  // save the character they typed into the character-search input
  var searchedOwner = $("#homeowner-search").val().trim();

  // replace any spaces between that character with no space
  //(effectively deleting the spaces). Make the string lowercase
  searchedOwner = searchedOwner.replace(/\s+/g, "").toLowerCase();

  // run an AJAX GET-request for our servers api,
  // including the user's character in the url
   $.get("/api/" + searchedOwner, function(data) {
    // log the data to our console
    console.log(data);
    //empty to well-section before adding new content
    $("#well-section").empty();
    // if the data is not there, then return an error message
    if (!data) {
      $("#well-section").append("<h2> Ther are no homeowners by that name, please search again. </h2>");
    }
    // otherwise
    else {
      // append the owner name
      $("#well-section").append("<h2>" + data.name + "</h2>");
      
      // get the ratings
      $.get("/api/postsfromowner/" + data.id, function(data) {
        console.log(data);
        });    
    }

  });

});