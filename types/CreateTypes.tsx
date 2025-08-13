import { DocumentReference } from "firebase/firestore"

export interface NextStepsProps {
    category: {
        name?: string;
        teamsNumber?: number;
        teams?: TeamType[];
    } | undefined,
    setError: React.Dispatch<React.SetStateAction<{
        name?: string;
        teamsNumber?: string;
    } | null>>,
    setSteps: React.Dispatch<React.SetStateAction<number>>
}
export interface CreateCategoryProps {
    liga: string,
    setCategory: React.Dispatch<React.SetStateAction<{
        name?: string;
        teamsNumber?: number;
        teams?: TeamType[]
    } | undefined>>
    category: {
        name?: string;
        teamsNumber?: number;
        teams?: TeamType[];
    } | undefined
    error: {
        name?: string;
        teamsNumber?: string;
    } | null
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
    team?: DocumentReference
    matchs: DocumentReference[]
    division: DocumentReference[]
}

export interface CreateTeamComponentProps {
    teamNumber: number
    liga: string
    setCategory: React.Dispatch<React.SetStateAction<{
        name?: string;
        teamsNumber?: number;
        teams?: TeamType[];
    } | undefined>>
    setSteps: React.Dispatch<React.SetStateAction<number>>
    category: {
        name?: string;
        teamsNumber?: number;
        teams?: TeamType[];
    } | undefined
}

export interface ButtonsStepsProps {
    liga: string
    steps: number
    setSteps: React.Dispatch<React.SetStateAction<number>>
    setError: React.Dispatch<React.SetStateAction<{
        name?: string;
        teamsNumber?: string;
    } | null>>
    category: {
        name?: string;
        teamsNumber?: number;
        teams?: TeamType[];
    } | undefined
}

export interface CreatePlayerProps {
    index: number
    liga: string
    totalPlayers: number
    setTeam: React.Dispatch<React.SetStateAction<TeamType>>
    setTotalPlayers: React.Dispatch<React.SetStateAction<number>>
}