/**
 * Kurugram Storage Utility
 * Centralized way to handle LocalStorage data
 */

const STORAGE_KEYS = {
    USERS: 'kurugram_users',
    currentUser: 'kurugram_current_user',
    isLoggedIn: 'isLoggedIn',
    POSTS: 'kurugram_posts',
    THEME: 'kurugram_theme',
    NOTIFICATIONS: 'kurugram_notifications'
};

const Storage = {
    // Generic methods
    get: (key) => {
        const data = localStorage.getItem(key);
        try {
            return data ? JSON.parse(data) : null;
        } catch (e) {
            return data;
        }
    },
    set: (key, value) => {
        const val = typeof value === 'string' ? value : JSON.stringify(value);
        localStorage.setItem(key, val);
    },

    // User methods
    getCurrentUser: () => {
        const user = Storage.get(STORAGE_KEYS.currentUser);
        if (!user) {
            // Default user for demo
            const defaultUser = {
                id: 'admin',
                username: 'aditya.dev',
                fullname: 'Aditya Vardhan',
                bio: 'Building Kurugram 🚀 | Full Stack Developer',
                avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
                followers: 1204,
                following: 450,
                postsCount: 2
            };
            Storage.setCurrentUser(defaultUser);
            return defaultUser;
        }
        return user;
    },
    setCurrentUser: (user) => Storage.set(STORAGE_KEYS.currentUser, user),
    updateUser: (newData) => {
        const current = Storage.getCurrentUser();
        const updated = { ...current, ...newData };
        Storage.setCurrentUser(updated);

        // Also update in the "users" list if exists
        const users = Storage.get(STORAGE_KEYS.USERS) || [];
        const index = users.findIndex(u => u.username === current.username);
        if (index > -1) {
            users[index] = { ...users[index], ...newData };
            Storage.set(STORAGE_KEYS.USERS, users);
        }
    },
    logout: () => {
        localStorage.removeItem(STORAGE_KEYS.isLoggedIn);
        localStorage.removeItem(STORAGE_KEYS.currentUser);
        window.location.href = '../pages/login.html';
    },

    // Posts methods
    getPosts: () => {
        const posts = Storage.get(STORAGE_KEYS.POSTS);
        if (!posts || posts.length === 0) {
            return Storage.initDefaultPosts();
        }
        return posts;
    },
    setPosts: (posts) => Storage.set(STORAGE_KEYS.POSTS, posts),
    savePost: (post) => {
        const posts = Storage.getPosts();
        posts.unshift(post);
        Storage.setPosts(posts);
    },

    // Likes & Bookmarks
    toggleLike: (postId) => {
        const posts = Storage.getPosts();
        const post = posts.find(p => p.id === postId);
        if (post) {
            const userId = Storage.getCurrentUser()?.id;
            if (!post.likes) post.likes = [];

            const index = post.likes.indexOf(userId);
            if (index > -1) {
                post.likes.splice(index, 1);
            } else {
                post.likes.push(userId);
            }
            Storage.setPosts(posts);
            return post.likes.length;
        }
        return 0;
    },

    initDefaultPosts: () => {
        const defaults = [
            {
                id: '1',
                userId: 'admin',
                username: 'aditya.dev',
                userImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
                image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800',
                caption: 'Building something amazing! 🚀 #coding #webdev',
                likes: ['user1', 'user2'],
                comments: [],
                timestamp: Date.now() - 3600000,
                isPinned: true
            },
            {
                id: '2',
                userId: 'kuruk',
                username: 'kurukshetra',
                userImage: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100',
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
                caption: 'Code all night, sleep all day. 💻',
                likes: ['user1'],
                comments: [],
                timestamp: Date.now() - 7200000
            }
        ];
        Storage.set(STORAGE_KEYS.POSTS, defaults);
        return defaults;
    },

    // Global Search
    search: (query) => {
        const q = query.toLowerCase();
        const posts = Storage.getPosts();
        // Mock some users to search
        const users = [
            { username: 'aditya.dev', fullname: 'Aditya Vardhan', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100' },
            { username: 'kurukshetra', fullname: 'Kurukshetra Academy', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100' },
            { username: 'design_pro', fullname: 'Design Pro', avatar: 'https://i.pravatar.cc/150?u=2' },
            { username: 'alex_dev', fullname: 'Alex Dev', avatar: 'https://i.pravatar.cc/150?u=1' }
        ];

        return {
            users: users.filter(u => u.username.includes(q) || u.fullname.toLowerCase().includes(q)),
            posts: posts.filter(p => p.caption.toLowerCase().includes(q) || p.username.includes(q))
        };
    }
};

window.KurugramStorage = Storage;
