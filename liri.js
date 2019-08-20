// Sets environment variables
require("dotenv").config();

// Libs required:
var request = require('request');
var fs = require('fs');
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

//Moment.js (date configuration):
var moment = require('moment');
moment().format();

//Spotify keys (constructor)
var spotify = new Spotify(keys.spotify);

//Node user commands to capture for searches: 
var searchType = process.argv[2]; 
var searchParameter = process.argv[3];

// CONCERT-THIS
function showConcertInfo(searchParameter){
    var queryUrl = "https://rest.bandsintown.com/artists/" + searchParameter + "/events?app_id=codingbootcamp";
    request(queryUrl, function(error, response, body) {
    // If the request is successful
    if (!error && response.statusCode === 200) {
        var concerts = JSON.parse(body);
        for (var i = 0; i < concerts.length; i++) {  
            console.log("*--------EVENT INFO--------*");  
            fs.appendFileSync("log.txt", "*--------EVENT INFO--------*\n");//Append in log.txt file
            console.log(i);
            fs.appendFileSync("log.txt", i+"\n");
            console.log("Name of the Venue: " + concerts[i].venue.name);
            fs.appendFileSync("log.txt", "Name of the Venue: " + concerts[i].venue.name+"\n");
            console.log("Venue Location: " +  concerts[i].venue.city);
            fs.appendFileSync("log.txt", "Venue Location: " +  concerts[i].venue.city+"\n");
            console.log("Date of the Event: " +  concerts[i].datetime);
            fs.appendFileSync("log.txt", "Date of the Event: " +  concerts[i].datetime+"\n");
            console.log("*--------------------------*");
            fs.appendFileSync("log.txt", "*------------------------*"+"\n");
        }
    } else{
      console.log("Error occurred: ");
    }
});}

// SPOTIFY-THIS-SONG:
function showSongInfo(searchParameter) {
    if (searchParameter === undefined || null) {
        searchParameter = '"The Sign" -Ace of Base'; //default Song
    }
    spotify.search(
        {
            type: "track",
            query: searchParameter
        },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }
            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
                console.log("*---------SONG INFO---------*");
                fs.appendFileSync("log.txt", "*---------SONG INFO---------*\n");
                console.log(i);
                fs.appendFileSync("log.txt", i +"\n");
                console.log("Song name: " + songs[i].name);
                fs.appendFileSync("log.txt", "song name: " + songs[i].name +"\n");
                console.log("Preview song: " + songs[i].preview_url);
                fs.appendFileSync("log.txt", "preview song: " + songs[i].preview_url +"\n");
                console.log("Album: " + songs[i].album.name);
                fs.appendFileSync("log.txt", "album: " + songs[i].album.name + "\n");
                console.log("Artist(s): " + songs[i].artists[0].name);
                fs.appendFileSync("log.txt", "artist(s): " + songs[i].artists[0].name + "\n");
                console.log("*------------------------*");  
                fs.appendFileSync("log.txt", "*------------------------*\n");
             }
        }
    );
};

// MOVIE-THIS:


//Switch Functions (for each search parameter):
function UserInputs (searchType, searchParameter){
    switch (searchType) {
    case 'concert-this':
        showConcertInfo(searchParameter);
        break;
    case 'spotify-this-song':
        showSongInfo(searchParameter);
        break;
    case 'movie-this':
        showMovieInfo(searchParameter);
        break;
    case 'do-what-it-says':
        showSomeInfo();
        break;
    default: 
        console.log("Invalid Option. Please type any of the following options: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says")
    }
};

UserInputs(searchType, searchParameter);