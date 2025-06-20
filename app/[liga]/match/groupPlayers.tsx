import { match } from "../../../firebase/services"

interface Props {
    match: match[]
    setTeam1: React.Dispatch<React.SetStateAction<{
        goals: {
            name: string;
            team: string;
        }[];
        yellowCards: {
            name: string;
            team: string;
        }[];
        blueCards: {
            name: string;
            team: string;
        }[];
        redCards: {
            name: string;
            team: string;
        }[];
    } | undefined>>
    setTeam2: React.Dispatch<React.SetStateAction<{
        name: string;
        team: string;
    }[][] | undefined>>
}

export default function groupPlayers({ match, setTeam1, setTeam2 }: Props) {
    let yellowCards: any
    let redCards: any
    let blueCard: any
    const goalsTeams = Object.groupBy((match[0].goalsMatch), ({ team }) => team)
    if (match[0].yellowCard) {
        yellowCards = Object.groupBy((match[0].yellowCard), ({ team }) => team)
    }
    if (match[0].redCard) {
        redCards = Object.groupBy((match[0].redCard), ({ team }) => team)
    }
    if (match[0].blueCard) {
        blueCard = Object.groupBy((match[0].blueCard), ({ team }) => team)
    }
    setTeam1((prev) => {
        return {
            ...prev,
            goals: goalsTeams[match[0].teamsMatch[0].name] ?? [],
            yellowCards: yellowCards?.[match[0].teamsMatch[0].name] ?? [],
            blueCards: blueCard?.[match[0].teamsMatch[0].name] ?? [],
            redCards: redCards?.[match[0].teamsMatch[0].name] ?? []
        }
    })
    setTeam2((prev = []) => [
        ...prev,
        goalsTeams[match[0].teamsMatch[1].name],
        yellowCards[match[0].teamsMatch[1].name],
        blueCard[match[0].teamsMatch[1].name],
        redCards[match[0].teamsMatch[1].name]
    ])
}