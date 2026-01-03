/**
 * Kurugram Notification Logic
 * Handles follow toggles and "Mark all as read"
 */

document.addEventListener('DOMContentLoaded', () => {
    const markAllBtn = document.getElementById('markAllRead');
    const followBtns = document.querySelectorAll('.btn-follow, .btn-following');
    const notifItems = document.querySelectorAll('.notif-item');

    // 1. Mark some items as "unread" by default for demo
    notifItems.forEach((item, index) => {
        if (index < 3) item.classList.add('unread');
    });

    // 2. Mark All as Read
    markAllBtn?.addEventListener('click', () => {
        const unreadItems = document.querySelectorAll('.notif-item.unread');

        if (unreadItems.length > 0 && typeof gsap !== 'undefined') {
            unreadItems.forEach((item, index) => {
                gsap.to(item, {
                    '--dot-scale': 0,
                    '--dot-opacity': 0,
                    duration: 0.3,
                    delay: index * 0.05,
                    onComplete: () => {
                        item.classList.remove('unread');
                    }
                });
            });
        } else {
            unreadItems.forEach(item => item.classList.remove('unread'));
        }

        markAllBtn.style.opacity = '0.5';
        markAllBtn.disabled = true;
        markAllBtn.textContent = 'All Caught Up';
    });

    // 3. Follow Button Logic
    followBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            if (this.textContent === 'Follow') {
                this.className = 'btn-following';
                this.textContent = 'Following';

                // GSAP Feedack
                if (typeof gsap !== 'undefined') {
                    gsap.from(this, { scale: 0.9, duration: 0.2 });
                }
            } else {
                this.className = 'btn-follow';
                this.textContent = 'Follow';
            }
        });
    });

    // 4. Staggered Entrance
    if (typeof gsap !== 'undefined') {
        gsap.from('.notif-item', {
            opacity: 0,
            x: -20,
            stagger: 0.05,
            duration: 0.6,
            ease: 'power2.out'
        });
    }
});
