// MongoDB, by default, runs on port 27017
var mongoose = require("mongoose");
let validator = require('validator')

// Format for data
var nameSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
      return validator.isEmail(value)
    }
  }
});

module.exports = mongoose.model("Email", nameSchema);
