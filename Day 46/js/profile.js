/**
 * Kurugram Profile Logic
 * Handles tab switching and profile interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Profile Tab Switching
    const tabs = document.querySelectorAll('.profile-tabs .tab-item');
    const profileGrid = document.querySelector('.profile-grid');

    // For demonstration, we'll just shuffle the grid or change its opacity
    // In a real app, these would be different containers
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove active from all
            tabs.forEach(t => {
                t.classList.remove('active');
                const icon = t.querySelector('i');
                if (icon) {
                    icon.className = icon.className.replace('-fill', '-line');
                }
            });

            // Add active to current
            tab.classList.add('active');
            const icon = tab.querySelector('i');
            if (icon) {
                icon.className = icon.className.replace('-line', '-fill');
            }

            // Simulate loading content
            if (profileGrid) {
                profileGrid.style.opacity = '0.3';
                profileGrid.style.transition = 'opacity 0.3s ease';

                setTimeout(() => {
                    profileGrid.style.opacity = '1';
                    // We could filter content here if we had more HTML
                }, 400);
            }
        });
    });

    // 2. Settings Button - Logout Functionality
    const settingsBtn = document.querySelector('.profile-settings-btn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            if (confirm('Do you want to logout?')) {
                logout(); // Called from auth-check.js
            }
        });
    }

    // 3. Follow Toggle for Suggested Users (if on profile sub-sections)
    const followBtns = document.querySelectorAll('.btn-follow');
    followBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            if (this.textContent === 'Follow') {
                this.textContent = 'Following';
                this.style.backgroundColor = 'transparent';
                this.style.color = 'var(--text-dark)';
                this.style.border = '1px solid var(--border-color)';
            } else {
                this.textContent = 'Follow';
                this.style.backgroundColor = 'var(--accent-color)';
                this.style.color = 'white';
                this.style.border = 'none';
            }
        });
    });
});
