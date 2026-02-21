const express = require("express");
const router = express.Router();
const Answer = require("../models/answer");
const Question = require("../models/question");
const { isLoggedIn, isRole } = require("../middleware/auth");

// Only farmer, expert, admin can post answers
router.post("/:questionId", isLoggedIn, isRole("farmer", "expert", "admin"), async (req, res) => {
  const { questionId } = req.params;
  const { content } = req.body;
  const answeredBy = req.session.username; // auto-fill from session

  const answer = await Answer.create({
    questionId,
    answeredBy,
    content,
  });

  await Question.findByIdAndUpdate(questionId, { $push: { answers: answer._id } });
  res.redirect(`/qa/${questionId}`);
});

module.exports = router;
