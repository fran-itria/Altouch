import { addDoc, collection } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"


async function createCategory(liga: string, name?: string) {
    try {
        const ligaRef = collection(db, liga)
        await addDoc(ligaRef, {
            categoria: name,
        })
        return 200
    } catch (error) {
        console.error(error)
        return 500
    }
}

export {
    createCategory
}