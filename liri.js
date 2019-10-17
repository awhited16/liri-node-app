require("dotenv").config();

// code to import key.js file as variable
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
moment().format();

var spotify = new Spotify(keys.spotify);

var action = process.argv[2];

// switch for different commands to call related functions
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

  // concert-this function
  function concert() {

    // define artist variable and URL for API
    var artist = process.argv.slice(3).join("");
    var bandQueryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    console.log(bandQueryURL);

    axios.get(bandQueryURL).then(
      function(response) {
        console.log(response.data[0].venue.name);

        // for loop to run through results
        for (i = 0; i < 5; i++) {
          // define variables for data results
          var venueName = response.data[i].venue.name;
          var venueLoc = response.data[i].venue.city;
          var eventTime = response.data[i].datetime.slice(0,10);
          var eventDate = moment(eventTime).format("MM/DD/YYYY");

          // display results
          console.log("Venue: " + venueName);
          console.log("Venue Locaction: " + venueLoc);
          console.log(eventTime);
          console.log("Event Date: " + eventDate);
          console.log("---------------------------");
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
  };

  // spotify-this-song function 
  function spotifySong() {
    var song = process.argv.slice(3).join(" ");

    // if no song given, search for The Sign by Ace of Base
    if (!song) {
      song = "The Sign by Ace of Base";
    }

    spotify.search({
      type: 'track', query: song
    }).then(function(response) {

      // for loop to run through results, with a limit of 5 results
      for (j = 0; j < 5; j++) {

        // define variables for results
        var artist = response.tracks.items[j].artists[0].name;
        var songTitle = response.tracks.items[j].name;
        var link = response.tracks.items[j].external_urls.spotify;
        var album = response.tracks.items[j].album.name;
        // display results
        console.log("Artist: " + artist);
        console.log("Song: " + songTitle);
        console.log("Preview Link: " + link);
        console.log("Album: " + album);
        console.log("------------------")
      };
    })
    .catch(function(err) {
      console.log(err);
    });
  }

  // movie-this function
  function movie() {
    var movieTitle = process.argv.slice(3).join(" ");

    // if no movie given, show results for  Mr. Nobody
    if (!movieTitle) {
      movieTitle = "Mr.Nobody";
    }

    var OMDBQueryURL = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";

    axios.get(OMDBQueryURL).then(
      function(response) {
        console.log(OMDBQueryURL);

        // variables for results
        var title = response.data.Title 
        var IMDBRating = response.data.Ratings[0].Value
        var RTRating = response.data.Ratings[1].Value
        var country = response.data.Country
        var language = response.data.Language
        var plot = response.data.Plot
        var actors = response.data.Actors

        // display results
        console.log("Movie Title: " + title);
        console.log("IMDB Rating: " + IMDBRating);
        console.log("Rotten Tomatoes Rating: " + RTRating);
        console.log("Country: " + country);
        console.log("Language: " + language);
        console.log("Plot: " + plot);
        console.log("Actors: " + actors);
        console.log("---------------------");
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
    })
  };

  // do-what-it-says function
  function doThis() {
    fs.readFile("random.txt", "utf8", function(err, data) {
      if (err) {
        return console.log(err);
      }
      console.log(data);
      var dataArr = data.split(",");
      var search = dataArr[1];

      spotify.search({
        type: 'track', query: search
      }).then(function(response) {
        console.log("made it");
        for (j = 0; j < 5; j++) {
          var artist = response.tracks.items[j].artists[0].name;
          var songTitle = response.tracks.items[j].name;
          var link = response.tracks.items[j].external_urls.spotify;
          var album = response.tracks.items[j].album.name;
          // display results
          console.log("Artist: " + artist);
          console.log("Song: " + songTitle);
          console.log("Preview Link: " + link);
          console.log("Album: " + album);
          console.log("------------------")
        };
      })
      .catch(function(err) {
        console.log(err);
      });
    });
  }