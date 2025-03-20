import { Link, useLocalSearchParams } from 'expo-router';
import { FlatList, Pressable, Text, View } from 'react-native';
import { Screen } from '../../../../components/Screen';
import { useEffect, useState } from 'react';
import { theme } from "../../../../tailwind.config";
import { getMatchesPlay, getMatchNotPlay, getTeams, match, team } from '../../../../firebase/services';
import Matchs from '../../../../components/Matchs/Matchs';
import MatchsNotPlay, { matchNotPlay } from '../../../../components/Matchs/MatchsNotPlay';

export default function About() {
    const { liga, division }: { liga: string, division: string } = useLocalSearchParams();
    const [teams, setTeams] = useState<team[]>([]);
    const [matchs, setMatchs] = useState<match[]>([]);
    const [matchsNotPlay, setMatchsNotPlay] = useState<matchNotPlay[]>([]);

    useEffect(() => {
        (async () => {
            const teamsResponse = await getTeams(liga, division);
            const matchsResponse = await getMatchesPlay(liga, division) as match[];
            const matchsNotPlay = await getMatchNotPlay(liga, division) as matchNotPlay[];
            setTeams(teamsResponse);
            setMatchs(matchsResponse);
            setMatchsNotPlay(matchsNotPlay);
        })()
    }, [])

    return (
        <Screen background={theme?.[liga]?.colors?.primary || '#b91c1c'}>
            <View>
                <View className={`flex flex-row justify-around bg-[${theme?.[liga].colors.secondary}] p-2 border-b-2 border-b-black`}>
                    <Text className='w-36 text-center font-bold color-white'>Equipo</Text>
                    <Text className='w-36 text-center font-bold color-white'>J</Text>
                    <Text className='w-36 text-center font-bold color-white'>G</Text>
                    <Text className='w-36 text-center font-bold color-white'>P</Text>
                    <Text className='w-36 text-center font-bold color-white'>E</Text>
                    <Text className='w-36 text-center font-bold color-white'>GF</Text>
                    <Text className='w-36 text-center font-bold color-white'>GE</Text>
                    <Text className='w-36 text-center font-bold color-white'>DG</Text>
                    <Text className='w-36 text-center font-bold color-white'>PTS</Text>
                </View>
                <FlatList
                    data={teams}
                    keyExtractor={(item) => item.id ? item.id : item.name}
                    renderItem={({ item }) => (
                        <Link
                            className={`flex flex-row justify-around bg-[${theme?.[liga].colors.tertiary}] p-2`}
                            href={{
                                pathname: '/[liga]/team/[id]',
                                params: { liga, division, id: item.id, team: item.name }
                            }}
                            key={item.id}
                        >
                            <Text className='w-36 text-center'>{item.name}</Text>
                            <Text className='w-36 text-center'>{item.matches}</Text>
                            <Text className='w-36 text-center'>{item.wins}</Text>
                            <Text className='w-36 text-center'>{item.lost}</Text>
                            <Text className='w-36 text-center'>{item.draws}</Text>
                            <Text className='w-36 text-center'>{item.goalsFor}</Text>
                            <Text className='w-36 text-center'>{item.goalsAgainst}</Text>
                            <Text className='w-36 text-center'>{item.goalsFor - item.goalsAgainst}</Text>
                            <Text className='w-36 text-center'>{item.points}</Text>
                        </Link>
                    )}
                />
            </View>
            <MatchsNotPlay liga={liga} division={division} matchs={matchsNotPlay} />
            <Matchs liga={liga} matchs={matchs} />
        </Screen>
    )
}