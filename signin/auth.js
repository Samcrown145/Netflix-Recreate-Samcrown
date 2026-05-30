// Firebase imports removed to allow instant sign-in

// 4. Logic to send the Gmail Link
const loginForm = document.querySelector('form');
const emailInput = document.querySelector('input[type="email"]');
const messageBox = document.querySelector('.message');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();

        // Regex to validate that the email ends specifically with @gmail.com
        const emailRegex = /^[^\s@]+@gmail\.com$/;
        if (!emailRegex.test(email)) {
            messageBox.textContent = "Email is not correct";
            messageBox.className = "message error";
            messageBox.style.display = "block";
            return;
        }

        // Simulate a successful sign-in
        // Save the email locally so the dashboard knows who is "logged in"
        window.localStorage.setItem('userEmail', email);
        window.sessionStorage.setItem('signInSuccess', 'true');

        // Automatically redirect to the dashboard
        window.location.href = "../browse.html";
    });
}