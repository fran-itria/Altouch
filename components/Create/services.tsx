import { addDoc, collection } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"
import { NextStepsProps, PlayerType, TeamType } from "../../types/CreateTypes"

// Component index create category
const nextStep = ({ category, setError, setSteps }: NextStepsProps) => {
    if (!category?.name) {
        setError((prev) => ({ ...prev, name: "El nombre de la categoría es obligatorio" }));
    } else {
        setError((prev) => ({ ...prev, name: undefined }));
    }
    if (!category?.teamsNumber) {
        setError((prev) => ({ ...prev, teamsNumber: "La cantidad de equipos es obligatoria" }));
    } else {
        setError((prev) => ({ ...prev, teamsNumber: undefined }));
    }
    if (category?.name && category?.teamsNumber) {
        setError(null);
        setSteps(1);
    }
}

// Component creeate category
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

// Component create player
const add = (
    setTeam: React.Dispatch<React.SetStateAction<TeamType>>,
    setTotalPlayers: React.Dispatch<React.SetStateAction<number>>,
    player: PlayerType,
    setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
    if (!player.birth || !player.dni || !player.name || !player.surname) {
        setError('Todos los campos son obligatorios');
    } else {
        setError(null);
        setTotalPlayers((prev) => prev + 1)
        setTeam((prev) => ({
            ...prev,
            players: [...prev.players, player]
        }))
    }
}

const edit = (
    setTeam: React.Dispatch<React.SetStateAction<TeamType>>,
    index: number,
    player: PlayerType
) => {
    setTeam((prev) => {
        const players = [...prev.players];
        players.splice(index, 1, player);
        return { ...prev, players };
    })
}

export {
    nextStep,
    createCategory,
    add,
    edit
}