
$(document).ready(function(){
    // Array includes all of the intial buttons to be displayed
    var topics = ["Hey Arnold", "Fresh Prince", "Aaahh!!! Real Monsters", "Daria", "All That", "Courage the Cowardly Dog", "Pokémon", "Sailor Moon", "CatDog", "PowerPuff Girls"];

    // Media Files
    // Daria
    var daria = $("<audio>");
    daria.attr("src", "./assets/media/Daria.mp3");
    $("#daria-play").on("click", function(){
        daria.get(0).play();
    });
    
    // Hey Arnold
    var arnold = $("<audio>");
    arnold.attr("src", "./assets/media/HeyArnold.mp3");
    $("#arnold-play").on("click", function(){
        arnold.get(0).play();
    });

    // Fresh Prince
    var prince = $("<audio>");
    prince.attr("src", "./assets/media/FreshPrince.mp3");
    $("#prince-play").on("click", function(){
        prince.get(0).play();
    });

    // Sailor Moon
    var sailor = $("<audio>");
    sailor.attr("src", "./assets/media/SailorMoon.mp3");
    $("#sailor-play").on("click", function(){
        sailor.get(0).play();
    });

    // PowerPuff Girls
    var power = $("<audio>");
    power.attr("src", "./assets/media/PowerpuffGirls.mp3");
    $("#power-play").on("click", function(){
        power.get(0).play();
    });

    // All That
    var allThat = $("<audio>");
    allThat.attr("src", "./assets/media/AllThat.mp3");
    $("#all-play").on("click", function(){
        allThat.get(0).play();
    });

    // Pauses any of the buttons
    $("#pause").on("click", function(){
        daria.get(0).pause();
        arnold.get(0).pause();
        prince.get(0).pause();
        sailor.get(0).pause();
        power.get(0).pause();
        allThat.get(0).pause();
    });

    // FUNCTIONS
    // Function displays buttons dynamically - loops through the topics array
    function renderButtons() {
        // start by emptying the button-area div every time so that there are no duplicates
        $("#button-area").empty();
        for (var i=0; i < topics.length; i++) {
            // create button element for each array item
            var button = $("<button>");
            // Add classes
            button.addClass("btn btn-info tv-show");
            // Add data attribute
            button.attr("data-name", topics[i]);
            // Add text
            button.text(topics[i]);
            // Append to #button-area
            $("#button-area").append(button);
        } 
    }

    // CLICK EVENTS
    // When user clicks on one of the pre-populated buttons
    $(document).on("click", ".tv-show", function(event){
        // saves data of clicked button
        var show = $(this).data("name");
        var queryURL = `https://api.giphy.com/v1/gifs/search?q=${show}&limit=10&rating=pg-13&api_key=naqRbjAruZNru757XG6cSQyLUVmUQ3EC`;

        // AJAX call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            // loops through array of available gifs (should be 10 in total)
            for (var i=0; i < response.data.length; i++) {
                
                // makes div to hold gif and other info
                var newGif = $("<div>");
                // makes new image element for each gif
                var newMedia = $("<img>");
                // retrieves image url from object and saving to variable
                var imageStillSrc = `https://media0.giphy.com/media/${imageId}/200_s.gif`;
                var imageAnimateSrc = `https://media0.giphy.com/media/${imageId}/200.gif`;
                // var imageSource = response.data[i].images.fixed_height.url;
                var imageId = response.data[i].id;
                newMedia.attr("data-still", imageStillSrc);
                newMedia.attr("data-animate", imageAnimateSrc);
                newMedia.attr("data-state", "still");
                // assigns image source to <img> element
                newMedia.attr("src", imageStillSrc);
                newMedia.addClass("gif");
                var rating = $("<p>");
                rating.text(`Rating: ${response.data[i].rating.toUpperCase()}`);
                // creates button to add to favorites
                var addToFav = $("<button>");
                // text for add to favorites button
                addToFav.text("Add to Favorites");
                // adding classes for this button
                addToFav.addClass("btn btn-info add-fav");
                // appending image and button to new gif div
                newGif.append(newMedia, rating, addToFav);
                // adding class to newGif for later targeting
                newGif.addClass("new-gif");
                // prepends to the #gif-area div
                $("#gif-area").prepend(newGif);
            }
        });
    });

    $(document).on("click", ".gif", function(){
        var state = $(this).attr("data-state");
        var animated = $(this).attr("data-animate");
        var still = $(this).attr("data-still");
        if (state === "still") {
            $(this).attr("src", animated);
            $(this).attr("data-state", "animate");
        } else if (state === "animate") {
            $(this).attr("src", still);
            $(this).attr("data-state", "still");
        }
    });
        
    // When user inputs new topic into the #tv-input div and clicks #add-show
    $("#add-show").on("click", function(event){
        // prevent default method to avoid submit form default
        event.preventDefault();
        // Get value of the user's input and save to var
        var input = $("#tv-input").val().trim();
        // push new value into the topics array
        topics.push(input);
        // rerun function to populate buttons
        renderButtons();
    });

    $("#gif-area").on("click", ".add-fav", function(event){
        // save the image to a variable
        // save variable in cookies so that the page refresh won't wipe it clean
        // prepend favorited gif to div with id of #favorites-area on favorites page
        // ^ include a "remove from favorites button for each div on this page"
        // sessionStorage.setItem("favorite", $("img"));
        // console.log(sessionStorage);
        // var favoritesArea = $("#favorites-area");
    });

    renderButtons();
})
