const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, minlength: 4 },
  password: { type: String, required: true, minlength: 8 },
  role: {
    type: String,
    enum: ["farmer", "admin", "vendor", "expert"],
    default: "farmer",
  },
  email: { type: String },
  phone: { type: String },
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
