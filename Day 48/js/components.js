/**
 * Kurugram Component System
 * Reusable UI modules for a professional architecture
 */

const KurugramComponents = {
    /**
     * Post Card Template
     * @param {object} post 
     */
    PostCard: (post) => {
        const isLiked = post.likes && post.likes.includes(KurugramStorage.getCurrentUser()?.id);
        const heartIcon = isLiked ? 'ri-heart-fill' : 'ri-heart-line';
        const heartColor = isLiked ? 'style="color: #ff3040;"' : '';

        return `
            <article class="post-card" data-post-id="${post.id}">
                <div class="post-header">
                    <div class="post-user">
                        <img src="${post.userImage}" alt="${post.username}" class="user-avatar-sm">
                        <span>${post.username} ${post.isVerified ? '<i class="ri-verified-badge-fill verified-badge"></i>' : ''}</span>
                        <span class="post-time">• ${KurugramComponents.formatTime(post.timestamp)}</span>
                    </div>
                    <i class="ri-more-fill"></i>
                </div>
                <div class="post-image-container">
                    <img src="${post.image}" alt="Post Image" class="post-image">
                </div>
                <div class="post-actions">
                    <div class="action-group">
                        <i class="${heartIcon} like-btn" ${heartColor}></i>
                        <i class="ri-chat-3-line"></i>
                        <i class="ri-send-plane-line"></i>
                    </div>
                    <i class="ri-bookmark-line"></i>
                </div>
                <div class="post-content">
                    <span class="likes-count">${post.likes?.length || 0} likes</span>
                    <div class="caption">
                        <span>${post.username}</span> ${post.caption}
                    </div>
                    <a href="#" class="comments-link">View all comments</a>
                </div>
            </article>
        `;
    },

    /**
     * Suggestion Item Template
     */
    SuggestionItem: (user) => `
        <div class="suggestion-item">
            <div class="profile-info">
                <img src="${user.avatar}" alt="${user.username}" class="user-avatar-sm">
                <div style="display: flex; flex-direction: column;">
                    <span style="font-weight: 600; font-size: 0.9rem;">${user.username}</span>
                    <span style="color: var(--text-muted); font-size: 0.75rem;">${user.relation}</span>
                </div>
            </div>
            <a href="#" class="follow-link">Follow</a>
        </div>
    `,

    /**
     * Format timestamp to relative time
     */
    formatTime: (timestamp) => {
        const diff = Date.now() - timestamp;
        const hours = Math.floor(diff / 3600000);
        if (hours < 1) return 'now';
        if (hours < 24) return `${hours}h`;
        return `${Math.floor(hours / 24)}d`;
    },

    // Toast and Modal are reused from previous implementation
    toast: (message, type = 'success') => {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        const icon = type === 'success' ? 'ri-checkbox-circle-fill' : 'ri-error-warning-fill';
        toast.innerHTML = `<i class="${icon}"></i> <span>${message}</span>`;
        document.body.appendChild(toast);
        gsap.fromTo(toast, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.7)" });
        setTimeout(() => {
            gsap.to(toast, { y: 20, opacity: 0, duration: 0.3, onComplete: () => toast.remove() });
        }, 3000);
    },

    modal: (modalId) => {
        const modal = document.getElementById(modalId);
        if (!modal) return null;
        return {
            open: () => {
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                gsap.fromTo(modal.querySelector('.modal-card'), { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.2)" });
            },
            close: () => {
                gsap.to(modal.querySelector('.modal-card'), { scale: 0.9, opacity: 0, duration: 0.3, onComplete: () => { modal.style.display = 'none'; document.body.style.overflow = ''; } });
            }
        };
    }
};

window.KurugramComponents = KurugramComponents;
