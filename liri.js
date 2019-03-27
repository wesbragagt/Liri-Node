require("dotenv").config();
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
        console.log(response.data[0]);
        
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










