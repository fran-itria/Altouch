import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


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

const firebaseStorageConfig = {
    apiKey: "AIzaSyDSY9yokSUBSblLDjgPMDmwPKHx7wBMP9g",
    authDomain: "gym-proyect-223a5.firebaseapp.com",
    projectId: "gym-proyect-223a5",
    storageBucket: "gym-proyect-223a5.appspot.com",
    messagingSenderId: "371664353649",
    appId: "1:371664353649:web:831c9dc5e2ce86495b5ed0"
};

const appStorage = initializeApp(firebaseStorageConfig, 'appStorage');
const storage = getStorage(appStorage)

export { db, storage }