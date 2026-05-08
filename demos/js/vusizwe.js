document.addEventListener('DOMContentLoaded', () => {
    console.log("VUSIZWE Mobile-First Demo Loaded");

    // 1. Mobile Hamburger Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked (crucial for mobile UX)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // 2. Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Offset for the fixed header
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Interactive Form Simulation
    const form = document.getElementById('demo-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); 
            const btn = form.querySelector('.btn-submit');
            const originalText = btn.innerText;
            
            btn.innerText = "SENDING...";
            btn.style.opacity = "0.7";

            setTimeout(() => {
                btn.innerText = "REQUEST RECEIVED!";
                btn.style.backgroundColor = "#1B2B4C"; 
                btn.style.opacity = "1";
                form.reset(); 
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = ""; 
                }, 3000);
            }, 1200);
        });
    }
});