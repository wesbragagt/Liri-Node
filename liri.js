require("dotenv").config();
var axios = require("axios");

// spotify api access credentials
var spotify = require("node-spotify-api");
var keys = require("./keys.js");
var spotify = new spotify(keys.spotify);



// using bands in town API

var artist = process.argv[3];

var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

if(process.argv[2] === "concert-this"){
    
    axios.get(queryURL).then(function(response){
        console.log(response.data[0]);
        
    });
}










