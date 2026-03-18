import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDO-p91Yk9JtdVaeHM6zujsQ02ABDjEdsk",
    authDomain: "sinetcom-838e3.firebaseapp.com",
    projectId: "sinetcom-838e3",
    storageBucket: "sinetcom-838e3.firebasestorage.app",
    messagingSenderId: "737316209885",
    appId: "1:737316209885:web:0582f475459a9d83718734"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);