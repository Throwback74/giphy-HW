// $(document).ready(function() {    
    var topics = ["Pokemon", "Tamagotchi", "Batman", "Playstation", "Star Wars", "Ratchet & Clank", "Legend of Zelda", "Animorphs", "Goosebumps", "Dragon Ball Z"];
    var origURL = "";

    var stillURL = "";
    // The Function that creates the buttons for each item
    var renderButtons = function() {

    // Remove what was in there already in order to avoid doubles
        $("#favoriteButtons").empty();
        $("#favorites-input").empty();
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
                // $("#favoriteGifs").html("<img src=" + response.data[0].images.original_still.url + ">");
                //console.log(response.data[i].images.original_still.url);
                //console.log(response.data[i].images.original.url);
                console.log(response.data[0].images.original.url+ "_s");
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    // console.log(response.data[i].images.original.url);
                    console.log("image array: " + response.data[i].images.original.url);

                    var favoritesDiv = $("<div>");

                    var rating = results[i].rating;
                    
                    console.log(rating);
                    var p = $("<p>").text("Rating: " + rating);
                    console.log(p);

                    // var rating = $(p).html("Rating: " + results[i].rating);
                    
                    var topicImage = $("<img>");

                    origURL = results[i].images.original.url;
                    console.log("original: " + origURL);

                    var altStillURL = origURL + "_s";
                    console.log("altstill: " + altStillURL);

                    stillURL = results[i].images.original_still.url;
                    console.log("still: " + stillURL);

                    topicImage.attr({
                        src: stillURL,
                        dataState: "still",
                        dataAnimate: origURL,
                        dataStill: stillURL
                    });

                    topicImage.addClass("gif");

                    // $(".gif").attr("dataState", "still");

                    favoritesDiv.append(topicImage);

                    favoritesDiv.append(p);

                    $("#favoriteGifs").prepend(favoritesDiv);

                };
            });
    };
                    // var fixedStillURL = results[i].images.fixed_width_still;

    $("#underline").click(function() {
        console.log("test: " + origURL);
        console.log("test2: " + stillURL);
    });
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
    $(document).on("click", ".gif", function() {
    // $(":image").on("click", function() {
        console.log("does this thing even work?")
        console.log(this);
        var state = $(this).attr("dataState");
        var animated = $(this).attr("dataAnimate");
        var stopped = $(this).attr("dataStill");
        console.log("state: " + state);
        console.log("animated: " + animated);
        console.log("stillImage: " + stopped);

        if(state === "still") {
            // $(this).attr("src", $(this).attr(origURL));
            // $(this).attr("dataState", "animate");
            $(this).attr({
                src : animated,
                dataState : "animate"
            });
        } else {
            $(this).attr({
                src : stopped,
                dataState : "still"
            });
            // $(this).attr("src", $(this).attr(stillURL));
            // $(this).attr("dataState", "still");
        };

    });

// Add an onclick event listener to all elems w/ a class of favorites-btn
$(document).on("click", ".favorites-btn", gifPuller);

// Calling the renderButtons function to display the intial buttons
renderButtons();      
// });