require("dotenv").config();
var moment = require("moment");
var axios = require("axios");

// using bands in town API
var artist = process.argv[3];
var bandURL =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp";

// using the omdb movies
var movie = process.argv[3];
var omdbURL =
    "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

// NODE SPOTIFY API
// spotify api access credentials
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);
var songName = process.argv[3];
var logInfo;

// File System
var fs = require("fs");

if (process.argv[2] !== null && process.argv[3] !== null) {
    switch (process.argv[2]) {
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
                songName = argCall[1];
                findSpotify();
            });
            break;
    }
}

//MY FUNCTIONS
function concert() {
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
        .search({ type: "track", query: songName })
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
