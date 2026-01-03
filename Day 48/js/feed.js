/**
 * Kurugram Feed Interactivity
 * Handles likes, bookmarks, double-tap, and follow suggestions
 */

/**
 * Kurugram Feed Interactivity
 * Handles sorting, component rendering, and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inject components script if not already there (safety check)
    if (!window.KurugramComponents) {
        const script = document.createElement('script');
        script.src = '../js/components.js';
        document.head.appendChild(script);
    }

    const postsContainer = document.getElementById('postsContainer');
    const sortTabs = document.querySelectorAll('.sort-tab');
    let currentSort = 'latest';

    // 1. Initial Render
    renderFeed();
    renderSuggestions();

    // 2. Sorting Logic
    sortTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            sortTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentSort = tab.dataset.sort;
            renderFeed();
        });
    });

    function renderFeed() {
        if (!postsContainer) return;

        let posts = KurugramStorage.getPosts();

        // Sorting Logic
        if (currentSort === 'latest') {
            posts.sort((a, b) => b.timestamp - a.timestamp);
        } else if (currentSort === 'popular') {
            posts.sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0));
        }

        // Pinned posts always at top
        posts.sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));

        postsContainer.innerHTML = '';
        posts.forEach(post => {
            const postHTML = KurugramComponents.PostCard(post);
            postsContainer.insertAdjacentHTML('beforeend', postHTML);
        });

        attachPostListeners();
    }

    function renderSuggestions() {
        const suggestionsColumn = document.querySelector('.suggestions-column');
        if (!suggestionsColumn) return;

        const suggestedUsers = [
            { username: 'react_dev', avatar: 'https://i.pravatar.cc/150?u=11', relation: 'Suggested for you' },
            { username: 'gsap_master', avatar: 'https://i.pravatar.cc/150?u=12', relation: 'Followed by design_pro' },
            { username: 'framer_motion', avatar: 'https://i.pravatar.cc/150?u=13', relation: 'New to Kurugram' }
        ];

        // Find the suggestions header and insert after it
        const header = suggestionsColumn.querySelector('.suggestions-header');
        if (header) {
            // Remove existing static items if any (except header and footer)
            const existingItems = suggestionsColumn.querySelectorAll('.suggestion-item');
            existingItems.forEach(item => item.remove());

            suggestedUsers.forEach(user => {
                header.insertAdjacentHTML('afterend', KurugramComponents.SuggestionItem(user));
            });
        }
    }

    function attachPostListeners() {
        // Heart (Like) Toggle
        postsContainer.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const postCard = this.closest('.post-card');
                const postId = postCard.dataset.postId;
                const newLikesCount = KurugramStorage.toggleLike(postId);

                const isLiked = this.classList.contains('ri-heart-fill');
                if (isLiked) {
                    this.classList.replace('ri-heart-fill', 'ri-heart-line');
                    this.style.color = '';
                } else {
                    this.classList.replace('ri-heart-line', 'ri-heart-fill');
                    this.style.color = '#ff3040';

                    // Pop animation
                    GSAPAnimations.bounce(this);
                }

                postCard.querySelector('.likes-count').textContent = `${newLikesCount} likes`;
            });
        });

        // Double-tap to Like
        postsContainer.querySelectorAll('.post-image-container').forEach(container => {
            let lastTap = 0;
            container.addEventListener('dblclick', function () {
                handleDoubleTap(container);
            });

            // Mobile double tap
            container.addEventListener('touchstart', function (e) {
                const currentTime = new Date().getTime();
                const tapLength = currentTime - lastTap;
                if (tapLength < 300 && tapLength > 0) {
                    handleDoubleTap(container);
                }
                lastTap = currentTime;
            });
        });
    }

    function handleDoubleTap(container) {
        const postCard = container.closest('.post-card');
        const likeBtn = postCard.querySelector('.like-btn');

        if (likeBtn.classList.contains('ri-heart-line')) {
            likeBtn.click();
        }

        // Animated heart overlay
        const heart = document.createElement('i');
        heart.className = 'ri-heart-fill overlay-heart';
        container.appendChild(heart);

        gsap.to(heart, {
            scale: 2,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            onComplete: () => heart.remove()
        });
    }
});

// Animation Helpers
const GSAPAnimations = {
    bounce: (element) => {
        if (window.gsap) {
            gsap.fromTo(element, { scale: 0.8 }, { scale: 1.2, duration: 0.2, yoyo: true, repeat: 1 });
        }
    }
};

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
