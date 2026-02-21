const express = require("express");
const router = express.Router();
const Scheme = require("../models/scheme");

// 🟢 List all schemes
router.get("/", async (req, res) => {
  const schemes = await Scheme.find();
  res.render("schemes/index", { schemes });
});

// 🟡 Form to add new scheme
router.get("/new", (req, res) => {
  res.render("schemes/new");
});

// 🟢 Add new scheme
router.post("/", async (req, res) => {
  const { title, description, department, subsidy, eligibility, applyLink } = req.body;
  await Scheme.create({ title, description, department, subsidy, eligibility, applyLink });
  res.redirect("/schemes");
});

// 🟢 Edit scheme form
router.get("/:id/edit", async (req, res) => {
  const scheme = await Scheme.findById(req.params.id);
  res.render("schemes/edit", { scheme });
});

// 🟢 Update scheme
router.put("/:id", async (req, res) => {
  const { title, description, department, subsidy, eligibility, applyLink } = req.body;
  await Scheme.findByIdAndUpdate(req.params.id, { title, description, department, subsidy, eligibility, applyLink });
  res.redirect("/schemes");
});

// 🗑️ Delete scheme
router.delete("/:id", async (req, res) => {
  await Scheme.findByIdAndDelete(req.params.id);
  res.redirect("/schemes");
});

module.exports = router;
