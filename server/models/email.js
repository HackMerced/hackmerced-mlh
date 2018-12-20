// MongoDB, by default, runs on port 27017
var mongoose = require("mongoose");

// Format for data
var nameSchema = new mongoose.Schema({
  email: String,
});

module.exports = mongoose.model("Email", nameSchema);
