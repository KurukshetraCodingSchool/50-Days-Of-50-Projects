// GSAP Animations for Shoes Factory

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. HERO SECTION ANIMATIONS
    const timeline = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1 } });

    timeline
        .from('.brand', { y: -50, opacity: 0 })
        .from('.nav-links a', { y: -50, opacity: 0, stagger: 0.1 }, "-=0.5")
        .from('.auth-buttons', { y: -50, opacity: 0 }, "-=0.5")
        .from('.hero-text .hero-tag', { x: -50, opacity: 0, duration: 0.8 })
        .from('.hero-text h1', { x: -50, opacity: 0, duration: 0.8 }, "-=0.6")
        .from('.hero-text p', { x: -50, opacity: 0, duration: 0.8 }, "-=0.6")
        .from('.hero-text .cta-group', { y: 30, opacity: 0, duration: 0.8 }, "-=0.6")
        .from('.hero-image img', { scale: 0.8, opacity: 0, rotation: -20, duration: 1.2 }, "-=1");

    // 2. SCROLL TRIGGER ANIMATIONS for SECTIONS
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1
        });
    });

    // 3. PRODUCT CARDS ANIMATION (Need to wait for JS rendering)
    // We observe the productGrid for mutations (when products are loaded)
    const productGrid = document.getElementById('productGrid');

    if (productGrid) {
        const observer = new MutationObserver((mutations) => {
            // Check if nodes were added (skeletons replaced by products)
            if (productGrid.children.length > 0 && !productGrid.querySelector('.skeleton')) {
                gsap.from('.product-card', {
                    scrollTrigger: {
                        trigger: productGrid,
                        start: 'top 85%',
                    },
                    y: 50,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: 'power2.out'
                });
                observer.disconnect(); // Animate only once on load
            }
        });

        observer.observe(productGrid, { childList: true });
    }

    // 4. ABOUT & CONTACT ANIMATIONS
    gsap.from('.about-content', {
        scrollTrigger: { trigger: '.about', start: 'top 75%' },
        x: -50, opacity: 0, duration: 1
    });

    gsap.from('.about-img', {
        scrollTrigger: { trigger: '.about', start: 'top 75%' },
        x: 50, opacity: 0, duration: 1
    });

    gsap.from('.contact-container', {
        scrollTrigger: { trigger: '#contact', start: 'top 75%' },
        y: 50, opacity: 0, duration: 1
    });

});
