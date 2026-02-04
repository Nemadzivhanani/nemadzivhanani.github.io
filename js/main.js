// Nemadzivhanani IT Solutions - main.js

document.documentElement.classList.remove("no-js");

// Year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Theme (system + saved preference)
const themeToggle = document.getElementById("themeToggle");

function getSystemTheme() {
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const icon = document.querySelector(".theme-icon");
  if (icon) icon.textContent = theme === "dark" ? "☾" : "☀";
}

const savedTheme = localStorage.getItem("theme");
applyTheme(savedTheme || getSystemTheme());

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") || getSystemTheme();
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem("theme", next);
    applyTheme(next);
  });
}

// If no saved theme, follow system changes live
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
  const saved = localStorage.getItem("theme");
  if (!saved) applyTheme(getSystemTheme());
});

// Mobile menu toggle
const navToggle = document.getElementById("navToggle");
const mobileMenu = document.getElementById("mobileMenu");

function setMenu(open) {
  if (!mobileMenu || !navToggle) return;
  mobileMenu.hidden = !open;
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  navToggle.innerHTML = `<span aria-hidden="true">${open ? "✕" : "☰"}</span>`;
}

if (navToggle && mobileMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = !mobileMenu.hidden;
    setMenu(!isOpen);
  });

  // Close menu when you click a link
  mobileMenu.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.classList && target.classList.contains("m-link")) {
      setMenu(false);
    }
  });

  // Close on resize to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 980) setMenu(false);
  });
}

// Reveal on scroll (fast + clean)
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => io.observe(el));
} else {
  // Fallback
  revealEls.forEach((el) => el.classList.add("is-visible"));
}
