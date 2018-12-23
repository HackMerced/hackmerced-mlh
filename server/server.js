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
app.use(express.static(reqPath + '/client/build/'));

app.post("/addemail", (req, res, next) => {
  var myData = new Email(req.body);
  myData.save()
  .then(doc => {
     console.log(doc);
   })
   .catch(err => {
     console.error(err);
   })
   res.redirect('back');
});

// Starts the server and tells it to listen on port 3000
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
