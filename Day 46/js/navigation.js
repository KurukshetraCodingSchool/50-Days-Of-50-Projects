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
});
