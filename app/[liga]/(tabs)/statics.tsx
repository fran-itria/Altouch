import { Stack, useLocalSearchParams } from 'expo-router';
import { theme } from "../../../tailwind.config";
import useLigaName from '../../../hooks/useLigaName';
import { Screen } from '../../../components/Screen';
import StaticsNav from '../../../components/Statics/Nav';
import { useEffect, useState } from 'react';
import { getGoalsPlayers, getTeams } from '../../../firebase/services';
import Loading from '../../../components/Loading';
import Goals from '../../../components/Statics/Goals';
import Vmv from '../../../components/Statics/Vmv';

export enum StaticsEnum {
    GOLEADORES = 'Goleadores',
    VENCIDA = 'V.M Vencida',
    FIGURAS = 'Figuras'
}

export default function Statics() {
    const { liga } = useLigaName()
    const [activeStats, setActiveStats] = useState<StaticsEnum>(StaticsEnum.GOLEADORES)
    const { division } = useLocalSearchParams() as { division: string, liga: string }
    const [goalsPlayers, setGoalsPlayers] = useState<{ id: string, name: string, team: string, goals: number }[]>([])
    const [teams, setTeams] = useState<{ id: string, name: string, matches: number, goalsAgainst: number, image?: string }[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            const players = await getGoalsPlayers(liga, division)
            const teams = await getTeams(liga, division, true) as { id: string, name: string, matches: number, goalsAgainst: number, image?: string }[]
            setGoalsPlayers(players)
            setTeams(teams)
            setLoading(false)
        })()
    }, [])
    return (
        <Screen background={theme?.[liga]?.colors?.primary}>
            <Stack.Screen
                options={{
                    headerTitle: 'Estadísticas',
                }}
            />
            {loading && <Loading />}
            <StaticsNav liga={liga} activeStats={activeStats} setActiveStats={setActiveStats} />
            {activeStats == StaticsEnum.GOLEADORES &&
                <Goals liga={liga} goalsPlayers={goalsPlayers} />
            }
            {activeStats == StaticsEnum.VENCIDA &&
                <Vmv liga={liga} teams={teams} />
            }
        </Screen>
    )
}