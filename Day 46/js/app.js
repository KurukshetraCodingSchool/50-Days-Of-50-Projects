/**
 * Kurugram Global Logic
 * Handles message search, notifications, and miscellaneous UI polish
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Message Search Filtering
    const messageSearch = document.querySelector('.search-box input');
    const messageItems = document.querySelectorAll('.chat-item');

    if (messageSearch && messageItems.length > 0) {
        messageSearch.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();

            messageItems.forEach(item => {
                const name = item.querySelector('.chat-name').textContent.toLowerCase();
                const lastMsg = item.querySelector('.last-message').textContent.toLowerCase();

                if (name.includes(query) || lastMsg.includes(query)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // 2. Notification Toggle / Interaction
    const notifications = document.querySelectorAll('.notification-item');
    notifications.forEach(notif => {
        notif.addEventListener('click', () => {
            notif.style.backgroundColor = 'transparent'; // Mark as read
        });
    });

    // 3. Simple Image Preview (for posts/grid)
    // Add a hover effect via JS for smoother interaction if needed
    const gridItems = document.querySelectorAll('.explore-item, .profile-post');
    gridItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const overlay = item.querySelector('.explore-overlay');
            if (overlay) overlay.style.opacity = '1';
        });
        item.addEventListener('mouseleave', () => {
            const overlay = item.querySelector('.explore-overlay');
            if (overlay) overlay.style.opacity = '0';
        });
    });
});
