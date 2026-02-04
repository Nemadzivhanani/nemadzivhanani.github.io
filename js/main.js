(() => {
  "use strict";

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme toggle (saved + system default)
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle ? themeToggle.querySelector(".icon") : null;
  const key = "nits-theme";

  const systemTheme = () =>
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  const applyTheme = (mode) => {
    document.documentElement.setAttribute("data-theme", mode);
    if (themeIcon) themeIcon.textContent = mode === "dark" ? "☀" : "☾";
  };

  const saved = localStorage.getItem(key);
  applyTheme(saved || systemTheme());

  themeToggle?.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem(key, next);
    applyTheme(next);
  });

  // Mobile menu
  const navToggle = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  const closeMenu = () => {
    document.body.classList.remove("menu-open");
    navToggle?.setAttribute("aria-expanded", "false");
    if (mobileMenu) mobileMenu.hidden = true;
  };

  const openMenu = () => {
    document.body.classList.add("menu-open");
    navToggle?.setAttribute("aria-expanded", "true");
    if (mobileMenu) mobileMenu.hidden = false;
  };

  // Init hidden state
  if (mobileMenu) mobileMenu.hidden = true;

  navToggle?.addEventListener("click", () => {
    const isOpen = document.body.classList.contains("menu-open");
    if (isOpen) closeMenu();
    else openMenu();
  });

  // Close when clicking any mobile menu link
  document.querySelectorAll("#mobileMenu a").forEach((a) => {
    a.addEventListener("click", closeMenu);
  });

  // ESC close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Reveal on scroll
  const els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    els.forEach((el) => io.observe(el));
  } else {
    els.forEach((el) => el.classList.add("is-visible"));
  }
})();
