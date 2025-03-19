import { collection, getDocs, orderBy, query, Timestamp, where } from "firebase/firestore";
import { db } from "./firebaseConfig";

export type team = {
    id?: string;
    name: string;
    points: number;
    goalsFor: number;
    goalsAgainst: number;
    wins: number;
    draws: number;
    lost: number;
    matches: number;
}

export type player = {
    id?: string
    birth: Timestamp
    blueCard: number
    yellowCard: number
    redCard: number
    dni: number
    goals: number
    star: number
    name: string
    surname: string
}

async function getDivisions(liga: string) {
    const ligaRef = collection(db, liga);
    const divisionsOrder = query(ligaRef, orderBy('categoria'));
    const divisions = await getDocs(divisionsOrder);
    return divisions.docs.map((doc) => {
        return { id: doc.id, categoria: doc.data().categoria }
    });
}

async function getTeams(liga: string, division: string): Promise<team[]> {
    const altouchRef = collection(db, liga);
    const q = query(altouchRef, where("categoria", "==", division));
    const querySnapshot = await getDocs(q);

    let teams: team[] = [];

    for (const doc of querySnapshot.docs) {
        const equiposRef = collection(doc.ref, 'equipos');
        const teamsOredr = query(equiposRef, orderBy('points', 'desc'));
        const equiposSnapshot = await getDocs(teamsOredr);

        for (const team of equiposSnapshot.docs) {
            const { draws, goalsAgainst, goalsFor, lost, name, points, wins, matches } = team.data() as team;
            teams.push({ id: team.id, draws, goalsAgainst, goalsFor, lost, name, points, wins, matches })
        }
    }
    return teams
}

async function getOneTeam(liga: string, division: string, id: string, teamName: string) {
    // ID EQUIPO: fukbAcnVmtE78V1wtlWg
    console.log(liga, division, id)
    const altouchRef = collection(db, liga);
    const q = query(altouchRef, where("categoria", "==", division));
    const querySnapshot = await getDocs(q);

    let players = []
    for (const doc of querySnapshot.docs) {
        const equiposRef = collection(doc.ref, 'equipos');
        const team = query(equiposRef, where('name', '==', teamName));
        const teamSnapshot = await getDocs(team);
        for (const team of teamSnapshot.docs) {
            const playersRef = query(collection(team.ref, 'players'), orderBy('surname', "asc"));
            const playersSnapshot = await getDocs(playersRef);
            for (const player of playersSnapshot.docs) {
                const id = player.id
                players.push({ id, ...player.data() as player })
            }
        }
    }
    return players
}

export { getDivisions, getTeams, getOneTeam };