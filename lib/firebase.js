import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCihMOJ5sTcabz2lBYslbawh5dCaoXUyDA",
  authDomain: "transla-937c6.firebaseapp.com",
  projectId: "transla-937c6",
  storageBucket: "transla-937c6.firebasestorage.app",
  messagingSenderId: "824377777651",
  appId: "1:824377777651:web:156965ba792a96e59b8686"
};

// Initialize Firebase, checking if it's already initialized to prevent Next.js hot-reload errors
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
