import { auth } from "../firebase-config.js";
import { sendSignInLinkToEmail } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('login-input');
    const resendLink = document.querySelector('.captcha-text a');
    
    // 1. Get the email we saved in localStorage during the sign-in step
    const savedEmail = window.localStorage.getItem('emailForSignIn');

    // 2. Automatically put that email into the input field
    if (savedEmail && emailInput) {
        emailInput.value = savedEmail;
    }

    // 3. Handle the Resend Logic
    if (resendLink) {
        resendLink.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (!savedEmail) {
                alert('Session expired. Please restart the sign-in process.');
                return;
            }

            const actionCodeSettings = {
                // Robustly targeting the /signin/verify.html relative to project root
                url: window.location.origin + 
                     window.location.pathname.split('/sign-up-email-link/')[0] + 
                     '/signin/verify.html',
                handleCodeInApp: true,
            };

            sendSignInLinkToEmail(auth, savedEmail, actionCodeSettings)
                .then(() => {
                    alert('A new link has been sent to ' + savedEmail);
                })
                .catch((error) => {
                    console.error(error);
                    alert('Error resending link (' + error.code + '): ' + error.message);
                });
        });
    }
});