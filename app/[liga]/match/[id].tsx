import { Stack, useLocalSearchParams } from "expo-router"
import { Screen } from "../../../components/Screen"
import { theme } from "../../../tailwind.config";
import { useEffect, useState } from "react";
import { getOneMatch, match } from "../../../firebase/services";
import groupPlayers from "./groupPlayers";
import StarPlayer from "../../../components/Matchs/DetailMatch/StarPlayer";
import DetailMatch from "../../../components/Matchs/DetailMatch/DetailMatch";
import useLigaName from "../../../hooks/useLigaName";


export default function Matchs() {
    const { liga } = useLigaName()
    const { id, division }: { id: string, division: string } = useLocalSearchParams()
    const [match, setMatch] = useState<match[]>()
    const [team1, setTeam1] = useState<{ name: string, team: string }[][]>()
    const [team2, setTeam2] = useState<{ name: string, team: string }[][]>()

    useEffect(() => {
        (async () => {
            const match = await getOneMatch(liga, division, id)
            groupPlayers({ match, setTeam1, setTeam2 })
            setMatch(match)
        })()
    }, [])

    return (
        <Screen background={theme?.[liga]?.colors?.primary || '#b91c1c'}>
            <Stack.Screen
                options={{
                    headerTitle: match ? match[0].match : 'Fecha',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontWeight: 'bold', color: 'white', fontSize: 25 },
                }}
            />
            <DetailMatch match={match} liga={liga} team1={team1} team2={team2} />
            <StarPlayer liga={liga} star={match && match[0].playerStar} />
        </Screen>
    )

}