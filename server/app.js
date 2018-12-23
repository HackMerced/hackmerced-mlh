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
app.use('/css', express.static(reqPath + '/client/build/css'));
app.use('/images', express.static(reqPath + '/client/build/images'));
app.use('/js', express.static(reqPath + '/client/build/js'));

app.get('/', function(req, res) {
    res.sendFile(reqPath + '/client/build/index.html');
});

app.post("/addemail", (req, res, next) => {
  var myData = new Email(req.body);
  myData.save()
  .then(doc => {
     console.log(doc);
   })
   .catch(err => {
     console.error(err);
   })
});

// Starts the server and tells it to listen on port 3000
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
