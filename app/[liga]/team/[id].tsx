import { Link, Stack, useLocalSearchParams } from "expo-router";
import { FlatList, Text, View } from "react-native";
import { Screen } from "../../../components/Screen";
import { theme } from "../../../tailwind.config";
import { useEffect, useState } from "react";
import { getOneTeam, player } from "../../../firebase/services";

export default function Team() {
    const { liga, division, team }: { team: string, id: string, liga: string, division: string } = useLocalSearchParams();
    const [players, setPlayers] = useState<player[]>([]);

    useEffect(() => {
        (async () => {
            const players = await getOneTeam(liga, division, team)
            setPlayers(players)
        })()
    }, [])

    return (
        <Screen background={theme?.[liga]?.colors?.primary || '#b91c1c'}>
            <Stack.Screen
                options={{
                    headerTitle: `${team}`,
                    // headerLeft: undefined,
                    headerRight: undefined,
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontWeight: 'bold', color: 'white', fontSize: 25 },
                }}
            />
            {/* <Link href={{ pathname: '/player/[id]', params: { id: 1 } }}>
                <Text> Franco Itria </Text>
            </Link> */}
            <View className="p-4">
                <View className={`rounded-t-lg flex flex-row justify-around bg-[#1D7544] p-2 border-b-2 border-b-black`}>
                    <Text className='w-36 text-center font-bold color-white'>Jugadores</Text>
                </View>
                <View className={`flex flex-row justify-around bg-[${theme?.[liga].colors.secondary}] p-2 border-b-2 border-b-black`}>
                    <Text className='w-36 text-center font-bold color-white w-60'>Nombre</Text>
                    <Text className='w-36 text-center font-bold color-[#FFF600]'>TA</Text>
                    <Text className='w-36 text-center font-bold color-[#0900FF]'>TA</Text>
                    <Text className='w-36 text-center font-bold color-[#FF0000]'>TR</Text>
                    <Text className='w-36 text-center font-bold color-white'>FIG</Text>
                    <Text className='w-36 text-center font-bold color-white'>GOL</Text>
                </View>
                <FlatList
                    data={players}
                    keyExtractor={(item) => item.id ? item.id : item.name}
                    renderItem={({ item }) => (
                        <Link
                            className={`rounded-b-lg flex flex-row justify-around bg-[#1E1E1E] p-2`}
                            href={{
                                pathname: '/[liga]/team/[id]',
                                params: { liga, division, id: item.id, team: item.name }
                            }}
                            key={item.id}
                        >
                            <Text className='w-36 text-center color-white font-bold text-sm w-60'>{item.name} {item.surname}</Text>
                            <Text className='w-36 text-center color-white font-bold text-sm'>{item.yellowCard}</Text>
                            <Text className='w-36 text-center color-white font-bold text-sm'>{item.blueCard}</Text>
                            <Text className='w-36 text-center color-white font-bold text-sm'>{item.redCard}</Text>
                            <Text className='w-36 text-center color-white font-bold text-sm'>{item.star}</Text>
                            <Text className='w-36 text-center color-white font-bold text-sm'>{item.goals}</Text>
                        </Link>
                    )}
                />
            </View>
        </Screen>
    )
}