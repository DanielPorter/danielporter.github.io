// Theme toggle logic
function setupThemeToggle(toggleButtonId) {
  const btn = document.getElementById(toggleButtonId);
  if (!btn) return;
  btn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    // Optionally store preference in localStorage
    if (document.body.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
      btn.textContent = '☀️';
    } else {
      localStorage.setItem('theme', 'light');
      btn.textContent = '🌙';
    }
  });
}

// On load, set theme from localStorage or default
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.body.classList.add('dark');
  }
  setupThemeToggle('theme-toggle');
  setupThemeToggle('theme-toggle-blog');
});
