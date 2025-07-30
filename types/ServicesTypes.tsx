import { DocumentReference } from "firebase/firestore";

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