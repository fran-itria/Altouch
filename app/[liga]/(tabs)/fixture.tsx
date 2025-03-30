import { Stack, useLocalSearchParams } from 'expo-router';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { Screen } from '../../../components/Screen';
import { useEffect, useState } from 'react';
import { getMatchesPlay, getMatchNotPlay, match } from '../../../firebase/services';
import { matchNotPlay } from '../../../components/Matchs/MatchsNotPlay';
import FlatlistNotPlay from '../../../components/Matchs/FlatlistNotPlay';
import FlatlistPlay from '../../../components/Matchs/FlatlistPlay';
import { theme } from "../../../tailwind.config";
import useLigaName from '../../../hooks/useLigaName';

export default function Fixture() {
    const { liga } = useLigaName()
    const { division } = useLocalSearchParams() as { division: string }
    const [matchs, setMatchs] = useState<[string, match[]][]>([])
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
            <View>
                {matchs.map(([match, matchs]: [string, match[]], index) => {
                    return (
                        <View key={match} className={`px-2 ${index == 0 ? 'mt-0' : 'mt-8'}`}>
                            <Text className={`rounded-t-lg h-8 flex justify-center items-center font-bold text-white text-center bg-[${[theme?.[liga]?.colors?.tertiary]}]`}>{match}</Text>
                            <FlatList
                                data={matchs}
                                keyExtractor={(item) => item.id || ''}
                                style={{ borderBottomEndRadius: 8, borderBottomStartRadius: 8 }}
                                renderItem={({ item, index }) => (
                                    !item.play ?
                                        <FlatlistNotPlay liga={liga} item={item as matchNotPlay} index={index} length={matchs.length - 1} />
                                        :
                                        <FlatlistPlay liga={liga} division={division} item={item} index={index} length={matchs.length - 1} />
                                )}
                            />
                        </View>
                    )
                })}
            </View>
        </Screen>
    )
}