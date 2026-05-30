import { auth } from "../firebase-config.js";
import { isSignInWithEmailLink, signInWithEmailLink } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Assuming a message box element exists in verify.html for displaying feedback.
// For example, you might have: <div class="message" id="verificationMessage"></div>
const messageBox = document.querySelector('.message');

if (isSignInWithEmailLink(auth, window.location.href)) {
    let email = window.localStorage.getItem('emailForSignIn');
    
    // If user opened the link on a different device, ask for email again
    if (!email) {
        email = window.prompt('Please provide your email for confirmation');
        // If user cancels the prompt or provides an empty email, handle it
        if (!email) {
            if (messageBox) {
                messageBox.textContent = "Email is required for verification.";
                messageBox.className = "message error";
                messageBox.style.display = "block";
            } else {
                alert("Email is required for verification.");
            }
            return; // Stop execution if email is not provided
        }
    }

    signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
            window.localStorage.removeItem('emailForSignIn');
            // Store a success flag in sessionStorage to display a message on index.html
            sessionStorage.setItem('signInSuccess', 'true');

            // Update UI to show success
            if (messageBox) {
                messageBox.textContent = "Verified successfully! Redirecting you to the home page...";
                messageBox.style.display = "block";
                messageBox.style.backgroundColor = "rgba(46, 204, 113, 0.2)";
                messageBox.style.color = "#2ecc71";
                messageBox.style.border = "1px solid #2ecc71";
            }

            const title = document.querySelector('.title');
            if (title) title.textContent = "Sign-in Confirmed";

            // Delay the redirect by 2 seconds so the user can see the message
            setTimeout(() => {
                window.location.href = "../index.html"; 
            }, 2000);
        })
        .catch((error) => {
            console.error(error); // Log the error for debugging
            if (messageBox) {
                messageBox.textContent = "Verification failed: " + error.message + ". The link may have expired or been used.";
                messageBox.className = "message error"; // Assuming CSS for .message.error exists
                messageBox.style.display = "block";
            } else {
                alert("Verification failed: " + error.message + ". The link may have expired or been used.");
            }
        });
} else {
    // If it's not a sign-in link, or if the page is accessed directly without a link
    if (messageBox) {
        messageBox.textContent = "This page is for email verification. Please use the link sent to your email.";
        messageBox.className = "message info"; // Assuming you have a .message.info style
        messageBox.style.display = "block";
    } else {
        alert("This page is for email verification. Please use the link sent to your email.");
    }
}