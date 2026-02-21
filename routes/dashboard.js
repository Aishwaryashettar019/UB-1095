const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/auth");
const Listing = require("../models/croplisting");
const Vendor = require("../models/vendors");
const Question = require("../models/question");
const Scheme = require("../models/scheme");
const Market = require("../models/market");
const User = require("../models/user");

// GET /dashboard — redirect to role dashboard
router.get("/", isLoggedIn, async (req, res) => {
  const role = req.session.userRole;
  try {
    const stats = {
      listings: await Listing.countDocuments(),
      vendors: await Vendor.countDocuments(),
      questions: await Question.countDocuments(),
      schemes: await Scheme.countDocuments(),
      markets: await Market.countDocuments(),
      users: await User.countDocuments(),
    };
    const user = { username: req.session.username, role: req.session.userRole };
    const flash_success = req.session.flash_success || null;
    const flash_error = req.session.flash_error || null;
    delete req.session.flash_success;
    delete req.session.flash_error;

    switch (role) {
      case "admin":
        const allUsers = await User.find({}, "username role createdAt").lean();
        return res.render("dashboards/admin", { user, stats, allUsers, flash_success, flash_error });
      case "farmer":
        const recentListings = await Listing.find().sort({ _id: -1 }).limit(5).lean();
        const recentSchemes = await Scheme.find().sort({ _id: -1 }).limit(3).lean();
        return res.render("dashboards/farmer", { user, stats, recentListings, recentSchemes, flash_success, flash_error });
      case "vendor":
        const vendorListings = await Vendor.find().sort({ addedAt: -1 }).limit(5).lean();
        return res.render("dashboards/vendor", { user, stats, vendorListings, flash_success, flash_error });
      case "expert":
        const pendingQuestions = await Question.find().populate("answers").sort({ _id: -1 }).limit(10).lean();
        return res.render("dashboards/expert", { user, stats, pendingQuestions, flash_success, flash_error });
      default:
        res.redirect("/login");
    }
  } catch (err) {
    console.error(err);
    res.send("Dashboard error: " + err.message);
  }
});

// Admin: delete user
router.post("/admin/delete-user/:id", isLoggedIn, async (req, res) => {
  if (req.session.userRole !== "admin") return res.redirect("/dashboard");
  await User.findByIdAndDelete(req.params.id);
  req.session.flash_success = "User deleted.";
  res.redirect("/dashboard");
});

module.exports = router;
