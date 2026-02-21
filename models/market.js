const mongoose = require("mongoose");

const marketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  district: { type: String, required: true },
  address: String,
  contact: String,
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true }
});

module.exports = mongoose.model("Market", marketSchema);

