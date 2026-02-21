const mongoose = require("mongoose");

const schemeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  department: String,
  subsidy: String,
  eligibility: String,
  applyLink: String, // Official government link
});

module.exports = mongoose.model("Scheme", schemeSchema);





