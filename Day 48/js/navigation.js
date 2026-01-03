/**
 * Kurugram Navigation Logic
 * Handles active state for sidebar and mobile navigation links
 */

document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop() || 'index.html';

    // Desktop Sidebar Links
    const sidebarLinks = document.querySelectorAll('.sidebar .nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-nav .nav-link');

    const updateActiveLink = (links) => {
        links.forEach(link => {
            const href = link.getAttribute('href');
            // Check if href matches pageName or if it's a relative path match
            if (href && (href.endsWith(pageName) || (pageName === 'index.html' && href.endsWith('login.html')))) {
                link.classList.add('active');

                // For sidebar, also update the icon if needed (e.g., home-line to home-fill)
                const icon = link.querySelector('i');
                if (icon) {
                    const iconClass = icon.className;
                    if (iconClass.includes('-line')) {
                        icon.className = iconClass.replace('-line', '-fill');
                    } else if (!iconClass.includes('-fill')) {
                        // For icons that might not follow standard naming but should be fill when active
                        if (iconClass.includes('ri-video')) icon.className = 'ri-video-fill';
                    }
                }
            } else {
                link.classList.remove('active');

                // Revert icon to line version if not active
                const icon = link.querySelector('i');
                if (icon) {
                    const iconClass = icon.className;
                    if (iconClass.includes('-fill') && !iconClass.includes('logo')) {
                        // Only replace if it's not a core fill icon like ri-google-fill
                        // But usually nav icons follow the line/fill pattern
                        if (iconClass.match(/ri-[a-z-]+-fill/)) {
                            icon.className = iconClass.replace('-fill', '-line');
                        }
                    }
                }
            }
        });
    };

    updateActiveLink(sidebarLinks);
    updateActiveLink(mobileLinks);

    // Global Page Transitions
    gsap.from('main', { opacity: 0, y: 20, duration: 0.5, ease: "power2.out" });

    // Navbar hide/show on scroll
    let lastScroll = 0;
    const mobileNav = document.querySelector('.mobile-nav');
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll <= 0) {
            mobileNav?.classList.remove('nav-hidden');
            return;
        }
        if (currentScroll > lastScroll && !mobileNav?.classList.contains('nav-hidden')) {
            // Scrolling down
            gsap.to(mobileNav, { y: '100%', duration: 0.3 });
            mobileNav?.classList.add('nav-hidden');
        } else if (currentScroll < lastScroll && mobileNav?.classList.contains('nav-hidden')) {
            // Scrolling up
            gsap.to(mobileNav, { y: '0%', duration: 0.3 });
            mobileNav?.classList.remove('nav-hidden');
        }
        lastScroll = currentScroll;
    });

    // Fake Real-time Notifications
    const simulateNotifications = () => {
        const notifIcon = document.querySelector('.ri-heart-line, .ri-heart-fill');
        if (!notifIcon) return;

        setInterval(() => {
            if (Math.random() > 0.6) {
                const badge = document.createElement('span');
                badge.className = 'notif-badge';
                badge.textContent = Math.floor(Math.random() * 3) + 1;

                const parent = notifIcon.parentElement;
                const existing = parent.querySelector('.notif-badge');
                if (existing) {
                    const currentVal = parseInt(existing.textContent);
                    existing.textContent = currentVal + 1;
                    gsap.fromTo(existing, { scale: 1.2 }, { scale: 1, duration: 0.3, ease: 'back.out(2)' });
                    return;
                }

                parent.style.position = 'relative';
                parent.appendChild(badge);

                gsap.from(badge, { scale: 0, duration: 0.3, ease: 'back.out(1.7)' });

                // Visual "Ping" effect
                const ping = document.createElement('div');
                ping.style.cssText = 'position: absolute; top: 0; right: 0; width: 10px; height: 10px; background: #ff3040; border-radius: 50%; z-index: 5; pointer-events: none;';
                parent.appendChild(ping);
                gsap.to(ping, { scale: 4, opacity: 0, duration: 0.6, onComplete: () => ping.remove() });

                setTimeout(() => {
                    if (badge.parentElement) {
                        gsap.to(badge, { scale: 0, opacity: 0, duration: 0.3, onComplete: () => badge.remove() });
                    }
                }, 8000);
            }
        }, 12000);
    };

    simulateNotifications();
});

// Add badge styles
const style = document.createElement('style');
style.textContent = `
    .notif-badge {
        position: absolute;
        top: -5px;
        right: -5px;
        background: #ff3040;
        color: white;
        font-size: 0.65rem;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        border: 2px solid var(--bg-color, #000);
        z-index: 10;
    }
`;
document.head.appendChild(style);
