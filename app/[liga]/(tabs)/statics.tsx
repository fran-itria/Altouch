import { Stack, useLocalSearchParams } from 'expo-router';
import { theme } from "../../../tailwind.config";
import useLigaName from '../../../hooks/useLigaName';
import { Screen } from '../../../components/Screen';
import StaticsNav from '../../../components/Statics/Nav';
import { useEffect, useState } from 'react';
import { getPlayersStats, getTeams } from '../../../firebase/services';
import Loading from '../../../components/Loading';
import Goals from '../../../components/Statics/Goals';
import Defeated from '../../../components/Statics/Defeated';
import { View } from 'react-native';
import Stars from '../../../components/Statics/Stars';

export enum StaticsEnum {
    GOALS = 'Goleadores',
    DEFEATED = 'V.M Vencida',
    STARS = 'Figuras'
}

export default function Statics() {
    const { liga } = useLigaName()
    const [activeStats, setActiveStats] = useState<StaticsEnum>(StaticsEnum.GOALS)
    const { division } = useLocalSearchParams() as { division: string, liga: string }
    const [players, setPlayers] = useState<{
        playersGoals: { id: string, name: string, team: string, goals: number, star: number }[],
        playersStar: { id: string, name: string, team: string, goals: number, star: number }[]
    }>()
    const [teams, setTeams] = useState<{ id: string, name: string, matches: number, goalsAgainst: number, image?: string }[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            const players = await getPlayersStats(liga, division)
            const teams = await getTeams(liga, division, true) as { id: string, name: string, matches: number, goalsAgainst: number, image?: string }[]
            setPlayers(players)
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
            <View className={`${loading ? 'blur-md' : 'blur-none'}`}>
                <StaticsNav liga={liga} activeStats={activeStats} setActiveStats={setActiveStats} />
                {activeStats == StaticsEnum.GOALS &&
                    <Goals liga={liga} goalsPlayers={players?.playersGoals} />
                }
                {activeStats == StaticsEnum.DEFEATED &&
                    <Defeated liga={liga} teams={teams} />
                }
                {activeStats == StaticsEnum.STARS &&
                    <Stars liga={liga} playersStars={players?.playersStar} />
                }
            </View>
        </Screen>
    )
}