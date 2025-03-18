import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import 'dotenv'

const {
    FIREBASEKEY,
    FIREBASEDOMAIN,
    FIREBASEID,
    FIREBASESTORAGEBUCKET,
    FIREBASEmessagingSenderId,
    FIREBASEAPPID,
    FIREBASEmeasurementId
} = process.env
const firebaseConfig = {
    apiKey: "AIzaSyC5uMgP2b6LfILEkXr2xKzYCxoIvpEWlyU",
    authDomain: "ligafutbol-be9c1.firebaseapp.com",
    projectId: "ligafutbol-be9c1",
    storageBucket: "ligafutbol-be9c1.firebasestorage.app",
    messagingSenderId: "101902094921",
    appId: "1:101902094921:web:695d5dee976a5be76e6598",
    measurementId: "G-S398K7K0ZQ"
};

// apiKey: "AIzaSyC5uMgP2b6LfILEkXr2xKzYCxoIvpEWlyU",
// authDomain: "ligafutbol-be9c1.firebaseapp.com",
// projectId: "ligafutbol-be9c1",
// storageBucket: "ligafutbol-be9c1.firebasestorage.app",
// messagingSenderId: "101902094921",
// appId: "1:101902094921:web:695d5dee976a5be76e6598",
// measurementId: "G-S398K7K0ZQ"

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getCollection(liga: string, division: string) {
    const altouchRef = collection(db, liga);
    const q = query(altouchRef, where("categoria", "==", division));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
        console.log(doc.data());
        // Acceder a la subcolección 'equipos' del documento
        const equiposRef = collection(doc.ref, 'equipos');
        const equiposSnapshot = await getDocs(equiposRef);

        equiposSnapshot.forEach((equipoDoc) => {
            console.log(equipoDoc.data());
        });
    });
}
// const analytics = getAnalytics(app);

export { db, getCollection }