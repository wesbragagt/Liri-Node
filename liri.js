require("dotenv").config();
var moment = require("moment");
var axios = require("axios");






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
        console.log(response.data.Title);
        console.log("Released in: " + response.data.Year);
        console.log("IMDB Rating:"+ " " + response.data.imdbRating);
        console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);    
    });
};

// NODE SPOTIFY API
// spotify api access credentials
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
 
var spotify = new Spotify(keys.spotify);

console.log(spotify);






