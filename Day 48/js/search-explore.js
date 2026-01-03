/**
 * Kurugram Search & Explore Logic
 * Handles user filtering and recent search interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchResultsList = document.getElementById('searchResultsList');
    const clearAllBtn = document.getElementById('clearAllBtn');
    const searchUserItems = document.querySelectorAll('.search-user-item');

    // 1. Search Filtering Logic
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (query.length < 1) {
                // Restore default view or show recent
                return;
            }

            const results = KurugramStorage.search(query);
            renderSearchResults(results);
        });
    }

    function renderSearchResults(results) {
        if (!searchResultsList) return;
        searchResultsList.innerHTML = '';

        if (results.users.length === 0 && results.posts.length === 0) {
            searchResultsList.innerHTML = '<div class="empty-state">No results found</div>';
            return;
        }

        results.users.forEach(user => {
            const userHTML = `
                <div class="search-user-item">
                    <div class="user-info">
                        <img src="${user.avatar}" alt="${user.username}" class="user-avatar-sm">
                        <div class="user-text">
                            <span class="search-username">${user.username}</span>
                            <span class="search-fullname" style="color: var(--text-light); font-size: 0.8rem;">${user.fullname}</span>
                        </div>
                    </div>
                </div>`;
            searchResultsList.insertAdjacentHTML('beforeend', userHTML);
        });
    }

    // 2. Remove Individual Item
    searchResultsList?.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('.remove-btn');
        if (removeBtn) {
            const userItem = removeBtn.closest('.search-user-item');
            if (userItem) {
                userItem.style.opacity = '0';
                userItem.style.transform = 'translateX(20px)';
                userItem.style.transition = 'all 0.3s ease';

                setTimeout(() => {
                    userItem.remove();
                }, 300);
            }
        }
    });

    // 3. Clear All Logic
    clearAllBtn?.addEventListener('click', () => {
        if (searchResultsList && searchUserItems.length > 0) {
            gsap.to('.search-user-item', {
                opacity: 0,
                x: 20,
                stagger: 0.05,
                duration: 0.3,
                onComplete: () => {
                    searchResultsList.innerHTML = '<div class="empty-state" style="padding: 2rem; border-top: 1px solid var(--border-color); color: var(--text-muted); text-align: center;">No recent searches</div>';
                    gsap.from('.empty-state', { opacity: 0, y: 10, duration: 0.5 });
                    clearAllBtn.style.display = 'none';
                }
            });
        }
    });

    // 4. Explore Grid Animations (GSAP)
    const exploreItems = document.querySelectorAll('.explore-item');
    if (exploreItems.length > 0 && typeof gsap !== 'undefined') {
        // Reveal animation
        gsap.from('.explore-item', {
            opacity: 0,
            y: 30,
            stagger: 0.05,
            duration: 0.8,
            ease: 'power3.out'
        });

        // Hover effect enhancement
        exploreItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                gsap.to(item.querySelector('img'), { scale: 1.1, duration: 0.6, ease: 'power2.out' });
                gsap.to(item.querySelector('.explore-overlay'), { opacity: 1, duration: 0.3 });
            });
            item.addEventListener('mouseleave', () => {
                gsap.to(item.querySelector('img'), { scale: 1, duration: 0.6, ease: 'power2.out' });
                gsap.to(item.querySelector('.explore-overlay'), { opacity: 0, duration: 0.3 });
            });
        });
    }
});
