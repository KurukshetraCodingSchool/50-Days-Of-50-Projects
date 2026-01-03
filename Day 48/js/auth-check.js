/**
 * Kurugram Auth Check
 * Ensures user is logged in before accessing protected pages
 */

(function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const currentPath = window.location.pathname;
    const isAuthPage = currentPath.includes('login.html') || currentPath.includes('signup.html');
    const isIndex = currentPath.endsWith('index.html') || currentPath.endsWith('/');

    // 1. If not logged in and trying to access a protected page
    if (!isLoggedIn && !isAuthPage && !isIndex) {
        // Redirect to login
        const prefix = currentPath.includes('/pages/') ? '' : 'pages/';
        window.location.href = prefix + 'login.html';
    }

    // 2. If logged in and on login/signup/index page, redirect to feed
    if (isLoggedIn && (isAuthPage || isIndex)) {
        const prefix = currentPath.includes('/pages/') ? './' : 'pages/';
        window.location.href = prefix + 'feed.html';
    }
})();

// Logout Function (can be called from any page)
function logout() {
    localStorage.removeItem('isLoggedIn');
    const currentPath = window.location.pathname;
    const prefix = currentPath.includes('/pages/') ? '' : 'pages/';
    window.location.href = prefix + 'login.html';
}
