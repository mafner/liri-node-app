// libs required:
var request = require('request');
var fs = require('fs');
var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

//moment (date configuration):
var moment = require('moment');
moment().format();

//spotify keys (constructor)
var spotify = new Spotify(keys.spotify);
