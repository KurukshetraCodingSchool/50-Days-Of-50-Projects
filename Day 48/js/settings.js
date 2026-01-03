/**
 * Kurugram Settings & Theme Logic
 * Handles dark/light mode persistence
 */

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');

    // 1. Initialize Theme from LocalStorage
    const currentTheme = localStorage.getItem('theme') || 'dark';

    if (currentTheme === 'light') {
        document.body.classList.add('light');
        if (themeToggle) themeToggle.checked = true;
    }

    // 2. Toggle Theme
    themeToggle?.addEventListener('change', function () {
        if (this.checked) {
            document.body.classList.add('light');
            localStorage.setItem('theme', 'light');

            // GSAP Transition
            if (typeof gsap !== 'undefined') {
                gsap.from('body', { backgroundColor: '#0f0f11', duration: 0.5 });
            }
        } else {
            document.body.classList.remove('light');
            localStorage.setItem('theme', 'dark');

            // GSAP Transition
            if (typeof gsap !== 'undefined') {
                gsap.from('body', { backgroundColor: '#f8fafc', duration: 0.5 });
            }
        }

        // Broadcast to other tabs/pages (since this is a simple app, persistence on load handles it)
    });

    // 3. Page Reveal Animation
    if (typeof gsap !== 'undefined') {
        gsap.from('.settings-content', {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: 'power2.out'
        });
    }
});
