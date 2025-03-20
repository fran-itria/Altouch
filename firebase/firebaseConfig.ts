import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC5uMgP2b6LfILEkXr2xKzYCxoIvpEWlyU",
    authDomain: "ligafutbol-be9c1.firebaseapp.com",
    projectId: "ligafutbol-be9c1",
    storageBucket: "ligafutbol-be9c1.firebasestorage.app",
    messagingSenderId: "101902094921",
    appId: "1:101902094921:web:695d5dee976a5be76e6598",
    measurementId: "G-S398K7K0ZQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

export { db }