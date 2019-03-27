require("dotenv").config();
var moment = require("moment");
var axios = require("axios");

// spotify api access credentials
var spotify = require("node-spotify-api");
var keys = require("./keys.js");
var spotify = new spotify(keys.spotify);



// using bands in town API

var artist = process.argv[3];
var bandURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

if(process.argv[2] === "concert-this"){
    
    axios.get(bandURL).then(function(response){
        var venueName = response.data[0].venue.name;
        var venueLocation = response.data[0].venue.city + ", " + response.data[0].venue.country;
        var dateEvent = moment(response.data[0].datetime).format("MM/DD/YYYY");
        console.log(artist);
        console.log( "At" + " " + venueName);
        console.log(venueLocation);
        console.log(dateEvent);
        
        
        
    });
};

// using the omdb movies
var movie = process.argv[3];
var omdbURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

if(process.argv[2] === "movie-this"){

    axios.get(omdbURL).then(function(response){
        console.log(response.data);
        
    });
};

// need to figure out how to get data from the spotify api 










