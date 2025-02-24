'use client';

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBrWVA9He2QLZ6o7ufN6gnvfs0dXWwTYYo",
  authDomain: "ev-charging-255d5.firebaseapp.com",
  projectId: "ev-charging-255d5",
  storageBucket: "ev-charging-255d5.appspot.com", // Fixed storage bucket URL
  messagingSenderId: "792160518669",
  appId: "1:792160518669:web:327ec5b5df32951e72cb44"
};

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  if (!/already exists/.test(error.message)) {
    console.error('Firebase initialization error', error.stack);
    throw error;
  }
  app = getApp(); // If already initialized, use that one
}

// Initialize Auth
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

// Configure Google Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export { auth, db, googleProvider };

