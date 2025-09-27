// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpanzjnYJf4LxpRMVcZw6oxPmsaQJmosw",
  authDomain: "bnb25-dbda6.firebaseapp.com",
  projectId: "bnb25-dbda6",
  storageBucket: "bnb25-dbda6.firebasestorage.app",
  messagingSenderId: "759756080657",
  appId: "1:759756080657:web:d0d5beb2bab9ffd23853b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);