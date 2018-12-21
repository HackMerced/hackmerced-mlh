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

app.post("/addemail", (req, res, next) => {
  // var myData = new Email(req.body);
  // myData.save()
  // // Save to database successful it will return to the .then segment of the promise
  // .then(item => {
    // res.redirect('/');
  // })
  // // If fails, it will return to the .catch segment of the promise
  // .catch(err => {
  //   // 400 statusCode indicates operation fail
  //   res.status(400).send("unable to save to database");
  // });

  const { body } = req;
      let {
        email
      } = body;

      email = email.toLowerCase();
      email = email.trim();
      // Steps:
      // 1. Verify email doesn't exist
      // 2. Save
      Email.find({
        email: email
      }, (err, previousEmails) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error.'
          });
        } else if (previousEmails.length > 0) {
          return res.send({
            success: false,
            message: 'Error: Email already exists.'
          });
        }
        // Save the new email
        const newEmail = new Email();
        newEmail.email = email;
        newEmail.save((err, email) => {
          if (err) {
           return res.send({
             success: false,
             message: 'Error: Server error.'
           });
         }
         return res.send({
           success: true,
           message: 'Signed up!'
         });
        });
    });
});

// Starts the server and tells it to listen on port 3000
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
