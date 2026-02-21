// Middleware: check if user is logged in
function isLoggedIn(req, res, next) {
  if (req.session && req.session.userId) return next();
  req.session.flash_error = "Please log in to continue.";
  res.redirect("/login");
}

// Middleware: check role(s)
function isRole(...roles) {
  return (req, res, next) => {
    if (!req.session || !req.session.userId) {
      req.session.flash_error = "Please log in to continue.";
      return res.redirect("/login");
    }
    if (!roles.includes(req.session.userRole)) {
      // Send to dashboard with a clear access denied message
      req.session.flash_error = `⛔ Access Denied: The Q&A section is only available to Farmers, Experts, and Admins. Your role (${req.session.userRole}) does not have access.`;
      return res.redirect("/dashboard");
    }
    next();
  };
}

module.exports = { isLoggedIn, isRole };
