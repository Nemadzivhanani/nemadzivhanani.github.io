// Footer year
const y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();

// Mobile menu toggle (lightweight)
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // Close menu when clicking a link
  navLinks.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.tagName === "A") {
      navLinks.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });
}

// Scroll reveal (fast & minimal)
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!prefersReduced) {
  const items = document.querySelectorAll(".reveal");

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target); // reveal once
      }
    });
  }, { threshold: 0.15 });

  items.forEach((el) => io.observe(el));
} else {
  // If reduced motion, just show everything
  document.querySelectorAll(".reveal").forEach(el => el.classList.add("is-visible"));
}
