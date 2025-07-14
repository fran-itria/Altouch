import { useLocalSearchParams } from 'expo-router';
import { Screen } from '../../../../components/Screen';
import { useEffect, useState } from 'react';
import { theme } from "../../../../tailwind.config";
import { getMatchesPlay, getMatchNotPlay, getPlayersSuspension, getTeams, team } from '../../../../firebase/services';
import Matchs from '../../../../components/Matchs/Matchs';
import MatchsNotPlay, { matchNotPlay } from '../../../../components/Matchs/MatchsNotPlay';
import Table from '../../../../components/Table';
import PlayersSuspension from '../../../../components/Suspension';
import useLigaName from '../../../../hooks/useLigaName';
import { View } from 'react-native';
import Loading from '../../../../components/Loading';

export interface Match {
    id?: string
    teamsMatch: team[]
    result: string
    match: string
    win: string
    day: { date: string, hour: string }
    play: boolean
}

export interface Player {
    id: string
    name: string
    team: string
    suspension: number
    totalSuspension: number
}

export default function About() {
    const { liga } = useLigaName();
    const { division }: { liga: string, division: string } = useLocalSearchParams();
    const [teams, setTeams] = useState<team[]>([]);
    const [matchs, setMatchs] = useState<Match[]>([]);
    const [matchsNotPlay, setMatchsNotPlay] = useState<matchNotPlay[]>([]);
    const [playersSuspension, setPlayersSuspension] = useState<Player[]>([])
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            const teamsResponse = await getTeams(liga, division);
            const matchsResponse = await getMatchesPlay(liga, division) as unknown as Match[];
            const matchsNotPlay = await getMatchNotPlay(liga, division) as matchNotPlay[];
            const players = await getPlayersSuspension(liga, division)
            setPlayersSuspension(players)
            setTeams(teamsResponse);
            setMatchs(matchsResponse);
            setMatchsNotPlay(matchsNotPlay);
            setLoading(false);
        })()
    }, [])

    return (
        <Screen background={theme?.[liga]?.colors?.primary}>
            {
                loading ?
                    <Loading />
                    :
                    <View className={`${loading ? 'blur-md' : 'blur-none'}`}>
                        <Table division={division} liga={liga} teams={teams} />
                        <MatchsNotPlay liga={liga} division={division} matchs={matchsNotPlay} />
                        <Matchs liga={liga} division={division} matchs={matchs} />
                        <PlayersSuspension liga={liga} playersSuspension={playersSuspension} />
                    </View>
            }
        </Screen>
    )
}