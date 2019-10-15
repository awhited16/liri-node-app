require("dotenv").config();

// code to import key.js file as variable
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
moment().format();

// var Spotify = function () {
//     console.log("This is a function");
// }

var spotify = new Spotify(keys.spotify);

var action = process.argv[2];

switch (action) {
  case "concert-this":
    concert();
    break;
  
  case "spotify-this-song":
    spotifySong();
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
    console.log(bandQueryURL);

    axios.get(bandQueryURL).then(
      function(response) {
        console.log("here");
        for (i = 0; i = response.length; i++) {
          var venue = response[i].venue.name
          var venueLoc = response[i].venue.city
          var eventDate = response[i].datetime.splice(0,10);
          console.log("Venue: " + venue);
          console.log("Venue Locaction: " + venueLoc);
          console.log("Event Date: " + eventDate);
        };
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


  function spotifySong() {
    var song = process.argv[3];

    spotify.search({
      type: 'track', query: song
    }).then(function(response) {
      console.log("made it");
      console.log(response);
      for (j = 0; j = response.length; j++) {
        console.log(response.tracks.href.items[j]);
        // var artist = response.
        // var songTitle = 0
        // var link = 0
        // var album = 0
        // console.log("Artist: " + artist);
        // console.log("Song: " + songTitle);
        // console.log("Preview Link: " + link);
        // console.log("Album: " + album);
      };
    })
    .catch(function(err) {
      console.log(err);
    });
  }

  function movie() {
    var movieTitle = process.argv[3];
    var OMDBQueryURL = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";

    axios.get(OMDBQueryURL).then(
      function(response) {
        for (k = 0; k = response.length; k++) {
          console.log(response[k]);
          var title = response[k].Title 
          var IMDBRating = response[k].Ratings[0].Value
          var RTRating = response[k].Ratings[1].Value
          var country = response[k].Country
          var language = response[k].Language
          var plot = response[k].Plot
          var actors = response[k].Actors
          console.log("Movie Title: " + title);
          console.log("IMDB Rating: " + IMDBRating);
          console.log("Rotten Tomatoes Rating: " + RTRating);
          console.log("Country: " + country);
          console.log("Language: " + language);
          console.log("Plot: " + plot);
          console.log("Actors: " + actors);
        }
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


    