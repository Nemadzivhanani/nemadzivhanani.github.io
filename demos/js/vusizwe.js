document.addEventListener('DOMContentLoaded', () => {
    console.log("VUSIZWE Corporate Demo Loaded");

    // 1. Smooth Scrolling for Mobile and Desktop Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. Interactive Form Simulation for Pitch
    const form = document.getElementById('demo-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); 
            const btn = form.querySelector('.btn-submit');
            const originalText = btn.innerText;
            const originalBg = btn.style.backgroundColor;
            
            // Visual feedback: Sending state
            btn.innerText = "SENDING...";
            btn.style.opacity = "0.7";

            // Visual feedback: Success state
            setTimeout(() => {
                btn.innerText = "REQUEST RECEIVED!";
                btn.style.backgroundColor = "#1B2B4C"; // Brand Navy
                btn.style.color = "#ffffff";
                btn.style.opacity = "1";
                form.reset(); 
                
                // Revert back to original state
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = originalBg; 
                }, 3500);
            }, 1500);
        });
    }
});