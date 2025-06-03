import { Link, Stack, useLocalSearchParams } from "expo-router";
import { FlatList, Text, View } from "react-native";
import { Screen } from "../../../components/Screen";
import { theme } from "../../../tailwind.config";
import { useEffect, useState } from "react";
import { getOneTeam, player } from "../../../firebase/services";
import useLigaName from "../../../hooks/useLigaName";
import Loading from "../../../components/Loading";

export default function Team() {
    const { liga } = useLigaName()
    const { division, team }: { team: string, division: string } = useLocalSearchParams();
    const [players, setPlayers] = useState<player[]>([]);
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        (async () => {
            const players = await getOneTeam(liga, division, team)
            setPlayers(players)
            setLoading(false)
        })()
    }, [])

    return (
        <Screen background={theme?.[liga]?.colors?.primary || '#b91c1c'}>
            <Stack.Screen
                options={{
                    headerTitle: `${team}`,
                    headerRight: undefined,
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontWeight: 'bold', color: theme?.[liga]?.colors?.text, fontSize: 25 },
                    headerStyle: { backgroundColor: theme?.[liga]?.colors?.primary },
                    headerTintColor: theme?.[liga]?.colors?.text,
                }}
            />
            <View className={`p-4 ${loading ? 'blur-md' : 'blur-none'}`}>
                <View
                    style={{ backgroundColor: theme?.[liga]?.colors?.secondary }}
                    className={`rounded-t-lg flex flex-row justify-around p-2`}>
                    <Text className='w-36 text-center font-bold color-white'>Jugadores</Text>
                </View>
                <View
                    style={{ backgroundColor: theme?.[liga]?.colors?.tertiary }}
                    className={`flex flex-row justify-around p-2`}>
                    <Text className='w-72 text-center font-bold color-white'>Nombre</Text>
                    <Text className='w-36 text-center font-bold color-[#FFF600]'>TA</Text>
                    <Text className='w-36 text-center font-bold color-[#0900FF]'>TA</Text>
                    <Text className='w-36 text-center font-bold color-[#FF0000]'>TR</Text>
                    <Text className='w-36 text-center font-bold color-white'>FIG</Text>
                    <Text className='w-36 text-center font-bold color-white'>GOL</Text>
                </View>
                <FlatList
                    data={players}
                    keyExtractor={(item) => item.id ? item.id : item.name}
                    style={{ borderBottomEndRadius: 8, borderBottomStartRadius: 8 }}
                    renderItem={({ item, index }) => (
                        <Link
                            style={{ backgroundColor: theme?.[liga]?.colors?.table }}
                            className={`${players.length - 1 > index ? 'border-b border-gray-700' : 'border-0'} flex flex-row justify-around p-2`}
                            href={{
                                pathname: '../player/[id]',
                                params: { liga, division, id: item.id, team }
                            }}
                            key={item.id}
                        >
                            <Text className='w-72 text-center color-white font-bold text-sm'>{item.name} {item.surname}</Text>
                            <Text className='w-36 text-center color-white font-bold text-sm'>{item.yellowCard}</Text>
                            <Text className='w-36 text-center color-white font-bold text-sm'>{item.blueCard}</Text>
                            <Text className='w-36 text-center color-white font-bold text-sm'>{item.redCard}</Text>
                            <Text className='w-36 text-center color-white font-bold text-sm'>{item.star}</Text>
                            <Text className='w-36 text-center color-white font-bold text-sm'>{item.goals}</Text>
                        </Link>
                    )}
                />
            </View>
            {loading && <Loading />}
        </Screen>
    )
}