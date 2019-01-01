var express = require("express");
var app = express();
var port = 3001;
var Email = require("./models/email");
const path = require("path");
// Body-parser middleware to convert data to JSON
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./config/db");

const application = path.join(__dirname, "/../client/public");
app.use(express.static(application));

console.log(application);

app.post('/api/account/signup', (req, res, next) => {
  var myData = new Email(req.body);
  myData.save()
  .then(doc => {
     console.log(doc);
     return res.send({
       success: true,
       message: 'You\'ve been added to our mailing list!'
     });
   })
   .catch(err => {
     console.error(err);
     // if email exists
     if(err.name.toString() == "MongoError") {
       return res.send({
         success: false,
         message: "This email is already signed up!"
       });
     // if entered email is not valid
     } else if(err.name.toString() == "ValidatorError") {
       return res.send({
         success: false,
         message: "This email is not a valid email."
       });
     // if something stop working??
     } else {
       return res.send({
         success: false,
         message: "Server Error, try again later."
       });
     }
   });
});

// Starts the server and tells it to listen on port 3001
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
