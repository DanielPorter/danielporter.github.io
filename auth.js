// auth.js

// Simulated user credentials (for demonstration purposes only).
const userCredentials = {
  username: "user",
  password: "password"
};

// Log in the user by checking the credentials.
function login(username, password) {
  if (username === userCredentials.username && password === userCredentials.password) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", username);
    return true;
  }
  return false;
}

// Check if the user is currently logged in.
function isLoggedIn() {
  return localStorage.getItem("isLoggedIn") === "true";
}

// Log out the user by clearing stored data.
function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("username");
}

// This function should be called on pages that require authentication.
// If the user is not logged in, they will be redirected to the login page.
function requireLogin() {
  if (!isLoggedIn()) {
    window.location.href = "login.html";
  }
}

// Update the navigation bar to show either a login or logout link.
function updateNavAuth() {
  const navMenu = document.querySelector(".nav-menu");
  // Remove any existing auth links to avoid duplicates
  const existing = document.querySelector(".nav-item.auth-link");
  if (existing) existing.remove();

  const li = document.createElement("li");
  li.className = "nav-item auth-link";
  
  if (isLoggedIn()) {
    // Show logout link with the username.
    const username = localStorage.getItem("username");
    li.innerHTML = `<a href="#" class="nav-link" id="logoutLink">Logout (${username})</a>`;
    li.addEventListener("click", (e) => {
      e.preventDefault();
      logout();
      // Redirect to login page after logging out.
      window.location.href = "login.html";
    });
  } else {
    // Show login link.
    li.innerHTML = `<a href="login.html" class="nav-link">Login</a>`;
  }
  navMenu.appendChild(li);
}

// Automatically update the nav bar after the DOM is loaded.
document.addEventListener("DOMContentLoaded", updateNavAuth);
