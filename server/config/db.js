const mongoose = require("mongoose");

const {dbUsername, dbPassword} = require('../secrets');

const url = 'mongodb+srv://' + dbUsername + ':' + dbPassword + '@hackmerced-1za3e.mongodb.net/mail?retryWrites=true';

const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10
};

mongoose.connect(url, options).then(
  () => {
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);

// require any models

require("../models/email");
