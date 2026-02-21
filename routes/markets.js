const express = require("express");
const router = express.Router();
const Market = require("../models/market");

// View all markets (optional district filter)
router.get("/", async (req, res) => {
  try {
    const { district } = req.query;
    const filter = district ? { district: { $regex: district, $options: "i" } } : {};
    const docs = await Market.find(filter).lean();

    const markets = (docs || []).map(m => ({
      _id: String(m._id || ""),
      name: m.name || "",
      district: m.district || "",
      address: m.address || "",
      contact: m.contact || "",
      latitude: (m.latitude !== undefined && m.latitude !== null) ? Number(m.latitude) : null,
      longitude: (m.longitude !== undefined && m.longitude !== null) ? Number(m.longitude) : null
    }));

    res.render("markets/index", { markets, district });
  } catch (err) {
    console.error("Error loading markets:", err);
    res.status(500).send("Server error");
  }
});

// New market form
router.get("/new", (req, res) => {
  res.render("markets/new");
});

// Create market
router.post("/", async (req, res) => {
  try {
    const { name, district, address, contact, latitude, longitude } = req.body;
    await Market.create({
      name,
      district,
      address,
      contact,
      latitude: latitude ? Number(latitude) : undefined,
      longitude: longitude ? Number(longitude) : undefined
    });
    res.redirect("/markets");
  } catch (err) {
    console.error("Create market error:", err);
    res.status(500).send("Server error while creating market");
  }
});

// Delete market
router.delete("/:id", async (req, res) => {
  try {
    await Market.findByIdAndDelete(req.params.id);
    res.redirect("/markets");
  } catch (err) {
    console.error("Delete market error:", err);
    res.status(500).send("Server error while deleting market");
  }
});

module.exports = router;


