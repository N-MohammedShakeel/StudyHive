// frontend/src/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqyeMWKAjQj0seEk8o8CPcX0xXbO7bCao",
  authDomain: "studyhive-e7e89.firebaseapp.com",
  projectId: "studyhive-e7e89",
  storageBucket: "studyhive-e7e89.firebasestorage.app",
  messagingSenderId: "652326553724",
  appId: "1:652326553724:web:91369159078ea4b1aee1f9",
  measurementId: "G-5D6RW6ZMVJ",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
