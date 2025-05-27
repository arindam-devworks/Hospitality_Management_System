document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    const togglePassword = document.getElementById('togglePassword');
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye-slash');
        });
    }

    // Password strength indicator
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const strengthBars = document.querySelectorAll('.strength-bar');
            const strengthText = document.getElementById('strengthText');
            const password = this.value;
            let strength = 0;

            // Reset bars
            strengthBars.forEach(bar => {
                bar.style.backgroundColor = '';
            });

            // Check password strength
            if (password.length > 0) strength++;
            if (password.length >= 8) strength++;
            if (/[A-Z]/.test(password)) strength++;
            if (/[0-9]/.test(password)) strength++;
            if (/[^A-Za-z0-9]/.test(password)) strength++;

            // Update UI
            for (let i = 0; i < strengthBars.length; i++) {
                if (i < strength) {
                    let color;
                    if (strength <= 2) {
                        color = 'var(--danger)';
                        strengthText.textContent = 'Weak';
                    } else if (strength <= 3) {
                        color = 'var(--warning)';
                        strengthText.textContent = 'Medium';
                    } else {
                        color = 'var(--success)';
                        strengthText.textContent = 'Strong';
                    }
                    strengthBars[i].style.backgroundColor = color;
                }
            }
        });
    }

    // Form validation and signup
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (password !== confirmPassword) {
                console.log('Passwords do not match!');
                return;
            }

            fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullname, email, password })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                if (data.message === 'Signup successful') {
                    window.location.href = './login.html';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                console.log('Signup failed. Please try again.');
            });
        });
    }

    // Login form handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Login successful') {
                    console.log('Login successful! Redirecting to dashboard...');
                    window.location.href = './homepage.html';
                } else {
                    console.log(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                console.log('Login failed. Please try again.');
            });
        });
    }

    // Animation for auth container
    const authContainer = document.querySelector('.auth-container');
    if (authContainer) {
        authContainer.style.opacity = '0';
        setTimeout(() => {
            authContainer.style.transition = 'opacity 0.5s ease';
            authContainer.style.opacity = '1';
        }, 100);
    }

    // Animate pattern circles
    const circles = document.querySelectorAll('.pattern-circle');
    circles.forEach((circle, index) => {
        circle.style.transform = 'scale(0)';
        setTimeout(() => {
            circle.style.transition = `transform 0.5s ease ${index * 0.2}s`;
            circle.style.transform = 'scale(1)';
        }, 500);
    });
});