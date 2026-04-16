const mongoose = require("mongoose");

const fileSchema = {
  url: { type: String, default: null },
  public_id: { type: String, default: null },
};

const formSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  affiliation: String,
  university: String,
  country: String,
  tracks: String,

  photo: { type: fileSchema, default: () => ({}) },
  abstract: { type: fileSchema, default: () => ({}) },
  biography: { type: fileSchema, default: () => ({}) },
}, { timestamps: true });

module.exports = mongoose.model("Form", formSchema);