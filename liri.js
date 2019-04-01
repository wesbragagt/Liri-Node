// instructions
// console.log("commands available " + "\n" + "Get movie info: " + "movie-this" + "movie in between quotes");

require("dotenv").config();
var moment = require("moment");
var axios = require("axios");

var search = process.argv[2];
var term = process.argv.splice(3).join(" ");

// NODE SPOTIFY API
// spotify api access credentials
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

// log.txt file
var logInfo;

// File System
var fs = require("fs");

if (search !== null && search !== null) {
    switch (search) {
        case "concert-this":
            concert();
            break;
        case "movie-this":
            movieInfo();
            break;
        case "spotify-this-song":
            findSpotify();
            break;
        case "do-what-it-says":
            fs.readFile("random.txt", "utf8", function(error, data) {
                if (error) {
                    return console.log(error);
                }

                var argCall = data.split(",");
                term = argCall[1];
                findSpotify();
            });
            break;
        case "clear-log":
            clearSearch();
            break;
    }
}

//MY FUNCTIONS
function concert() {
    var artist = term;
    var bandURL =
        "https://rest.bandsintown.com/artists/" +
        artist +
        "/events?app_id=codingbootcamp";
    axios.get(bandURL).then(function(response) {
        var venueName = response.data[0].venue.name;
        var venueLocation =
            response.data[0].venue.city + ", " + response.data[0].venue.country;
        var dateEvent = moment(response.data[0].datetime).format("MM/DD/YYYY");

        logInfo =
            "\n" +
            "logged at " +
            moment().format("hh:mm:ss a") +
            "\n" +
            artist +
            "\n" +
            "At " +
            venueName +
            "\n" +
            "Location: " +
            venueLocation +
            "\n" +
            "Date: " +
            dateEvent +
            "\n";
        console.log("Information logged " + logInfo);
        appendLog();
    });
}

function movieInfo() {
    // using the omdb movies
    var movie = term;
    var omdbURL =
        "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    axios.get(omdbURL).then(function(response) {
        logInfo =
            "\n" +
            "logged at " +
            moment().format("hh:mm:ss a") +
            "\n" +
            response.data.Title +
            "\n" +
            "Released in: " +
            response.data.Year +
            "\n" +
            "IMDB Rating:" +
            " " +
            response.data.imdbRating +
            "\n" +
            "Rotten Tomatoes: " +
            response.data.Ratings[1].Value +
            "\n" +
            "Country: " +
            response.data.Country +
            "\n" +
            "Language: " +
            response.data.Language +
            "\n" +
            "Plot: " +
            response.data.Plot +
            "\n" +
            "Actors: " +
            response.data.Actors +
            "\n";

        console.log(logInfo);
        appendLog();
    });
}

function findSpotify() {
    spotify
        .search({ type: "track", query: term })
        .then(function(response) {
            // limit loop to the first 5 searches
            for (var i = 0; i < 5; i++) {
                var bandName = response.tracks.items[i].artists[0].name;
                var trackName = response.tracks.items[i].name;
                var albumName = response.tracks.items[i].album.name;
                var previewLINK;

                if (response.tracks.items[i].preview_url !== null) {
                    previewLINK =
                        "Preview Link: " + response.tracks.items[i].preview_url;
                } else {
                    previewLINK =
                        "Album Link: " +
                        response.tracks.items[1].external_urls.spotify;
                }
                logInfo =
                    "\n" +
                    "logged at " +
                    moment().format("hh:mm:ss a") +
                    "\n" +
                    "Artist/Band: " +
                    bandName +
                    "\n" +
                    "Track: " +
                    trackName +
                    "\n" +
                    "Album: " +
                    albumName +
                    "\n" +
                    "Link: " +
                    previewLINK +
                    "\n";
                console.log(logInfo);
                appendLog();
                console.log("-----------------------------------------------");
            }
        })
        .catch(function(err) {
            console.log(err);
        });
}

// need to save the info logged in the console and append it to a txt file
function appendLog() {
    fs.appendFile("log.txt", logInfo, function(err) {
        if (err) throw err;
        console.log("appended to log.txt file");
    });
}

// user can clear information logged in the log.txt file.
function clearSearch() {
    fs.writeFile("log.txt", "", function(err) {
        if (err) throw err;
        console.log("results cleared");
    });
}
