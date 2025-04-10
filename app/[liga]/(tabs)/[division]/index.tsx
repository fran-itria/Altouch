import { useLocalSearchParams } from 'expo-router';
import { Screen } from '../../../../components/Screen';
import { useEffect, useState } from 'react';
import { theme } from "../../../../tailwind.config";
import { getMatchesPlay, getMatchNotPlay, getTeams, match, team } from '../../../../firebase/services';
import Matchs from '../../../../components/Matchs/Matchs';
import MatchsNotPlay, { matchNotPlay } from '../../../../components/Matchs/MatchsNotPlay';
import Table from '../../../../components/Table';
import PlayersSuspension from '../../../../components/Suspension';
import useLigaName from '../../../../hooks/useLigaName';
import { View } from 'react-native';
import Loading from '../../../../components/Loading';

export default function About() {
    const { liga } = useLigaName();
    const { division }: { liga: string, division: string } = useLocalSearchParams();
    const [teams, setTeams] = useState<team[]>([]);
    const [matchs, setMatchs] = useState<match[]>([]);
    const [matchsNotPlay, setMatchsNotPlay] = useState<matchNotPlay[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            const teamsResponse = await getTeams(liga, division);
            const matchsResponse = await getMatchesPlay(liga, division) as unknown as match[];
            const matchsNotPlay = await getMatchNotPlay(liga, division) as matchNotPlay[];
            setTeams(teamsResponse);
            setMatchs(matchsResponse);
            setMatchsNotPlay(matchsNotPlay);
            setLoading(false);
        })()
    }, [])

    return (
        <Screen background={theme?.[liga]?.colors?.primary || '#b91c1c'}>
            <View className={`${loading ? 'blur-md' : 'blur-none'}`}>
                <Table division={division} liga={liga} teams={teams} />
                <MatchsNotPlay liga={liga} division={division} matchs={matchsNotPlay} />
                <Matchs liga={liga} division={division} matchs={matchs} />
                <PlayersSuspension division={division} liga={liga} />
            </View>
            {
                loading &&
                <Loading />
            }
        </Screen>
    )
}