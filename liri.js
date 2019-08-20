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
var searchOption = process.argv[2]; 
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


// MOVIE-THIS:


//Switch Functions (for each search parameter):
function UserInputs (searchOption, searchParameter){
    switch (searchOption) {
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

UserInputs(searchOption, searchParameter);