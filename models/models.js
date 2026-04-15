const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  affiliation: String,
  university: String,
  country: String,
  tracks: String,

  photo: String,
  abstract: String,
  biography: String
}, { timestamps: true });

module.exports = mongoose.model("Form", formSchema);