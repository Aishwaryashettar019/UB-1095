const express = require("express");
const router = express.Router();
const User = require("../models/user");

// GET /login
router.get("/login", (req, res) => {
  const error = req.session.flash_error || null;
  const success = req.session.flash_success || null;
  delete req.session.flash_error;
  delete req.session.flash_success;
  res.render("login", { error, success, user: req.session.userId ? { username: req.session.username, role: req.session.userRole } : null });
});

// POST /login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username.trim() });
    if (!user) {
      req.session.flash_error = "Invalid username or password.";
      return res.redirect("/login");
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      req.session.flash_error = "Invalid username or password.";
      return res.redirect("/login");
    }
    // Set session
    req.session.userId = user._id;
    req.session.username = user.username;
    req.session.userRole = user.role;
    req.session.flash_success = `Welcome back, ${user.username}!`;
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    req.session.flash_error = "Server error. Please try again.";
    res.redirect("/login");
  }
});

// GET /signup
router.get("/signup", (req, res) => {
  const error = req.session.flash_error || null;
  delete req.session.flash_error;
  res.render("signup", { error, user: null });
});

// POST /signup
router.post("/signup", async (req, res) => {
  const { username, password, role, email, phone } = req.body;
  try {
    // Validation
    if (username.trim().length < 4) {
      req.session.flash_error = "Username must be at least 4 characters.";
      return res.redirect("/signup");
    }
    if (password.length < 8) {
      req.session.flash_error = "Password must be at least 8 characters.";
      return res.redirect("/signup");
    }
    const validRoles = ["farmer", "admin", "vendor", "expert"];
    if (!validRoles.includes(role)) {
      req.session.flash_error = "Invalid role selected.";
      return res.redirect("/signup");
    }
    // Check if user exists
    const existing = await User.findOne({ username: username.trim() });
    if (existing) {
      req.session.flash_error = "Username already taken. Try another.";
      return res.redirect("/signup");
    }
    const user = await User.create({ username: username.trim(), password, role, email, phone });
    req.session.userId = user._id;
    req.session.username = user.username;
    req.session.userRole = user.role;
    req.session.flash_success = `Account created! Welcome, ${user.username}!`;
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    req.session.flash_error = "Error creating account. Please try again.";
    res.redirect("/signup");
  }
});

// GET /logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

module.exports = router;
