    
    var topics = ["Pokemon", "Tomagatchi", "Batman", "Playstation", "Jak & Daxter", "Ratchet & Clank", "Zelda", "Animorphs", "Goosebumps", "Dragon Ball Z"];

    var gifPuller = function() {

        // $("button").on("click", function() {

        var topic = $(this).attr("data-target");

        // original example url - "http://media0.giphy.com/media/feqkVgjJpYtjy/giphy.gif",

        //Modified w/ original_still "http://media0.giphy.com/media/feqkVgjJpYtjy/giphy_s.gif",
        
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=V2140B3NOAnFb0N0CCuJzkaiHaGjwFVH&q=" + topic + "&limit=10&offset=0&lang=en";

        // var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=asAO8ArUemSJHtUVSaVcX88Hzgl2FIgn&limit=10";

            $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
                console.log(response);
        
                var results = response.data;

                for (var i = 0; i < data.length; i++) {

                    var favoritesDiv = $("<div class='faves'>");
                
                    var p = $("<p class ='faveGifs'>");

                    var rating = $(p).html("Rating: " + results[i].rating);
                    
                    favoritesDiv.append(rating);

                    var stillURL = results[i].images.original_still;
                    
                    var fixedStillURL = results[i].images.fixed_width_still;

                    // var stillImage = $("<img>").attr("src", stillURL);
                    
                    var origURL = results[i].images.original;

                    var image = $("<img>");

                    image.addClass("gif");

                    image.attr("data-state", "still");

                    image.attr("src", stillURL);


                    // var animatedImage = $("<img>").attr("src", origURL);
                    // console.log(animatedImage);

                    favoritesDiv.append(image);

                    $("#favoriteGifs").prepend(favoritesDiv);

                };
            });
    };

    var pausePlay = $(".gif").click(function() {

        var state = $(this).attr("data-state");

        if(state === "still") {
            $(this).attr("src", $(this).attr(gifPuller.animatedImage));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr(gifPuller.stillImage));
            $(this).attr("data-state", "still");
        };

    });

    // The Function that creates the buttons for each item
    function renderButtons() {

    // Remove what was in there already in order to avoid doubles
    $("#favoriteButtons").empty();

    // Loop the array using array.length to adjust to expanding array sizes
    for (var i = 0; i < topics.length; i++) {
        // $("#favoriteButtons").append("<button class='favorites-btn' 'data-target'=" + topics[i] + ">" + topics[i] + "</button>");
        var a = $("<button>");
        a.addClass("favorites-btn");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#favoriteButtons").append(a);
        
        }
    }
    $("#addFavorite").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var topic = $("#favorites-input").val().trim();

        // Adding movie from the textbox to our array
        topics.push(topic);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
    });

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".favorites-btn", gifPuller);

// Calling the renderButtons function to display the intial buttons
renderButtons();      