import { DocumentReference } from "firebase/firestore"

export interface CreateCategoryProps {
    liga: string,
    setCategory: React.Dispatch<React.SetStateAction<{
        name?: string;
        teamsNumber?: number;
        teams?: TeamType[]
    } | undefined>>
    setSteps: React.Dispatch<React.SetStateAction<number>>
    category: {
        name?: string;
        teamsNumber?: number;
        teams?: TeamType[];
    } | undefined
}

export interface TeamType {
    matches: number
    points: number
    wins: number
    draws: number
    lost: number
    goalsAgainst: number
    goalsFor: number
    name: string
    image?: string
    yellowCard: number
    redCard: number
    blueCard: number
    absences: number
    players: PlayerType[]
}

export interface PlayerType {
    birth: string
    dni: number
    yellowCard: number
    redCard: number
    blueCard: number
    goals: number
    star: number
    name: string
    surname: string
    suspension: number
    totalSuspension: number
    team: DocumentReference
    matchs: DocumentReference[]
    division: DocumentReference[]
}

export interface CreateTeamComponentProps {
    liga: string
    setCategory: React.Dispatch<React.SetStateAction<{
        name?: string;
        teamsNumber?: number;
        teams?: TeamType[];
    } | undefined>>
    setSteps: React.Dispatch<React.SetStateAction<number>>
}