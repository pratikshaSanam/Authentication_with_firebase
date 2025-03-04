// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDi-abGk5Z11sHABGawKsPcID6gl-qYRr8",
    authDomain: "authentication-4e957.firebaseapp.com",
    projectId: "authentication-4e957",
    storageBucket: "authentication-4e957.firebasestorage.app",
    messagingSenderId: "550966104793",
    appId: "1:550966104793:web:41b87750b79a291c2b64c8"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
