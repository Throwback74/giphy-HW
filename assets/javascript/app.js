// $(document).ready(function() {    
    var topics = ["Pokemon", "Tomagatchi", "Batman", "Playstation", "Jak & Daxter", "Ratchet & Clank", "Zelda", "Animorphs", "Goosebumps", "Dragon Ball Z"];

    // The Function that creates the buttons for each item
    var renderButtons = function() {

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
        };
    };
    $("#addFavorite").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var topic = $("#favorites-input").val().trim();

        // Adding topic from the textbox to our array
        topics.push(topic);

        // Calling renderButtons which handles the processing of our array
        renderButtons();
    });

    var gifPuller = function() {

        // $("button").on("click", function() {

        var topic = $(this).attr("data-name");

        // original example url - "http://media0.giphy.com/media/feqkVgjJpYtjy/giphy.gif",

        //Modified w/ original_still "http://media0.giphy.com/media/feqkVgjJpYtjy/giphy_s.gif",
        
        // var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "api_key=V2140B3NOAnFb0N0CCuJzkaiHaGjwFVH&q=&limit=10&offset=0&lang=en";

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=asAO8ArUemSJHtUVSaVcX88Hzgl2FIgn&limit=10";

        //var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key=dc6zaTOxFJmzC&limit=10";

            $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
                console.log(response);
                //console.log(response.data[0].images.original_still.url);
                $("#favoriteGifs").html("<img src=" + response.data[0].images.original_still.url + "/>");
                //console.log(response.data[i].images.original_still.url);
                //console.log(response.data[i].images.original.url);
                console.log(response.data[0].images.original.url+ "_s");
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    // console.log(response.data[i].images.original.url);
                    console.log("image array: " + response.data[i].images.original.url);

                    var favoritesDiv = $("<div>");

                    var rating = results[i].rating;
                
                    var p = $("<p>").text("Rating: " + rating);

                    // var rating = $(p).html("Rating: " + results[i].rating);
                    
                    var topicImage = $("<img>");

                    var origURL = results[i].images.original.url;
                    console.log("original: " + origURL);

                    var altStillURL = origURL + "_s";
                    console.log("altstill: " + altStillURL);

                    var stillURL = results[i].images.original_still.url;
                    console.log("still: " + stillURL);

                    topicImage.attr({
                        src: stillURL,
                        dataState: "still"
                    });

                    topicImage.addClass("gif");

                    // $(".gif").attr("dataState", "still");

                    favoritesDiv.append(p);

                    favoritesDiv.append(topicImage);

                    $("#favoriteGifs").prepend(topicImage);

                };
            });
    };
                    // var fixedStillURL = results[i].images.fixed_width_still;

                    // var stillImage = $("<img>").attr("src", stillURL);
                    
                    // var origURL = results[i].images.original.url;

                    // var image = $("<img>").attr("src", stillURL);

                    // image.addClass("gif");

                    // image.attr("dataState", "still");

                    // favoritesDiv.append(p);

                    // image.attr("src", stillURL);

                    // var animatedImage = $("<img>").attr("src", origURL);
                    // console.log(animatedImage); 
                    // $("#favoriteGifs").append(favoritesDiv);
                    
                    // favoritesDiv.append(image);

//var pausePlay = 
    $(".gif").click(function() {

        var state = $(this).attr("dataState");

        if(state === "still") {
            $(this).attr("src", $(this).attr(gifPuller.origURL));
            $(this).attr("dataState", "animate");
        } else {
            $(this).attr("src", $(this).attr(gifPuller.stillURL));
            $(this).attr("dataState", "still");
        };

    });

// Adding a click event listener to all elements with a class of favorites-btn
$(document).on("click", ".favorites-btn", gifPuller);

// Calling the renderButtons function to display the intial buttons
renderButtons();      
// });