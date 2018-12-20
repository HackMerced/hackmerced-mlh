var express = require("express");
var app = express();
var port = 3000;
var Email = require("./models/email");

// Body-parser middleware to convert data to JSON
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./config/db");

// Listens to requests from browser
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/addemail", (req, res) => {
  var myData = new Email(req.body);
  myData.save()
  // Save to database successful it will return to the .then segment of the promise
  .then(item => {
    res.send("item saved to database");
  })
  // If fails, it will return to the .catch segment of the promise
  .catch(err => {
    // best practice to change statusCode returned from 200 to 400
    // 400 statusCode indicates operation fail
    res.status(400).send("unable to save to database");
  });
});

// Starts the server and tells it to listen on port 3000
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
