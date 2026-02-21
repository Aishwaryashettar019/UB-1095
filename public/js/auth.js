// ================= SIGNUP =================
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    if (username.length < 4) {
      document.getElementById("signupMsg").textContent = "Username must be at least 4 chars!";
      document.getElementById("signupMsg").className = "text-danger text-center mt-2";
      return;
    }
    if (password.length < 8) {
      document.getElementById("signupMsg").textContent = "Password must be at least 8 chars!";
      document.getElementById("signupMsg").className = "text-danger text-center mt-2";
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find(u => u.username === username)) {
      document.getElementById("signupMsg").textContent = "Username already exists!";
      document.getElementById("signupMsg").className = "text-danger text-center mt-2";
      return;
    }

    users.push({ username, password, role });
    localStorage.setItem("users", JSON.stringify(users));

    document.getElementById("signupMsg").textContent = "✅ Successfully signed up! Redirecting to login...";
    document.getElementById("signupMsg").className = "text-success text-center mt-2";

    setTimeout(() => window.location.href = "/login", 1500);
  });
}

// ================= LOGIN =================
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username.length < 4) {
      document.getElementById("loginMsg").textContent = "Username must be at least 4 chars!";
      document.getElementById("loginMsg").className = "text-danger text-center mt-2";
      return;
    }
    if (password.length < 8) {
      document.getElementById("loginMsg").textContent = "Password must be at least 8 chars!";
      document.getElementById("loginMsg").className = "text-danger text-center mt-2";
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      document.getElementById("loginMsg").textContent = "✅ Login successful! Redirecting...";
      document.getElementById("loginMsg").className = "text-success text-center mt-2";
      setTimeout(() => window.location.href = "/test", 1000);
    } else {
      document.getElementById("loginMsg").textContent = "Invalid username or password!";
      document.getElementById("loginMsg").className = "text-danger text-center mt-2";
    }
  });
}

// ================= FORGOT PASSWORD =================
const forgotForm = document.getElementById("forgotForm");
if (forgotForm) {
  forgotForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();

    if (newPassword.length < 8) {
      document.getElementById("forgotMsg").textContent = "Password must be at least 8 chars!";
      document.getElementById("forgotMsg").className = "text-danger text-center mt-2";
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.username === username);

    if (user) {
      user.password = newPassword;
      localStorage.setItem("users", JSON.stringify(users));
      document.getElementById("forgotMsg").textContent = "✅ Password reset successfully!";
      document.getElementById("forgotMsg").className = "text-success text-center mt-2";
    } else {
      document.getElementById("forgotMsg").textContent = "Username not found!";
      document.getElementById("forgotMsg").className = "text-danger text-center mt-2";
    }
  });
}

// ================= CHANGE PASSWORD =================
const changeForm = document.getElementById("changeForm");
if (changeForm) {
  changeForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const oldPassword = document.getElementById("oldPassword").value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();

    if (newPassword.length < 8) {
      document.getElementById("changeMsg").textContent = "New password must be at least 8 chars!";
      document.getElementById("changeMsg").className = "text-danger text-center mt-2";
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.username === username && u.password === oldPassword);

    if (user) {
      user.password = newPassword;
      localStorage.setItem("users", JSON.stringify(users));
      document.getElementById("changeMsg").textContent = "✅ Password changed successfully!";
      document.getElementById("changeMsg").className = "text-success text-center mt-2";
    } else {
      document.getElementById("changeMsg").textContent = "Invalid username or old password!";
      document.getElementById("changeMsg").className = "text-danger text-center mt-2";
    }
  });
}

