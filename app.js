const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");

// Models & Routes
const Listing = require("./models/croplisting");
const questionRoutes = require("./routes/question");
const answerRoutes = require("./routes/answer");
const vendorRoutes = require("./routes/vendors");
const schemeRoutes = require("./routes/schemes");
const marketRoutes = require("./routes/markets");
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");

// ============================
// Database connection
// ============================
mongoose
  .connect("mongodb://127.0.0.1:27017/cropcare2")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// ============================
// Middleware
// ============================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// EJS engine
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "cropcareSecretKey2024!",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);

// Make user info available to all views
app.use((req, res, next) => {
  res.locals.currentUser = req.session.userId
    ? { username: req.session.username, role: req.session.userRole }
    : null;
  next();
});

// ============================
// Routes
// ============================
app.use("/", authRoutes);         // login, signup, logout
app.use("/dashboard", dashboardRoutes);
app.use("/qa", questionRoutes);
app.use("/answers", answerRoutes);
app.use("/vendors", vendorRoutes);
app.use("/schemes", schemeRoutes);
app.use("/markets", marketRoutes);

// Home/Test pages
app.get("/test", (req, res) => res.render("home"));
app.get("/", (req, res) => {
  if (req.session.userId) return res.redirect("/dashboard");
  res.render("home");
});
app.get("/forgot", (req, res) => res.render("forgot"));
app.get("/change", (req, res) => res.render("change"));
app.get("/disease-detect", (req, res) => res.render("disease-detect"));

// Crop listings
app.get("/croplistings", async (req, res) => {
  let query = {};
  if (req.query.search) {
    query = { $or: [
      { title: { $regex: req.query.search, $options: "i" } },
      { typeofcrop: { $regex: req.query.search, $options: "i" } },
      { suggestion: { $regex: req.query.search, $options: "i" } },
    ]};
  }
  const allListings = await Listing.find(query);
  res.render("listings/index", { allListings, search: req.query.search || "" });
});

app.get("/croplistings/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.redirect("/croplistings");
    res.render("listings/show", { listing });
  } catch (err) {
    res.redirect("/croplistings");
  }
});

app.get("/croplistings/:id/edit", async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return res.redirect("/croplistings");
  res.render("listings/edit", { listing });
});

app.put("/croplistings/:id", async (req, res) => {
  const { title, price } = req.body;
  await Listing.findByIdAndUpdate(req.params.id, { title, price });
  res.redirect(`/croplistings/${req.params.id}`);
});

// ============================
// Start server
// ============================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 CropCare running on http://localhost:${PORT}`);
  console.log(`📋 Routes: /login  /signup  /dashboard  /croplistings  /qa  /vendors  /schemes  /markets`);
});
