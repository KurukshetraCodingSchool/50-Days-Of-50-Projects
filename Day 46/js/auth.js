/**
 * Kurugram Authentication Logic
 * Handles password visibility and form validation
 */

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');
    const passwordInputs = document.querySelectorAll('input[type="password"]');

    // 1. Password Visibility Toggle
    passwordInputs.forEach(input => {
        const wrapper = input.parentElement;
        if (wrapper && wrapper.classList.contains('input-group')) {
            // Create an eye icon
            const eyeIcon = document.createElement('i');
            eyeIcon.className = 'ri-eye-off-line password-toggle';
            eyeIcon.style.cursor = 'pointer';
            eyeIcon.style.position = 'absolute';
            eyeIcon.style.right = '15px';
            eyeIcon.style.color = 'var(--text-light)';

            // Adjust original icon if it overlaps
            const lockIcon = wrapper.querySelector('.ri-lock-2-line');
            if (lockIcon) {
                lockIcon.style.right = '45px'; // Move lock icon to make room for eye
            }

            wrapper.appendChild(eyeIcon);

            eyeIcon.addEventListener('click', () => {
                const isPassword = input.type === 'password';
                input.type = isPassword ? 'text' : 'password';
                eyeIcon.className = isPassword ? 'ri-eye-line password-toggle' : 'ri-eye-off-line password-toggle';
            });
        }
    });

    // 2. Form Validation & Feedback
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            const isLoginPage = window.location.pathname.includes('login.html');
            const isSignupPage = window.location.pathname.includes('signup.html');

            const inputs = Array.from(loginForm.querySelectorAll('input[required]'));
            let isValid = true;
            let errorMessage = '';

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'rgba(255, 0, 0, 0.5)';
                    input.parentElement.animate([
                        { transform: 'translateX(0)' },
                        { transform: 'translateX(-5px)' },
                        { transform: 'translateX(5px)' },
                        { transform: 'translateX(0)' }
                    ], { duration: 300 });
                } else {
                    input.style.borderColor = 'var(--border-color)';
                }
            });

            if (!isValid) {
                e.preventDefault();
                return;
            }

            // 3. Stricter Credentials Check
            const users = JSON.parse(localStorage.getItem('kurugram_users') || '[]');

            if (isSignupPage) {
                const usernameInput = loginForm.querySelector('input[placeholder="Username"]');
                const passwordInput = loginForm.querySelector('input[type="password"]');

                // Check if user already exists
                const userExists = users.some(u => u.username === usernameInput.value);
                if (userExists) {
                    e.preventDefault();
                    alert('Username already exists! Try another one.');
                    return;
                }

                // Register new user
                users.push({
                    username: usernameInput.value,
                    password: passwordInput.value
                });
                localStorage.setItem('kurugram_users', JSON.stringify(users));
                localStorage.setItem('isLoggedIn', 'true');
                // Proceed to feed.html
            }

            else if (isLoginPage) {
                const usernameInput = loginForm.querySelector('input[type="text"]');
                const passwordInput = loginForm.querySelector('input[type="password"]');

                // Check against "database" (localStorage)
                const user = users.find(u => u.username === usernameInput.value && u.password === passwordInput.value);

                // Admin fallback for testing
                const isAdmin = usernameInput.value === 'admin' && passwordInput.value === '1234';

                if (user || isAdmin) {
                    localStorage.setItem('isLoggedIn', 'true');
                    // Proceed to feed.html
                } else {
                    e.preventDefault();
                    alert('Invalid username or password!');
                    usernameInput.style.borderColor = 'red';
                    passwordInput.style.borderColor = 'red';
                    return;
                }
            }

            // Show loading state on button
            const btn = loginForm.querySelector('button');
            if (btn) {
                btn.innerHTML = '<i class="ri-loader-4-line spin"></i> Validating...';
                btn.style.opacity = '0.8';
                btn.style.pointerEvents = 'none';
            }
        });
    }
});

// Add spin animation to CSS if not present, but for now we'll just use the icons
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    .spin {
        display: inline-block;
        animation: spin 1s linear infinite;
    }
    .password-toggle:hover {
        color: var(--accent-color) !important;
    }
`;
document.head.appendChild(style);
