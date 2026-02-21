const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: { type: String, required: true },
    image: {
        type: String,
        default: "https://stock.adobe.com/images/view-of-soybean-farm-agricultural-field-against-sky/502186443",
    },
    price: Number,
    typeofcrop: String,
    soilType: String,
    schedule: String,
    frequency: String,
    season: String,
    timeofday: String,
    suggestion: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

