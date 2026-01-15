// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8bQFGq4B6wDdvZdmLaFE-vwPb8C2tv3U",
  authDomain: "react-blog-app-23841.firebaseapp.com",
  projectId: "react-blog-app-23841",
  storageBucket: "react-blog-app-23841.firebasestorage.app",
  messagingSenderId: "686979033824",
  appId: "1:686979033824:web:b56c203b34330988ebfe85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);