var express = require('express');
var app = express();
var server = require('http').Server(app);
var jsonfile = require('jsonfile');
var bodyParser = require('body-parser');
var uuidv4 = require('uuid/v4');
var fs = require("fs");


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));

//POST REQUEST STUFF BELOW
app.post('/', function(request, response){

  var incomingB64image = request.body.newDrawing.replace(/^data:image\/png;base64,/, "")
  var numFiles;
  fs.readdir("public/uploads/", (err, files) => {
    numFiles = files.length +1

    fs.writeFile("public/uploads/"+ numFiles +".png", incomingB64image , 'base64', function(err) {
    console.error(err);
    });

  });


})

// get the total file length for use on the front end.
app.get("/files", function(request,response){
  fs.readdir("public/uploads/", (err, files) => {
    // files.length
    // var howManyFiles = files.length
    response.send( files ) //get an array of the files in the public/uploads/ folder
    });
})


var port = process.env.PORT || 3000 //changed listening port
server.listen(port, function(){ //added variable here
  console.log("app listening on port" + port); //and changed this message
})
