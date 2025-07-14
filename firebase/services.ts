import { addDoc, collection, DocumentData, DocumentReference, DocumentSnapshot, getDoc, getDocs, or, orderBy, query, QuerySnapshot, updateDoc, where } from "firebase/firestore";
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
    yellowCard: number;
    yellowPoints: number;
    blueCard: number;
    bluePoints: number;
    redCard: number;
    redPoints: number;
    absence: number;
    absencePoints: number;
    ref: DocumentReference
}

export type player = {
    id?: string
    ref: DocumentReference
    birth: string
    blueCard: number
    yellowCard: number
    redCard: number
    dni: number
    goals: number
    star: number
    name: string
    surname: string
    team: DocumentReference
    matchs: DocumentReference[]
}

export type match = {
    id?: string
    teamLoser: team
    teamWinner: team
    playerStar: { name: string, team: string, image: string }[]
    playersMatch: player[]
    teamsMatch: team[]
    goalsMatch: { name: string, team: string }[]
    result: string
    match: string
    day: { date: string, hour: string }
    yellowCard?: { name: string, team: string }[]
    blueCard?: { name: string, team: string }[]
    redCard?: { name: string, team: string }[]
    play?: boolean
}

export type detailPlayer = {
    player: {
        name: string
        birth: string
        goals: number
        yellowCard: number
        blueCard: number
        redCard: number
        star: number
    }
    matchs: {
        match: string
        rival: string
        goals: number,
        yellowCard: number,
        blueCard: number,
        redCard: number,
        star: number
    }[]
    teamImage: string
}

export interface getOneTeamResponse {
    players: {
        id?: string;
        ref: DocumentReference;
        birth: string;
        blueCard: number;
        yellowCard: number;
        redCard: number;
        dni: number;
        goals: number;
        star: number;
        name: string;
        surname: string;
        team: DocumentReference;
        matchs: DocumentReference[];
    }[]
    matchsHistory: ({
        id: string;
        teamsMatch: unknown[];
        win: string;
        result: string;
        match: string;
        day: {
            date: string;
            hour: string;
        };
        play: boolean;
    })[]
    matchsPending: ({
        id: string;
        teamsMatch: unknown[];
        match: string;
        day: {
            date: string;
            hour: string;
        };
        play: boolean;
    })[]
}

// GETS
async function getDivisions(liga: string) {
    const ligaRef = collection(db, liga);
    const divisionsOrder = query(ligaRef, orderBy(categoria));
    const divisions = await getDocs(divisionsOrder);
    return divisions.docs.map((doc) => {
        return { id: doc.id, categoria: doc.data().categoria }
    });
}

async function getTeams(liga: string, division: string, stats = false): Promise<team[]> {
    const altouchRef = collection(db, liga);
    const q = query(altouchRef, where(categoria, "==", division));
    const querySnapshot = await getDocs(q);

    let teams: team[] = [];

    for (const doc of querySnapshot.docs) {
        const equiposRef = collection(doc.ref, 'equipos');
        const teamsOredr = query(equiposRef, orderBy(
            !stats ? 'points' : 'goalsAgainst',
            !stats ? 'desc' : 'asc')
        );
        const equiposSnapshot = await getDocs(teamsOredr);

        for (const team of equiposSnapshot.docs) {
            teams.push({ id: team.id, ...team.data() as team, ref: team.ref })
        }
    }
    return teams
}

async function getOneTeam(liga: string, division: string, teamName: string): Promise<getOneTeamResponse> {
    const altouchRef = collection(db, liga);
    const q = query(altouchRef, where(categoria, "==", division));
    const querySnapshot = await getDocs(q);
    let players = []
    let matchsHistory: getOneTeamResponse["matchsHistory"] = []
    let matchsPending: getOneTeamResponse["matchsPending"] = []
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
            matchsHistory = await getMatchesPlay(liga, division, team.ref);
            matchsPending = await getMatchNotPlay(liga, division, team.ref);
        }
    }
    return {
        players,
        matchsHistory,
        matchsPending
    }
}

async function getMatchesPlay(liga: string, division: string, team?: DocumentReference<DocumentData, DocumentData>) {
    const ligaRef = await getDocs(query(collection(db, liga), where(categoria, '==', division)))
    let matchs = []
    let matchesRef: QuerySnapshot<DocumentData, DocumentData>
    if (!team) {
        matchesRef = await getDocs(query(collection(ligaRef.docs[0].ref, 'matches'), where('play', '==', true)))
    }
    else {
        matchesRef = await getDocs(query(
            collection(ligaRef.docs[0].ref, 'matches'),
            where('play', '==', true),
            where('teams', 'array-contains', team)
        ))
    }
    for (const match of matchesRef.docs) {
        const { teams, result, day, win } = match.data()
        const newDate = new Date(day)
        const date = `${newDate.getDate()} / ${newDate.getMonth() + 1}`
        const hour = `${newDate.getHours()}:${newDate.getMinutes() == 0 ? `${newDate.getMinutes()}0` : newDate.getMinutes()}`
        const teamWin = (await getDoc(win)).data() as team
        let teamsMatch = []
        for (const team of teams) {
            const teamRef = await getDoc(team)
            teamsMatch.push(teamRef.data())
        }
        matchs.push({
            id: match.id,
            teamsMatch,
            result,
            win: teamWin.name,
            match: match.data().match,
            day: { date, hour },
            play: match.data().play
        })
    }
    return matchs
}

async function getMatchNotPlay(liga: string, division: string, team?: DocumentReference<DocumentData, DocumentData>) {
    const ligaRef = await getDocs(query(collection(db, liga), where(categoria, '==', division)))
    let matchs = []
    let matchesRef: QuerySnapshot<DocumentData, DocumentData>
    if (!team) {
        matchesRef = await getDocs(query(collection(ligaRef.docs[0].ref, 'matches'), where('play', '==', false)))
    }
    else {
        matchesRef = await getDocs(query(
            collection(ligaRef.docs[0].ref, 'matches'),
            where('play', '==', false),
            where('teams', 'array-contains', team)
        ))
    }
    for (const match of matchesRef.docs) {
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
            play: match.data().play,
            day: { date, hour }
        })
    }
    return matchs
}

async function getOneMatch(liga: string, division: string, matchId: string): Promise<match[]> {
    const ligaRef = await getDocs(query(collection(db, liga), where(categoria, '==', division)))
    const matchRef = (await getDocs(collection(ligaRef.docs[0].ref, 'matches'))).docs.find((doc) => doc.id === matchId)
    let goals: { name: string, team: string }[] = []
    let yellowCard: { name: string, team: string }[] = []
    let blueCard: { name: string, team: string }[] = []
    let redCard: { name: string, team: string }[] = []
    let teams = []
    let star: { name: string, team: string, image: string }[] = []
    let winner
    let loser

    if (matchRef) {
        if (matchRef.data().teams)
            for (const team of matchRef.data().teams) {
                const teamRef = await getDoc(team)
                teams.push(teamRef.data())
            }

        if (matchRef.data().goles)
            for (const gol of matchRef.data().goles) {
                const playerGol: DocumentSnapshot<player> = await getDoc(gol)
                const teamRef = playerGol.data()?.team;
                if (teamRef) {
                    const team = await getDoc(teamRef);
                    goals.push({
                        name: `${playerGol.data()?.name} ${playerGol.data()?.surname}`,
                        team: team.data()?.name
                    });
                }
            }

        if (matchRef.data().yellowCard)
            for (const card of matchRef.data().yellowCard) {
                const playerCard: DocumentSnapshot<player> = await getDoc(card)
                const { name, surname, team } = playerCard.data() as player
                const teamRef = await getDoc(team);
                yellowCard.push({ name: `${name} ${surname}`, team: teamRef.data()?.name })
            }

        if (matchRef.data().blueCard)
            for (const card of matchRef.data().blueCard) {
                const playerCard: DocumentSnapshot<player> = await getDoc(card)
                const { name, surname, team } = playerCard.data() as player
                const teamRef = await getDoc(team);
                blueCard.push({ name: `${name} ${surname}`, team: teamRef.data()?.name })
            }

        if (matchRef.data().redCard)
            for (const card of matchRef.data().redCard) {
                const playerCard: DocumentSnapshot<player> = await getDoc(card)
                const { name, surname, team } = playerCard.data() as player
                const teamRef = await getDoc(team);
                redCard.push({ name: `${name} ${surname}`, team: teamRef.data()?.name })
            }

        const playerStar: DocumentSnapshot<player> = await getDoc(matchRef.data().star)
        const name = `${playerStar.data()?.name} ${playerStar.data()?.surname}`
        const teamRef = playerStar.data()?.team;
        if (teamRef) {
            const team = await getDoc(teamRef);
            star.push({ name, team: team.data()?.name, image: team.data()?.image })
        }
        winner = (await getDoc(matchRef.data().win)).data()
        loser = (await getDoc(matchRef.data().loser)).data()
    }

    const { day, result, id, match } = matchRef?.data() as match
    return [{
        id,
        day,
        result,
        match,
        teamsMatch: teams,
        goalsMatch: goals,
        playerStar: star,
        teamLoser: loser,
        teamWinner: winner,
        playersMatch: [],
        yellowCard,
        blueCard,
        redCard
    } as match];
}

async function getOnePlayer(liga: string, division: string, team: string, id: string): Promise<detailPlayer> {
    const ligaDoc = await getDocs(query(collection(db, liga), where(categoria, '==', division)))
    const teamDoc = await getDocs(query(collection(ligaDoc.docs[0].ref, 'equipos'), where('name', '==', team)))
    const playerDocs = await getDocs(query(collection(teamDoc.docs[0].ref, 'players')))
    const player = playerDocs.docs.find((doc) => doc.id === id)?.data() as player
    const playerName = `${player.name} ${player.surname}`
    const matchs: {
        match: string
        goals: number,
        yellowCard: number,
        blueCard: number,
        redCard: number,
        rival: string
        star: number
    }[] = []
    if (player.matchs)
        for (const match of player.matchs) {
            const matchDoc = await getOneMatch(liga, division, match.id)
            const goals = matchDoc[0].goalsMatch.filter((goal) => goal.name == playerName)
            const yellowCard = matchDoc[0].yellowCard?.filter((card) => card.name == playerName)
            const blueCard = matchDoc[0].blueCard?.filter((card) => card.name == playerName)
            const redCard = matchDoc[0].redCard?.filter((card) => card.name == playerName)
            const rival = matchDoc[0].teamsMatch.find((teamMatch) => teamMatch.name != team)?.name
            const star = matchDoc[0].playerStar[0].name == playerName
            matchs.push({
                match: matchDoc[0].match,
                goals: goals.length,
                yellowCard: yellowCard ? yellowCard.length : 0,
                blueCard: blueCard ? blueCard.length : 0,
                redCard: redCard ? redCard.length : 0,
                rival: rival ? rival : 'No se jugo',
                star: star ? 1 : 0
            })
        }

    return {
        player: {
            name: playerName,
            birth: player.birth,
            goals: player.goals,
            yellowCard: player.yellowCard,
            blueCard: player.blueCard,
            redCard: player.redCard,
            star: player.star
        },
        matchs,
        teamImage: teamDoc.docs[0].data().image
    }

}

async function getPlayersSuspension(liga: string, division: string) {
    const ligaDoc = await getDocs(query(collection(db, liga), where(categoria, '==', division)))
    const teamsDoc = await getDocs(query(collection(ligaDoc.docs[0].ref, 'equipos')))
    let players: { id: string, name: string, team: string, suspension: number, totalSuspension: number }[] = []
    for (const team of teamsDoc.docs) {
        const playersTeam = await getDocs(query(collection(team.ref, 'players'), where('totalSuspension', '>', 0)))
        for (const player of playersTeam.docs) {
            const { name, surname, team, suspension, totalSuspension } = player.data()
            const teamDoc: DocumentSnapshot<team> = await getDoc(team)
            players.push({
                id: player.id,
                name: `${name} ${surname}`,
                team: teamDoc?.data()?.name as string,
                suspension,
                totalSuspension
            })
        }
    }
    return players
}

async function getPlayersStats(liga: string, division: string): Promise<{
    playersGoals: { id: string, name: string, team: string, goals: number, star: number }[],
    playersStar: { id: string, name: string, team: string, goals: number, star: number }[]
}> {
    const ligaRef = await getDocs(query(collection(db, liga), where(categoria, '==', division)))
    const teamsRef = await getDocs(query(collection(ligaRef.docs[0].ref, 'equipos')))
    let players: { id: string, name: string, team: string, goals: number, star: number }[] = []
    for (const team of teamsRef.docs) {
        const playersRef = collection(team.ref, 'players')
        const playersTeam = await getDocs(query(playersRef, or(where('goals', '>', 0), where('star', '>', 0))))
        for (const player of playersTeam.docs) {
            const { name, surname, team, goals, star } = player.data()
            const teamDoc: DocumentSnapshot<team> = await getDoc(team)
            players.push({
                id: player.id,
                name: `${name} ${surname}`,
                team: teamDoc?.data()?.name as string,
                goals,
                star
            })
        }
    }
    const playersGoals = players.filter((player) => player.goals > 0).sort((a, b) => b.goals - a.goals);
    const playersStar = players.filter((player) => player.star > 0).sort((a, b) => b.star - a.star);
    return { playersGoals, playersStar };
}

async function getFairPlayTeam(liga: string, division: string): Promise<
    {
        id: string,
        matches: number,
        name: string,
        image?: string,
        yellowCard: number,
        blueCard: number,
        redCard: number,
        absence: number
        pointsFairPlay: number
    }[]
> {
    const ligaRef = await getDocs(query(collection(db, liga), where(categoria, '==', division)))
    const teamsRef = await getDocs(query(collection(ligaRef.docs[0].ref, 'equipos')))
    let teams: {
        id: string,
        matches: number,
        name: string,
        image?: string,
        yellowCard: number,
        blueCard: number,
        redCard: number,
        absence: number
        pointsFairPlay: number
    }[] = []
    for (const team of teamsRef.docs) {
        const teamData = team.data() as team
        const yellowCard = teamData.yellowCard;
        const blueCard = teamData.blueCard;
        const redCard = teamData.redCard;
        const absence = teamData.absence;
        const yellowPoints = teamData.yellowPoints;
        const bluePoints = teamData.bluePoints;
        const redPoints = teamData.redPoints;
        const absencePoints = teamData.absencePoints;
        const pointsFairPlay = (yellowCard * yellowPoints) + (blueCard * bluePoints) + (redCard * redPoints) + (absence * absencePoints);
        teams.push({
            id: team.id,
            matches: teamData.matches,
            name: teamData.name,
            image: teamData.image,
            yellowCard,
            blueCard,
            redCard,
            absence,
            pointsFairPlay
        })
    }
    return teams.sort((a, b) => a.pointsFairPlay - b.pointsFairPlay)
}

// POSTS
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

// PUTS
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

async function updateTeam(teamName: string, teamRef: DocumentReference, file: string, liga: string) {
    const image = await fetch(file)
    const blob = await image.blob()
    const storageRef = ref(storage, `Futbol/Escudos/${liga}/${teamName}`)
    await uploadBytes(storageRef, blob)
    const urlImage = await getDownloadURL(storageRef)
    await updateDoc(teamRef, {
        image: urlImage
    })
}

export {
    getDivisions,
    getTeams,
    getOneTeam,
    getMatchesPlay,
    getMatchNotPlay,
    createMatch,
    updateMatch,
    updateTeam,
    getOneMatch,
    getOnePlayer,
    getPlayersSuspension,
    getPlayersStats,
    getFairPlayTeam
};