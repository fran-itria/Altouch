import { Stack, useLocalSearchParams } from 'expo-router';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { Screen } from '../../../components/Screen';
import { useEffect, useState } from 'react';
import { getMatchesPlay, getMatchNotPlay, match } from '../../../firebase/services';
import { matchNotPlay } from '../../../components/Matchs/MatchsNotPlay';
import FlatlistNotPlay from '../../../components/Matchs/FlatlistNotPlay';
import FlatlistPlay from '../../../components/Matchs/FlatlistPlay';
import { theme } from "../../../tailwind.config";

export default function Fixture() {
    const [matchs, setMatchs] = useState<[string, match[]][]>([])
    const { liga, division } = useLocalSearchParams() as { liga: string, division: string }
    useEffect(() => {
        (async () => {
            const matchsPlay: any = await getMatchesPlay(liga, division) as unknown as match[]
            const matchsNotPlay: any = await getMatchNotPlay(liga, division) as matchNotPlay[]
            const matchs: [] = matchsPlay.concat(matchsNotPlay)
            const group = Object.groupBy(matchs.reverse(), ({ match }) => match)
            setMatchs(Object.entries(group))
        })()
    }, [])

    return (
        <Screen background='#041433'>
            <Stack.Screen
                options={{
                    title: 'Fixture'
                }}
            />
            <ScrollView>
                {matchs.map(([match, matchs]: [string, match[]]) => {
                    return (
                        <View key={match} className='px-2 mt-10'>
                            <Text className={`font-bold text-white text-center bg-${[theme?.[liga].colors.tertiary]}`}>{match}</Text>
                            <FlatList
                                data={matchs}
                                keyExtractor={(item) => item.id || ''}
                                style={{ borderBottomEndRadius: 8, borderBottomStartRadius: 8 }}
                                renderItem={({ item }) => (
                                    !item.play ?
                                        <FlatlistNotPlay liga={liga} item={item as matchNotPlay} />
                                        :
                                        <FlatlistPlay liga={liga} division={division} item={item} />
                                )}
                            />
                        </View>
                    )
                })}
            </ScrollView>
        </Screen>
    )
}