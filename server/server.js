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

const application = path.join(__dirname, "/../client/build");
app.use(express.static(application));

console.log(application);

app.post("/addemail", (req, res) => {
  var myData = new Email(req.body);
  myData.save()
  .then(doc => {
     console.log(doc);
   })
   .catch(err => {
     console.error(err);
   })
   res.send('done');
 });

// Starts the server and tells it to listen on port 3000
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
