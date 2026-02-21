// const express = require("express");
// const router = express.Router();
// const Vendor = require("../models/vendors");

// // Show all vendors with search & filter
// router.get("/", async (req, res) => {
//   const { fertilizer, minCost, maxCost } = req.query;
//   let filter = {};

//   if (fertilizer) {
//     filter.fertilizer = { $regex: fertilizer, $options: "i" };
//   }

//   if (minCost || maxCost) {
//     filter.cost = {};
//     if (minCost) filter.cost.$gte = Number(minCost);
//     if (maxCost) filter.cost.$lte = Number(maxCost);
//   }

//   const vendors = await Vendor.find(filter);
//   res.render("vendors/index", { vendors, query: req.query });
// });

// // Form to add a new vendor
// router.get("/new", (req, res) => {
//   res.render("vendors/new");
// });

// // Add a new vendor
// router.post("/", async (req, res) => {
//   const { name, fertilizer, cost, contact, location } = req.body;
//   await Vendor.create({ name, fertilizer, cost, contact, location });
//   res.redirect("/vendors");
// });

// // 🗑️ Delete a vendor
// router.delete("/:id", async (req, res) => {
//   const { id } = req.params;
//   await Vendor.findByIdAndDelete(id);
//   res.redirect("/vendors");
// });

// module.exports = router;



const express = require("express");
const router = express.Router();
const Vendor = require("../models/vendors");

// Show all vendors with search & filter
router.get("/", async (req, res) => {
  const { fertilizer, minCost, maxCost } = req.query;
  let filter = {};

  if (fertilizer) {
    filter.fertilizer = { $regex: fertilizer, $options: "i" };
  }

  if (minCost || maxCost) {
    filter.cost = {};
    if (minCost) filter.cost.$gte = Number(minCost);
    if (maxCost) filter.cost.$lte = Number(maxCost);
  }

  const vendors = await Vendor.find(filter);
  res.render("vendors/index", { vendors, query: req.query });
});

// Form to add a new vendor
router.get("/new", (req, res) => {
  res.render("vendors/new", { error: null });
});

// Add a new vendor (VALIDATION ADDED)
router.post("/", async (req, res) => {
  const { name, fertilizer, cost, contact, location } = req.body;

  // 🔴 Cost validation
  if (cost < 0) {
    return res.render("vendors/new", {
      error: "❌ Enter correct price (Price cannot be negative)"
    });
  }

  // 🔴 Phone number validation (exactly 10 digits)
  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(contact)) {
    return res.render("vendors/new", {
      error: "❌ Invalid phone number (Must be exactly 10 digits)"
    });
  }

  await Vendor.create({
    name,
    fertilizer,
    cost,
    contact,
    location
  });

  res.redirect("/vendors");
});

// 🗑️ Delete a vendor
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Vendor.findByIdAndDelete(id);
  res.redirect("/vendors");
});

module.exports = router;
