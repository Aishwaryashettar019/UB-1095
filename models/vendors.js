const mongoose = require("mongoose");
const Schema=mongoose.Schema;

const vendorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  fertilizer: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Vendor", vendorSchema);
