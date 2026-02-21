const express=require("express");
const Listing=require("../models/croplisting.js");
const initData=require("./data.js");
const mongoose=require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/cropcare2")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

  const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("✅ Database seeded with crop listings + images");
  };

  initDB();