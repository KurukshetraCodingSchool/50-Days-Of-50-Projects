// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

/* ================= PRELOADER ================= */
window.addEventListener("load", () => {
    const preloader = document.querySelector(".preloader");
    preloader.style.opacity = "0";
    setTimeout(() => {
        preloader.style.display = "none";
    }, 500);
});

/* ================= FAQ ACCORDION ================= */
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    item.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(faq => {
            if (faq !== item) faq.classList.remove('active');
        });
        // Toggle current
        item.classList.toggle('active');
    });
});

/* ================= MOBILE MENU ================= */
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Simple rotation for the icon
    gsap.to(menuToggle, { rotation: navLinks.classList.contains('active') ? 90 : 0, duration: 0.3 });
});

/* ================= 3D TILT EFFECT ================= */
const cards = document.querySelectorAll('[data-tilt]');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            transformPerspective: 1000,
            duration: 0.5,
            ease: "power2.out"
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.5,
            ease: "power2.out"
        });
    });
});

/* ================= GSAP ANIMATIONS ================= */

// Navbar
gsap.from(".navbar", {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: "power4.out"
});

// Hero Content
const tl = gsap.timeline();

tl.from(".hero-content .badge", { y: 20, opacity: 0, duration: 0.6, delay: 0.3 })
    .from(".hero-title", { y: 30, opacity: 0, duration: 0.8 }, "-=0.4")
    .from(".hero-content p", { y: 20, opacity: 0, duration: 0.6 }, "-=0.6")
    .from(".hero-btns .btn", { y: 20, opacity: 0, stagger: 0.2, duration: 0.6 }, "-=0.4")
    .from(".hero-img", { scale: 0.8, opacity: 0, duration: 1, ease: "power2.out" }, "-=0.8");

// Stats Counter
const statsSection = document.querySelector('.stats');
const counters = document.querySelectorAll('.counter');

ScrollTrigger.create({
    trigger: statsSection,
    start: "top 80%",
    onEnter: () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            gsap.to(counter, {
                innerText: target,
                duration: 2,
                snap: { innerText: 1 },
                ease: "power2.out"
            });
        });
    }
});

// Course Cards Scroll Trigger
gsap.from(".course-card", {
    scrollTrigger: {
        trigger: ".courses",
        start: "top 70%"
    },
    y: 50,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: "power2.out"
});

/* ================= FORM SUBMIT ================= */
const form = document.getElementById("contactForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector('button');
    const originalText = btn.innerText;

    btn.innerText = "Sending...";
    btn.style.opacity = "0.7";

    setTimeout(() => {
        btn.innerText = "Sent Successfully! 🚀";
        btn.style.backgroundColor = "#00ffcc";
        btn.style.color = "#000";
        btn.style.opacity = "1";

        setTimeout(() => {
            form.reset();
            btn.innerText = originalText;
            btn.style.backgroundColor = "";
            btn.style.color = "";
        }, 3000);
    }, 1500);
});
