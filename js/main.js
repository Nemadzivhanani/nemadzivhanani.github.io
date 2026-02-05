(() => {
  const root = document.documentElement;

  // ===== Theme =====
  const THEME_KEY = "nits_theme";

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  // Apply theme on load
  setTheme(getPreferredTheme());

  // Desktop toggle (if exists)
  const themeToggle = document.getElementById("themeToggle");
  // Mobile toggle in menu
  const themeToggleMobile = document.getElementById("themeToggleMobile");

  function toggleTheme() {
    const current = root.getAttribute("data-theme") || "light";
    setTheme(current === "dark" ? "light" : "dark");
  }

  if (themeToggle) themeToggle.addEventListener("click", toggleTheme);
  if (themeToggleMobile) themeToggleMobile.addEventListener("click", toggleTheme);

  // ===== Mobile menu =====
  const menuBtn = document.getElementById("menuBtn");
  const menuCloseBtn = document.getElementById("menuCloseBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  function openMenu() {
    if (!mobileMenu) return;
    mobileMenu.hidden = false;
    menuBtn?.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.hidden = true;
    menuBtn?.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  menuBtn?.addEventListener("click", () => {
    const isOpen = mobileMenu && mobileMenu.hidden === false;
    isOpen ? closeMenu() : openMenu();
  });

  menuCloseBtn?.addEventListener("click", closeMenu);

  // Close menu when clicking a menu link
  document.querySelectorAll(".mobile-link").forEach((a) => {
    a.addEventListener("click", closeMenu);
  });

  // Close menu on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
