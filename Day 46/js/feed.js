/**
 * Kurugram Feed Interactivity
 * Handles likes, bookmarks, double-tap, and follow suggestions
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Heart (Like) Toggle
    const heartIcons = document.querySelectorAll('.ri-heart-line, .ri-heart-fill');

    heartIcons.forEach(heart => {
        heart.addEventListener('click', function () {
            const isLiked = this.classList.contains('ri-heart-fill');
            if (isLiked) {
                this.classList.replace('ri-heart-fill', 'ri-heart-line');
                this.style.color = '';
            } else {
                this.classList.replace('ri-heart-line', 'ri-heart-fill');
                this.style.color = '#ff3040';

                // Pop animation
                this.animate([
                    { transform: 'scale(1)' },
                    { transform: 'scale(1.2)' },
                    { transform: 'scale(1)' }
                ], { duration: 200 });
            }
        });
    });

    // 2. Bookmark Toggle
    const bookmarkIcons = document.querySelectorAll('.ri-bookmark-line, .ri-bookmark-fill');

    bookmarkIcons.forEach(bookmark => {
        bookmark.addEventListener('click', function () {
            const isSaved = this.classList.contains('ri-bookmark-fill');
            if (isSaved) {
                this.classList.replace('ri-bookmark-fill', 'ri-bookmark-line');
            } else {
                this.classList.replace('ri-bookmark-line', 'ri-bookmark-fill');
            }
        });
    });

    // 3. Double-tap to Like
    const postImages = document.querySelectorAll('.post-image-container');

    postImages.forEach(container => {
        let lastTap = 0;
        container.addEventListener('touchstart', function (e) {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;
            if (tapLength < 300 && tapLength > 0) {
                handleDoubleTap(container);
            }
            lastTap = currentTime;
        });

        // For desktop
        container.addEventListener('dblclick', function () {
            handleDoubleTap(container);
        });
    });

    function handleDoubleTap(container) {
        // Find the heart icon for this post
        const postCard = container.closest('.post-card');
        const heartIcon = postCard.querySelector('.ri-heart-line, .ri-heart-fill');

        // Trigger like if not already liked
        if (heartIcon.classList.contains('ri-heart-line')) {
            heartIcon.click();
        }

        // Create overlay heart animation
        const overlayHeart = document.createElement('i');
        overlayHeart.className = 'ri-heart-fill overlay-heart';
        container.appendChild(overlayHeart);

        setTimeout(() => {
            overlayHeart.remove();
        }, 1000);
    }

    // 4. Follow Button Toggle (Suggestions)
    const followButtons = document.querySelectorAll('.follow-link');
    followButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            if (this.textContent === 'Follow') {
                this.textContent = 'Following';
                this.style.color = 'var(--text-light)';
            } else if (this.textContent === 'Following') {
                this.textContent = 'Follow';
                this.style.color = 'var(--accent-color)';
            }
        });
    });
});

// Add Overlay Heart Animation Styles
const style = document.createElement('style');
style.textContent = `
    .post-image-container {
        position: relative;
    }
    .overlay-heart {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        font-size: 5rem;
        color: white;
        text-shadow: 0 0 20px rgba(0,0,0,0.3);
        pointer-events: none;
        animation: heartPop 0.8s ease-out forwards;
        z-index: 10;
        opacity: 0.8;
    }
    @keyframes heartPop {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
        15% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.9; }
        30% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        70% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
    }
`;
document.head.appendChild(style);
