/**
 * Kurugram Messaging Interaction
 * Handles chat switching, message sending, and mobile toggle
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Fetch Users from Storage
    const storage = window.KurugramStorage;
    const currentUser = storage.getCurrentUser();

    // Get all users and filter out current user
    const allUsers = storage.get('kurugram_users') || [];
    // If no users in storage, add some defaults for demo
    if (allUsers.length === 0) {
        const defaults = [
            { username: 'alex_dev', fullname: 'Alex Dev', avatar: 'https://i.pravatar.cc/150?u=1' },
            { username: 'design_pro', fullname: 'Design Pro', avatar: 'https://i.pravatar.cc/150?u=2' },
            { username: 'travel_x', fullname: 'Travel X', avatar: 'https://i.pravatar.cc/150?u=3' },
            { username: 'sarah_codes', fullname: 'Sarah Codes', avatar: 'https://i.pravatar.cc/150?u=8' },
            { username: 'john_doe', fullname: 'John Doe', avatar: 'https://i.pravatar.cc/150?u=12' }
        ];
        storage.set('kurugram_users', defaults);
        location.reload(); // Reload once to populate
        return;
    }

    const filteredUsers = allUsers.filter(u => u.username !== currentUser.username);

    // Mock Messages Data (Persist in memory for current session)
    const chatsData = {};
    filteredUsers.forEach(user => {
        chatsData[user.username] = {
            name: user.username,
            avatar: user.avatar || `https://i.pravatar.cc/150?u=${user.username}`,
            isOnline: Math.random() > 0.3, // Randomly set some online
            messages: [
                { type: 'received', text: 'Hey there!' },
                { type: 'sent', text: 'Hey! How are you?' }
            ]
        };
    });

    // 2. DOM Elements
    const contactListWrapper = document.querySelector('.msg-wrapper');
    const chatArea = document.getElementById('chatArea');
    const chatHeaderName = document.getElementById('chatHeaderName');
    const chatHeaderAvatar = document.getElementById('chatHeaderAvatar');
    const messageInput = document.getElementById('messageInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const sendHeartBtn = document.getElementById('sendHeart');
    const backToContacts = document.getElementById('backToContacts');
    const messageContainer = document.querySelector('.message-container');
    const emojiBtn = document.getElementById('emojiBtn');
    const emojiPicker = document.getElementById('emojiPicker');
    const typingIndicator = document.getElementById('typingIndicator');

    let currentChat = filteredUsers[0]?.username || 'alex_dev';

    // 3. Render Contact List
    function renderContacts() {
        contactListWrapper.innerHTML = '';
        filteredUsers.forEach(user => {
            const data = chatsData[user.username] || {
                name: user.username,
                avatar: user.avatar || `https://i.pravatar.cc/150?u=${user.username}`,
                isOnline: false
            };

            const item = document.createElement('div');
            item.className = `contact-item ${user.username === currentChat ? 'active' : ''}`;
            item.dataset.username = user.username;

            item.innerHTML = `
                <div class="avatar-wrapper">
                    <img src="${data.avatar}" alt="${user.username}" class="contact-avatar">
                    <span class="status-dot ${data.isOnline ? 'online' : ''}"></span>
                </div>
                <div class="contact-info">
                    <span class="contact-name">${user.username}</span>
                    <span class="contact-preview">${data.messages[data.messages.length - 1]?.text || 'No messages yet'}</span>
                </div>
            `;

            item.addEventListener('click', () => switchChat(user.username));
            contactListWrapper.appendChild(item);
        });
    }

    // 4. Switch Chat Function
    function switchChat(username) {
        currentChat = username;
        const data = chatsData[username];

        // Update UI Header
        chatHeaderName.textContent = data.name;
        chatHeaderAvatar.src = data.avatar;

        // Update active class on contacts
        const items = document.querySelectorAll('.contact-item');
        items.forEach(item => {
            if (item.dataset.username === username) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Update Chat Messages
        renderMessages(data.messages);

        // Mobile Toggle
        if (window.innerWidth <= 900) {
            messageContainer.classList.add('show-chat');
        }

        // Close Emoji Picker
        emojiPicker.classList.remove('active');
    }

    function renderMessages(messages) {
        chatArea.innerHTML = '';
        messages.forEach((msg, index) => {
            const bubble = document.createElement('div');
            bubble.className = `message-bubble ${msg.type}`;
            bubble.textContent = msg.text;
            chatArea.appendChild(bubble);

            // Add "Seen" status for the last sent message
            if (msg.type === 'sent' && index === messages.length - 1) {
                const seen = document.createElement('div');
                seen.className = 'seen-status';
                seen.textContent = 'Seen';
                seen.style.cssText = 'font-size: 0.7rem; align-self: flex-end; margin-top: -8px; margin-right: 5px; opacity: 0.6;';
                chatArea.appendChild(seen);
            }

            // GSAP entrance for each bubble
            if (typeof gsap !== 'undefined') {
                gsap.from(bubble, {
                    opacity: 0,
                    y: 10,
                    scale: 0.9,
                    duration: 0.3,
                    delay: index * 0.05
                });
            }
        });
        chatArea.scrollTop = chatArea.scrollHeight;
    }

    // 5. Send Message Function
    function sendMessage() {
        const text = messageInput.value.trim();
        if (!text) return;

        // Add to data
        chatsData[currentChat].messages.push({ type: 'sent', text: text });

        // Update preview in contact list
        const activeContactPreview = document.querySelector('.contact-item.active .contact-preview');
        if (activeContactPreview) activeContactPreview.textContent = `You: ${text}`;

        // Render
        renderMessages(chatsData[currentChat].messages);

        // Clear input
        messageInput.value = '';
        toggleSendButton();
        emojiPicker.classList.remove('active');

        // Simulate reply
        setTimeout(() => {
            simulateReply(currentChat);
        }, 1500);
    }

    function simulateReply(username) {
        if (currentChat !== username) return;

        typingIndicator.style.display = 'flex';
        chatArea.scrollTop = chatArea.scrollHeight;

        setTimeout(() => {
            if (currentChat !== username) return;
            typingIndicator.style.display = 'none';

            const replies = [
                "Nice! 👍", "I see.", "Cool, thanks for letting me know.",
                "Interesting...", "Let's catch up later.", "🚀🚀🚀"
            ];
            const randomReply = replies[Math.floor(Math.random() * replies.length)];

            chatsData[username].messages.push({ type: 'received', text: randomReply });

            // Update preview
            const contactItem = document.querySelector(`.contact-item[data-username="${username}"] .contact-preview`);
            if (contactItem) contactItem.textContent = randomReply;

            renderMessages(chatsData[username].messages);
        }, 2000);
    }

    function toggleSendButton() {
        if (messageInput.value.trim().length > 0) {
            sendMessageBtn.classList.add('visible');
            sendHeartBtn.style.display = 'none';
        } else {
            sendMessageBtn.classList.remove('visible');
            sendHeartBtn.style.display = 'block';
        }
    }

    // 6. Event Listeners
    sendMessageBtn.addEventListener('click', sendMessage);

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    messageInput.addEventListener('input', toggleSendButton);

    backToContacts.addEventListener('click', () => {
        messageContainer.classList.remove('show-chat');
    });

    sendHeartBtn.addEventListener('click', () => {
        messageInput.value = '❤️';
        sendMessage();
    });

    emojiBtn.addEventListener('click', () => {
        emojiPicker.classList.toggle('active');
    });

    document.querySelector('.emoji-list').addEventListener('click', (e) => {
        if (e.target.tagName === 'SPAN') {
            messageInput.value += e.target.textContent;
            messageInput.focus();
            toggleSendButton();
        }
    });

    document.addEventListener('click', (e) => {
        if (!emojiPicker.contains(e.target) && e.target !== emojiBtn) {
            emojiPicker.classList.remove('active');
        }
    });

    // 7. Initialize
    renderContacts();
    if (filteredUsers.length > 0) {
        switchChat(filteredUsers[0].username);
    }
});
