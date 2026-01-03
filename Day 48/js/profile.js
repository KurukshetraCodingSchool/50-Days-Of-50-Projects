/**
 * Kurugram Profile Logic
 * Handles tab switching, profile editing, and post detail viewing
 */

/**
 * Kurugram Profile Logic
 * Handles dynamic data loading, tab switching, and editing
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Data Loading
    renderProfile();
    renderUserPosts();

    // 2. DOM Elements
    const tabs = document.querySelectorAll('.profile-tabs .tab-item');
    const profileGrid = document.querySelector('.profile-grid');
    const editProfileModal = document.getElementById('editProfileModal');
    const postDetailModal = document.getElementById('postDetailModal');
    const editProfileBtn = document.getElementById('editProfileBtn');
    const closeEditModal = document.getElementById('closeEditModal');
    const saveProfileBtn = document.getElementById('saveProfile');
    const closePostModal = document.getElementById('closePostModal');

    function renderProfile() {
        const user = KurugramStorage.getCurrentUser();
        if (!user) return;

        document.querySelector('.profile-avatar-lg').src = user.avatar;
        document.querySelector('.profile-username').innerHTML = `${user.username} <i class="ri-verified-badge-fill verified-badge lg"></i>`;

        const stats = document.querySelectorAll('.profile-stats span strong');
        if (stats.length >= 3) {
            const posts = KurugramStorage.getPosts().filter(p => p.username === user.username);
            stats[0].textContent = posts.length;
            stats[1].textContent = Components.formatCount(user.followers);
            stats[2].textContent = Components.formatCount(user.following);
        }

        document.querySelector('.profile-bio strong').textContent = user.fullname;
        document.querySelector('.profile-bio p').innerHTML = user.bio.replace(/\n/g, '<br>');
    }

    function renderUserPosts() {
        const user = KurugramStorage.getCurrentUser();
        const posts = KurugramStorage.getPosts().filter(p => p.username === user.username);
        const grid = document.querySelector('.profile-grid');

        if (!grid) return;
        grid.innerHTML = '';

        posts.forEach(post => {
            const postEl = document.createElement('div');
            postEl.className = 'profile-post';
            postEl.innerHTML = `<img src="${post.image}" alt="Post">`;
            postEl.addEventListener('click', () => openPostDetail(post));
            grid.appendChild(postEl);
        });
    }

    function openPostDetail(post) {
        const modal = document.getElementById('postDetailModal');
        modal.querySelector('#modalPostImage').src = post.image;
        modal.querySelector('.post-detail-header img').src = post.userImage;
        modal.querySelector('.username').textContent = post.username;
        modal.querySelector('.post-likes strong').textContent = `${post.likes?.length || 0} likes`;
        modal.classList.add('active');

        gsap.from(modal.querySelector('.post-detail-card'), { scale: 0.9, opacity: 0, duration: 0.3 });
    }

    // 3. Edit Profile Logic
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', () => {
            const user = KurugramStorage.getCurrentUser();
            document.getElementById('editName').value = user.fullname;
            document.getElementById('editUsername').value = user.username;
            document.getElementById('editBio').value = user.bio;
            editProfileModal.classList.add('active');
        });
    }

    saveProfileBtn?.addEventListener('click', () => {
        const newData = {
            fullname: document.getElementById('editName').value,
            username: document.getElementById('editUsername').value,
            bio: document.getElementById('editBio').value
        };

        KurugramStorage.updateUser(newData);
        renderProfile();

        saveProfileBtn.innerHTML = '<i class="ri-check-line"></i> Saved';
        setTimeout(() => {
            saveProfileBtn.textContent = 'Done';
            editProfileModal.classList.remove('active');
        }, 800);
    });

    // Helpers
    const closeModals = () => {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
    };

    closeEditModal?.addEventListener('click', closeModals);
    closePostModal?.addEventListener('click', closeModals);

    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModals();
        });
    });

    // Tab Switching
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });
});

// Helper for count formatting if not in components.js
if (!window.Components) window.Components = {};
window.Components.formatCount = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num;
};
