import { addDoc, collection, DocumentData, DocumentReference, DocumentSnapshot, getDoc, getDocs, orderBy, query, Timestamp, updateDoc, where } from "firebase/firestore";
import { db, storage } from "./firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const categoria = 'categoria'

export type team = {
    id?: string;
    image?: string;
    name: string;
    points: number;
    goalsFor: number;
    goalsAgainst: number;
    wins: number;
    draws: number;
    lost: number;
    matches: number;
    ref: DocumentReference
}

export type player = {
    id?: string
    ref: DocumentReference
    birth: Timestamp
    blueCard: number
    yellowCard: number
    redCard: number
    dni: number
    goals: number
    star: number
    name: string
    surname: string
    team: DocumentReference
}

export type match = {
    id?: string
    teamLoser: team
    teamWinner: team
    playerStar: player
    playersMatch: player[]
    teamsMatch: team[]
    goalsMatch: { name: string, team: string }[]
    result: string
    match: string
    day: string
}

async function getDivisions(liga: string) {
    const ligaRef = collection(db, liga);
    const divisionsOrder = query(ligaRef, orderBy(categoria));
    const divisions = await getDocs(divisionsOrder);
    return divisions.docs.map((doc) => {
        return { id: doc.id, categoria: doc.data().categoria }
    });
}

async function getTeams(liga: string, division: string): Promise<team[]> {
    const altouchRef = collection(db, liga);
    const q = query(altouchRef, where(categoria, "==", division));
    const querySnapshot = await getDocs(q);

    let teams: team[] = [];

    for (const doc of querySnapshot.docs) {
        const equiposRef = collection(doc.ref, 'equipos');
        const teamsOredr = query(equiposRef, orderBy('points', 'desc'));
        const equiposSnapshot = await getDocs(teamsOredr);

        for (const team of equiposSnapshot.docs) {
            teams.push({ id: team.id, ...team.data() as team, ref: team.ref })
        }
    }
    return teams
}

async function getOneTeam(liga: string, division: string, teamName: string) {
    const altouchRef = collection(db, liga);
    const q = query(altouchRef, where(categoria, "==", division));
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
                const playerData = player.data() as player;
                players.push({ id, ...playerData, ref: player.ref })
            }
        }
    }
    return players
}

async function getMatchesPlay(liga: string, division: string) {
    const ligaRef = await getDocs(query(collection(db, liga), where(categoria, '==', division)))
    let matchs = []

    const matchesRef = await getDocs(query(collection(ligaRef.docs[0].ref, 'matches'), where('play', '==', true)))
    for (const match of matchesRef.docs) {
        const { loser, win, star, players, teams, result, goles } = match.data()
        const teamLoser = await getDoc(loser)
        const teamWinner = await getDoc(win)
        const playerStar = await getDoc(star)

        let playersMatch = []
        let teamsMatch = []
        let goalsMatch = []
        for (const player of players) {
            const playerRef = await getDoc(player)
            playersMatch.push(playerRef.data())
        }
        for (const team of teams) {
            const teamRef = await getDoc(team)
            teamsMatch.push(teamRef.data())
        }
        for (const gol of goles) {
            const playerGol: DocumentSnapshot<any> = await getDoc(gol)
            const teamRef: DocumentSnapshot<team> = await getDoc(playerGol.data().team)
            goalsMatch.push({
                name: `${playerGol.data()?.name} ${playerGol.data()?.surname}`,
                team: teamRef.data()?.name
            });

        }

        matchs.push({
            id: match.id,
            teamLoser: teamLoser.data(),
            teamWinner: teamWinner.data(),
            playerStar: playerStar.data(),
            playersMatch,
            teamsMatch,
            goalsMatch,
            result,
            match: match.data().match
        })
    }
    return matchs
}

async function getMatchNotPlay(liga: string, division: string) {
    const ligaRef = await getDocs(query(collection(db, liga), where(categoria, '==', division)))
    let matchs = []

    const matchRef = await getDocs(query(collection(ligaRef.docs[0].ref, 'matches'), where('play', '==', false)))
    for (const match of matchRef.docs) {
        const { teams, day } = match.data()

        let teamsMatch = []

        for (const team of teams) {
            const teamRef = await getDoc(team)
            teamsMatch.push(teamRef.data())
        }

        const newDate = new Date(day)
        const date = `${newDate.getDate()} / ${newDate.getMonth() + 1}`
        const hour = `${newDate.getHours()}:${newDate.getMinutes() == 0 ? `${newDate.getMinutes()}0` : newDate.getMinutes()}`
        matchs.push({
            id: match.id,
            teamsMatch,
            match: match.data().match,
            day: { date, hour }
        })
    }
    return matchs
}

async function createMatch(liga: string, division: string, team1: string, team2: string) {
    const ligaRef = await getDocs(query(collection(db, liga), where(categoria, '==', division)))

    const team1ref = await getDocs(query(collection(ligaRef.docs[0].ref, 'equipos'), where('name', '==', team1)))
    const team2ref = await getDocs(query(collection(ligaRef.docs[0].ref, 'equipos'), where('name', '==', team2)))

    await addDoc(collection(ligaRef.docs[0].ref, 'matches'), {
        play: false,
        match: 'Fecha 1',
        day: '2025-03-30 22:00',
        teams: [
            team1ref.docs[0].ref,
            team2ref.docs[0].ref
        ]
    })
}

async function updateMatch(liga: string, division: string, id: string, players: DocumentReference[]) {
    const ligaRef = await getDocs(query(collection(db, liga), where(categoria, '==', division)))
    const matchRef = await getDocs(query(collection(ligaRef.docs[0].ref, 'matches'), where('play', '==', false)))
    const match = matchRef.docs.find((doc) => doc.id === id)

    if (match) {
        await updateDoc(match.ref, {
            play: true,
            players
        });
    }
}

async function updateTeam(teamName: string, teamRef: DocumentReference, file: string) {
    const image = await fetch(file)
    const blob = await image.blob()
    const storageRef = ref(storage, `Futbol/${teamName}`)
    await uploadBytes(storageRef, blob)
    const urlImage = await getDownloadURL(storageRef)
    await updateDoc(teamRef, {
        image: urlImage
    })
    console.log('Imagen cargada')
}

export {
    getDivisions,
    getTeams,
    getOneTeam,
    getMatchesPlay,
    getMatchNotPlay,
    createMatch,
    updateMatch,
    updateTeam
};