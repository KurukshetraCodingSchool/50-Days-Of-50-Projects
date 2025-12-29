// Auth Logic for My Factory

document.addEventListener('DOMContentLoaded', () => {

    // --- constants ---
    const USERS_KEY = 'my_factory_users';
    const CURRENT_USER_KEY = 'my_factory_current_user';

    // --- Helper Functions ---
    function getUsers() {
        return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    }

    function saveUser(user) {
        const users = getUsers();
        users.push(user);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }

    function findUser(email) {
        const users = getUsers();
        return users.find(u => u.email === email);
    }

    function loginUser(user) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    }

    function logoutUser() {
        localStorage.removeItem(CURRENT_USER_KEY);
        // Check if we are in pages directory or root
        if (window.location.pathname.includes('/pages/')) {
            window.location.href = './login.html';
        } else {
            // Assuming we are in root (index.html), go to pages/login.html
            // Or just reload current page to update UI state
            window.location.reload();
        }
    }

    function getCurrentUser() {
        return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
    }

    // --- Page Specific Logic ---

    // 1. REGISTER PAGE
    const registerForm = document.querySelector('form#registerForm'); // We will add this ID to HTML
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
            const confirmPasswordInput = document.getElementById('cpassword');

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            // Basic Validation
            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            if (findUser(email)) {
                alert("User with this email already exists!");
                return;
            }

            // Save User
            const newUser = {
                name,
                email,
                password // In a real app, never store plain text passwords!
            };

            saveUser(newUser);
            alert("Registration Successful! Please Login.");
            window.location.href = './login.html';
        });
    }

    // 2. LOGIN PAGE
    const loginForm = document.querySelector('form#loginForm'); // We will add this ID to HTML
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Note: Login form inputs in the HTML need IDs/selectors. 
            // Based on view_file, login.html uses divs with IDs 'email' and 'password' but inputs inside don't have IDs.
            // We will fix HTML to make this easier, or select by type.
            const emailInput = loginForm.querySelector('input[type="text"]'); // or email type if changed
            const passwordInput = loginForm.querySelector('input[type="password"]');

            const email = emailInput.value.trim();
            const password = passwordInput.value;

            const user = findUser(email);

            if (user && user.password === password) {
                loginUser(user);
                alert(`Welcome back, ${user.name}!`);
                window.location.href = '../index.html'; // Go to home/dashboard
            } else {
                alert("Invalid email or password.");
            }
        });
    }

    // 4. CHECK AUTH STATE & UPDATE UI
    const currentUser = getCurrentUser();

    // DASHBOARD PROTECTION
    if (window.location.pathname.includes('dashboard.html')) {
        if (!currentUser) {
            alert("Please login to access dashboard!");
            window.location.href = './login.html';
        } else {
            // Optional: Display user name in dashboard
            const profileName = document.querySelector('.profile span');
            if (profileName) profileName.innerText = currentUser.name;
        }
    }

    // NAVBAR UPDATE (Home Page)
    // Try to find the login link by ID first, then fallback
    const loginLink = document.getElementById('loginLink');
    if (loginLink && currentUser) {
        loginLink.innerText = `Hi, ${currentUser.name}`;
        loginLink.href = './pages/dashboard.html'; // Redirect to dashboard instead of #

        // Optional: Add Logout button to navbar if there's space, or just rely on dashboard logout
        // Users might want to logout from home.
        // Let's create a logout button next to it.
        const logoutBtn = document.createElement('a');
        logoutBtn.href = "#";
        logoutBtn.innerText = "Logout";
        logoutBtn.classList.add("logout-btn"); // Add class for styling if needed
        logoutBtn.style.marginLeft = "15px";
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logoutUser();
        });

        loginLink.parentElement.appendChild(logoutBtn);
    } else if (!loginLink && currentUser) {
        // Maybe we are on a page where loginLink has no ID or different structure?
        // Fallback for generic structure if needed, but ID is safer now.
    }

    // DASHBOARD LOGOUT
    // Sidebar logout
    const sidebarLogout = document.querySelector('.sidebar ul li:last-child');
    if (sidebarLogout && sidebarLogout.innerText.includes('Logout')) {
        sidebarLogout.addEventListener('click', () => {
            logoutUser();
        });
    }
});
