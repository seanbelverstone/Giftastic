/*Psuedocode

On button click, display (prepend) 10 gifs of the selected game. DONE
When gifs display, make sure they're still images. DONE
Upon gif click, make the gif animated rather than still. Reverse this when gif is clicked again. DONE
When pressing another button, display (prepend) 10 gifs above the previous ones. DONE
User can write in a text box and a button is created when clicked. DONE
This created button works the same as the others.  DONE
Every gif has its rating and 'This data is provided by the GIPHY API.' below. DONE
Possibly also include: 
- change the amount of gifs to display (max 50) DONE 
- make mobile responsive DONE */ 





var topics = ["Halo", "Rocket League", "Elite Dangerous", "Minecraft", "Doom"];
var limit = "10";
function renderButtons() {
  for (var j = 0; j < topics.length; j++) { // for the topics array
    var gameText = (topics[j]);
    var topicButton = $("<button>");
    topicButton.text(gameText);
    topicButton.addClass("btn btn-dark");
    topicButton.attr("data-game", gameText);
    $(".topic-location").append(topicButton);
    console.log(gameText);    
}
};

  renderButtons();

//button click event
var defaultButton = $(document.getElementsByClassName('btn-dark'));
defaultButton.on("click", function() {
    var game = $(this).attr("data-game").toLowerCase().trim(); //grabs the data from the button
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=(" +
      game + ")&api_key=idmgGsqOAloHdaE7trSyIAQ9iQskkUCT&rating=g&limit=" + limit; //inputs the API url + user input + apikey and limit

      $.ajax({ //ajax function to request a response
        url: queryURL,
        method: "GET"
      }).then(function(response) { //waits for the response

        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) { //for the api json
        
          var gameImage = $("<img>"); //creates a variable that stores an img container in it

          gameImage.addClass("gif"); //adds a class to the img so we can switch it to animate later

          gameImage.attr("src", results[i].images.fixed_height_still.url); //starts off as a still image

          gameImage.attr("data-state", "still"); //declares the beginning as a still image

          gameImage.attr("data-still", results[i].images.fixed_height_still.url) //stores still url in gameImage

          gameImage.attr("data-animate", results[i].images.fixed_height.url) //stores animated url in gameImage 

          var p = $("<p>");
          p.text("Rating: " + results[i].rating); //rating text

          var giphyText = $("<p>");
          giphyText.text("This data is provided by the GIPHY API.");

          var gameDiv = $("<div>"); //div that will hold all the information
          gameDiv.addClass("gifBlock");
          gameDiv.append(gameImage, p, giphyText); //append all the bits to the gameDiv

          $("#gifLocation").prepend(gameDiv);
        
      }

        $(".gif").click(function () { 
            var state = $(this).attr("data-state"); //stores the data-state in the state variable

            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate")); //changes the url to specified animated image
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }

        });
    });
});

// form submission click event
$("#submit").on("click", function() {
  var userInput = ($(".form-control").val()); //declares a variable called userInput and stores the form value inside it
  $(".form-control").val(""); //clears the form
  topics.push(userInput);
  var userButton = $("<button>"); //creates a button
  userButton.text(userInput); 
  userButton.addClass("btn btn-dark");
  userButton.attr("data-game", userInput);
  console.log(topics);
  $(".topic-location").append(userButton);

  //wanted to use the getGit function rather than copy/pasting but it was outside of scope and not sure how to access it
  userButton.on("click", function() {
    var game = $(this).attr("data-game"); //grabs the data from the button
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      game + "&api_key=idmgGsqOAloHdaE7trSyIAQ9iQskkUCT&rating=g&limit=" + limit; //inputs the API url + user input + apikey and limit

      $.ajax({ //ajax function to request a response
        url: queryURL,
        method: "GET"
      }).then(function(response) { //waits for the response

        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          
            var gameImage = $("<img>"); //creates a variable that stores an img container in it

            gameImage.addClass("gif"); //adds a class to the img so we can switch it to animate later

            gameImage.attr("src", results[i].images.fixed_height_still.url); //starts off as a still image

            gameImage.attr("data-state", "still"); //declares the beginning as a still image

            gameImage.attr("data-still", results[i].images.fixed_height_still.url) //stores still url in gameImage

            gameImage.attr("data-animate", results[i].images.fixed_height.url) //stores animated url in gameImage 

            var p = $("<p>");
            p.text("Rating: " + results[i].rating); //rating text

            var giphyText = $("<p>");
            giphyText.text("This data is provided by the GIPHY API.");

            var gameDiv = $("<div>"); //div that will hold all the information
            gameDiv.addClass("gifBlock");
            gameDiv.append(gameImage, p, giphyText); //append all the bits to the gameDiv

            $("#gifLocation").prepend(gameDiv);
        }

        $(".gif").click(function () { 
            var state = $(this).attr("data-state"); //stores the data-state in the state variable

            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate")); //changes the url to specified animated image
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }

        });
    });
  });
});

// dropdown items functions
$("#10").on("click", function() {
  limit = "10";
  alert("Gif limit set to 10!");
  });

$("#20").on("click", function() {
  limit = "20";
  alert("Gif limit set to 20!");
});

$("#30").on("click", function() {
  limit = "30";
  alert("Gif limit set to 30!");
});

$("#40").on("click", function() {
  limit = "40";
  alert("Gif limit set to 40!");
});

$("#50").on("click", function() {
  limit = "50";
  alert("Gif limit set to 50!");
});

