const express = require("express");
const router = express.Router();
const Question = require("../models/question");
const Answer = require("../models/answer");
const { isLoggedIn, isRole } = require("../middleware/auth");

// Only farmer, expert, admin can access Q&A
const qaAccess = isRole("farmer", "expert", "admin");

// Show all questions — farmer, expert, admin only
router.get("/", isLoggedIn, qaAccess, async (req, res) => {
  const questions = await Question.find({}).populate("answers");
  const user = { username: req.session.username, role: req.session.userRole };
  res.render("qa/index", { questions, user });
});

// Form to ask a new question — farmer, expert, admin only
router.get("/new", isLoggedIn, qaAccess, (req, res) => {
  const user = { username: req.session.username, role: req.session.userRole };
  const prefill = req.query.prefill || "";
  res.render("qa/new", { user, prefill });
});

// Post a new question — farmer, expert, admin only
router.post("/", isLoggedIn, qaAccess, async (req, res) => {
  const { title, description, tags } = req.body;
  const askedBy = req.session.username; // auto-fill from session
  await Question.create({
    title,
    description,
    tags: tags ? tags.split(",").map(t => t.trim()) : [],
    askedBy,
  });
  res.redirect("/qa");
});

// View one question — farmer, expert, admin only
router.get("/:id", isLoggedIn, qaAccess, async (req, res) => {
  const question = await Question.findById(req.params.id).populate("answers");
  const user = { username: req.session.username, role: req.session.userRole };
  res.render("qa/show", { question, user });
});

module.exports = router;
