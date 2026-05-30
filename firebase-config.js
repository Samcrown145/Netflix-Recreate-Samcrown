import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCruyF6oY7w3nMFiXqqf6mdqBLR_y_W-to",
    authDomain: "neflix-recreate-samcrown.firebaseapp.com",
    projectId: "neflix-recreate-samcrown",
    storageBucket: "neflix-recreate-samcrown.firebasestorage.app",
    messagingSenderId: "403934235455",
    appId: "1:403934235455:web:29b30587536a4ddffe618a",
    measurementId: "G-X4G6T1RXRC"
};

// Initialize Firebase once
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };