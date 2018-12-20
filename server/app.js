var express = require("express");
var app = express();
var port = 3000;
var Email = require("./models/email");
const path = require("path");
// Body-parser middleware to convert data to JSON
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./config/db");

const reqPath = path.join(__dirname, "..");
app.use(express.static(reqPath + '/client/build'));

// app.get('/', function(req, res, next) {
//   res.sendFile(reqPath + '/client/build/index.html');
// });

app.post("/addemail", (req, res, next) => {
  var myData = new Email(req.body);
  myData.save()
  // Save to database successful it will return to the .then segment of the promise
  .then(item => {
    res.redirect('/');
  })
  // If fails, it will return to the .catch segment of the promise
  .catch(err => {
    // 400 statusCode indicates operation fail
    res.status(400).send("unable to save to database");
  });
});

// Starts the server and tells it to listen on port 3000
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
