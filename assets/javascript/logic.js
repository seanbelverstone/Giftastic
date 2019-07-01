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
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      game + "&api_key=idmgGsqOAloHdaE7trSyIAQ9iQskkUCT&limit=10"; //inputs the API url + user input + apikey and limit

      $.ajax({ //ajax function to request a response
        url: queryURL,
        method: "GET"
      }).then(function(response) { //waits for the response

        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var gameImage = $("<img>");
            gameImage.attr("src", results[i].images.fixed_height.url);
            var gameDiv = $("<div>");
            var p = $("<p>");
            p.text("Rating: " + results[i].rating);
            var giphyText = $("<p>");
            giphyText.text("This data is provided by the GIPHY API.");
            gameDiv.append(gameImage, p, giphyText);
            $("#gifLocation").prepend(gameDiv);
        }
    });
});