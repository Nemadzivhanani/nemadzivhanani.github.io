// Remove no-js class
document.documentElement.classList.remove("no-js");

// Year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Theme (auto + toggle)
const root = document.documentElement;
const toggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");

function setTheme(mode) {
  root.setAttribute("data-theme", mode);
  localStorage.setItem("theme", mode);
  if (toggle) toggle.querySelector(".icon").textContent = mode === "dark" ? "☀" : "☾";
}

if (savedTheme) {
  setTheme(savedTheme);
} else {
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(prefersDark ? "dark" : "light");
}

toggle?.addEventListener("click", () => {
  const current = root.getAttribute("data-theme") || "light";
  setTheme(current === "dark" ? "light" : "dark");
});

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const menuClose = document.getElementById("menuClose");
const mobileMenu = document.getElementById("mobileMenu");
const backdrop = document.getElementById("backdrop");

function openMenu() {
  mobileMenu.hidden = false;
  backdrop.hidden = false;
  menuBtn?.setAttribute("aria-expanded", "true");
}
function closeMenu() {
  mobileMenu.hidden = true;
  backdrop.hidden = true;
  menuBtn?.setAttribute("aria-expanded", "false");
}

menuBtn?.addEventListener("click", openMenu);
menuClose?.addEventListener("click", closeMenu);
backdrop?.addEventListener("click", closeMenu);

// close menu when clicking a link
mobileMenu?.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", closeMenu);
});

// Lightweight reveal on scroll
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("is-visible");
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => io.observe(el));
