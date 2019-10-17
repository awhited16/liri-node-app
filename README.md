# LIRIBot

This app allows the user to search concert, song, and movie data.

To run the app, make one of the following commands based on what you are looking for:
1. To search concert information, enter "node liri concert-this" followed by the artist you want concert information for.
2. To search song information, enter "node liri spotify-this-song" followed by the name of the song you want information for
3. To search movie information, enter "node liri movie-this" followed by the movie title you want information for
4. You can also make a search related to the random.txt file by entering "node liri do-what-it-says"

For the concert search, this app uses axios to pull information from the Bands In Town API. This funtion also uses the moment module to format dat information.

For the song search, this app uses the spotify module to call the Spotify API for song information.

For the movie search, this app uses axios to pull data from the OMDB API. 

For the do-what-it-says functionality, this app uses the readFile function as well as the spotify module to pull data from the Spotify API. 