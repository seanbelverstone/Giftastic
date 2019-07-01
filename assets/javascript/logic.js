/*Psuedocode

On button click, display (prepend) 10 gifs of the selected game.
When gifs display, make sure they're still images.
Upon gif click, make the gif animated rather than still. Reverse this when gif is clicked again.
When pressing another button, display (prepend) 10 gifs above the previous ones.
User can write in a text box and a button is created when clicked.
This created button works the same as the others. 
Every gif has its rating and 'This data is provided by the GIPHY API.' below.
Possibly also include: 
- favorites section
- persistance of favorites section
- change the amount of gifs to display (max 50) */


//button click event
$("button").on("click", function() {
    var game = $(this).attr("data-game"); //grabs the data from the button
    var limit = "10";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      game + "&api_key=idmgGsqOAloHdaE7trSyIAQ9iQskkUCT&limit=" + limit + "&rating=g"; //inputs the API url + user input + apikey and limit

      $.ajax({ //ajax function to request a response
        url: queryURL,
        method: "GET"
      }).then(function(response) { //waits for the response

        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var gameImage = $("<img>"); //creates a variable that stores an img container in it
            gameImage.attr("src", results[i].images.fixed_height_still.url); //stores the gif as a still image
            gameImage.attr("data-state", "still")
            gameImage.addClass("gif"); //adds a class to the img so we can switch it to animate later
            var gameDiv = $("<div>");
            var p = $("<p>");
            p.text("Rating: " + results[i].rating); //rating text
            var giphyText = $("<p>");
            giphyText.text("This data is provided by the GIPHY API.");
            var favButton = $("<button>");
            favButton.text("Favorite");
            gameDiv.append(gameImage, p, giphyText, favButton);
            $("#gifLocation").prepend(gameDiv);
        }

        $(".gif").click(function () {
          for (var j = 0; j < results.length; j++) { //runs a loop through the results
          var state = $(this).attr("data-state"); //stores the data-state in the state variable
          if (state === "still") {
            $(this).attr("src", results[j].images.fixed_height.url); //changes the url to specified animated image
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", results[j].images.fixed_height_still.url);
            $(this).attr("data-state", "still");
          }
        }
        });

    });
});