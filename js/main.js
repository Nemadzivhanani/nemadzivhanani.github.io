// Enable fallback behavior
document.documentElement.classList.remove("no-js");

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// System theme + toggle
const root = document.documentElement;
const toggle = document.getElementById("themeToggle");
const saved = localStorage.getItem("theme");

function setTheme(mode){
  if (mode === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
  localStorage.setItem("theme", mode);
  if (toggle) toggle.querySelector(".icon").textContent = mode === "dark" ? "☀" : "☾";
}

if (saved) {
  setTheme(saved);
} else {
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(prefersDark ? "dark" : "light");
}

toggle?.addEventListener("click", () => {
  const isDark = root.classList.contains("dark");
  setTheme(isDark ? "light" : "dark");
});

// Reveal on scroll (lightweight)
const items = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) e.target.classList.add("is-visible");
  });
}, { threshold: 0.12 });

items.forEach(el => io.observe(el));
