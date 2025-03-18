import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "./firebaseConfig";

async function getDivisions(liga: string) {
    const ligaRef = collection(db, liga);
    const divisionsOrder = query(ligaRef, orderBy('categoria'));
    const divisions = await getDocs(divisionsOrder);
    return divisions.docs.map((doc) => doc.data());
}

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

export { getDivisions, getCollection };