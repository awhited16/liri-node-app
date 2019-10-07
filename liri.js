require("dotenv").config();

// code to import key.js file as variable
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var axios = require("axios");
var action = process.argv[2];

switch (action) {
    case "concert-this":
      concert();
      break;
    
    case "spotify-this-song":
      spotify();
      break;
    
    case "movie-this":
      movie();
      break;
    
    case "do-what-it-says":
      doThis();
      break;
    }

    function concert() {
        var artist = process.argv[3];
        var bandQueryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

        axios.get(bandQueryURL).then(
            function(response) {
                var venue = response.venue.name
                var venueLoc = response.venue.city
                var eventDate = response.datetime.splice(0,10);
                console.log("Venue: " + venue);
                console.log("Venue Locaction: " + venueLoc);
                console.log("Event Date: " + eventDate);
            })
        .catch(function(error) {
            if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
            } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
            } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
            }
            console.log(error.config);
        });
        
        // fs.readFile("bank.txt", "utf8", function(err, data) {
        //     if (err) {
        //       return console.log(err);
        //     }
    };


    function spotify() {
        var song = process.argv[3];
        var spotifyQueryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

        axios.get(spotifyQueryURL).then(
            function(response) {
                var artist = 0 
                var songTitle = 0
                var link = 0
                var album = 0
                console.log("Artist: " + artist);
                console.log("Song: " + songTitle);
                console.log("Preview Link: " + link);
                console.log("Album: " + album);
            })
        .catch(function(error) {
            if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
            } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
            } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
            }
            console.log(error.config);
        });
    }

    function movie() {
        var movie = process.argv[3];
        var OMDBQueryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

        axios.get(OMDByQueryURL).then(
            function(response) {
                var title = response.Title 
                var IMDBRating = response.Ratings[0].Value
                var RTRating = response.Ratings[1].Value
                var country = response.Country
                var language = response.Language
                var plot = response.Plot
                var actors = response.Actors
                console.log("Movie Title: " + title);
                console.log("IMDB Rating: " + IMDBRating);
                console.log("Rotten Tomatoes Rating: " + RTRating);
                console.log("Country: " + country);
                console.log("Language: " + language);
                console.log("Plot: " + plot);
                console.log("Actors: " + actors);
             })
        .catch(function(error) {
            if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
            } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
            } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
            }
            console.log(error.config);
        });
        
    };

    function doThis() {
        fs.readFile("random.txt", "utf8", function(err, data) {
            if (err) {
              return console.log(err);
            }
            console.log("reading file")
            spotify()
        });
    };


    