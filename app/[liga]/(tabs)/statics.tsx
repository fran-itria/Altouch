import { Stack, useLocalSearchParams } from 'expo-router';
import { theme } from "../../../tailwind.config";
import useLigaName from '../../../hooks/useLigaName';
import { Screen } from '../../../components/Screen';
import SubNav from '../../../components/SubNav';
import { useEffect, useState } from 'react';
import { getFairPlayTeam, getPlayersStats, getPlayersSuspension, getTeams, player } from '../../../firebase/services';
import Loading from '../../../components/Loading';
import Goals from '../../../components/Statics/Goals';
import Defeated from '../../../components/Statics/Defeated';
import { View } from 'react-native';
import Stars from '../../../components/Statics/Stars';
import PlayersSuspension from '../../../components/Suspension';
import { Player } from './[division]';
import FairPlayTeams from '../../../components/Statics/FairPlayTeams';

export enum StaticsEnum {
    FAIRPLAY = 'Fair Play',
    DISCIPLINE = 'Discipline',
    GOALS = 'Goleadores',
    DEFEATED = 'V.M Vencida',
    STARS = 'Figuras'
}

export default function Statics() {
    const { liga } = useLigaName()
    const [active, setActiveStats] = useState<StaticsEnum>(StaticsEnum.DISCIPLINE)
    const { division } = useLocalSearchParams() as { division: string, liga: string }
    const [fairPlayTeam, setFairPlayTeam] = useState<{
        id: string,
        matches: number,
        name: string,
        image?: string,
        yellowCard: number,
        blueCard: number,
        redCard: number,
        absence: number
        pointsFairPlay: number
    }[]>()
    const [playersSuspension, setPlayersSuspension] = useState<Player[]>([])
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
            const suspension = await getPlayersSuspension(liga, division)
            const fairPlayTeam = await getFairPlayTeam(liga, division)
            setPlayers(players)
            setTeams(teams)
            setPlayersSuspension(suspension)
            setFairPlayTeam(fairPlayTeam)
            setLoading(false)
        })()
    }, [])
    return (
        <Screen background={theme?.[liga]?.colors?.primary}>
            <Stack.Screen
                options={{
                    headerTitle: loading ? '' : 'Estadísticas',
                }}
            />
            {loading ? <Loading /> :
                <View className={`${loading ? 'blur-md' : 'blur-none'}`}>
                    <SubNav liga={liga} active={active} setActiveStats={setActiveStats} />
                    {active == StaticsEnum.FAIRPLAY &&
                        <FairPlayTeams liga={liga} fairPlayTeam={fairPlayTeam ?? []} />
                    }
                    {active == StaticsEnum.DISCIPLINE &&
                        <PlayersSuspension liga={liga} playersSuspension={playersSuspension} />
                    }
                    {active == StaticsEnum.GOALS &&
                        <Goals liga={liga} goalsPlayers={players?.playersGoals} />
                    }
                    {active == StaticsEnum.DEFEATED &&
                        <Defeated liga={liga} teams={teams} />
                    }
                    {active == StaticsEnum.STARS &&
                        <Stars liga={liga} playersStars={players?.playersStar} />
                    }
                </View>
            }
        </Screen>
    )
}