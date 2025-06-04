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
        <Screen background={theme?.[liga]?.colors?.primary}>
            <Stack.Screen
                options={{
                    headerTitle: `${team ? team : 'Equipo'}`,
                    headerRight: undefined,
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontWeight: 'bold', color: theme?.[liga]?.colors?.text, fontSize: 25 },
                    headerStyle: { backgroundColor: theme?.[liga]?.colors?.primary },
                    headerTintColor: theme?.[liga]?.colors?.text,
                }}
            />
            {loading ?
                <Loading />
                :
                <View className={`p-4 ${loading ? 'blur-md' : 'blur-none'}`}>
                    <View
                        style={{ backgroundColor: theme?.[liga]?.colors?.secondary }}
                        className={`rounded-t-lg flex flex-row justify-around p-2`}>
                        <Text
                            style={{ color: theme?.[liga]?.colors?.text }}
                            className='w-36 text-center font-bold text-base'>
                            Jugadores/as
                        </Text>
                    </View>
                    <View
                        style={{ backgroundColor: theme?.[liga].colors.tertiary }}
                        className={`h-8 flex flex-row justify-between items-center px-4`}>
                        <View>
                            <Text
                                style={{ color: theme?.[liga]?.colors?.text }}
                                className={`text-center text-white font-bold`}>
                                Nombre
                            </Text>
                        </View>
                        <View className="flex-row justify-around">
                            <Text className={`w-10 text-center color-[#FFF600] font-bold`}>TA</Text>
                            <Text className={`w-10 text-center color-[#0900FF] font-bold`}>TA</Text>
                            <Text className={`w-10 text-center color-[#FF0000] font-bold`}>TR</Text>
                            <Text
                                style={{ color: theme?.[liga]?.colors?.text }}
                                className={`w-10 text-center font-bold`}>
                                FIG
                            </Text>
                            <Text
                                style={{ color: theme?.[liga]?.colors?.text }}
                                className={`w-10 text-center font-bold`}>
                                GOL
                            </Text>
                        </View>
                    </View>
                    <FlatList
                        data={players}
                        keyExtractor={(item) => item.id ? item.id : item.name}
                        style={{ borderBottomEndRadius: 8, borderBottomStartRadius: 8 }}
                        renderItem={({ item, index }) => (
                            <Link
                                style={{ backgroundColor: theme?.[liga]?.colors?.table }}
                                className={`${players.length - 1 > index ? 'border-b border-gray-700' : 'border-0'} px-4 flex flex-row justify-between items-center h-12`}
                                href={{
                                    pathname: '../player/[id]',
                                    params: { liga, division, id: item.id, team }
                                }}
                                key={item.id}
                            >
                                <Text
                                    style={{ color: theme?.[liga]?.colors?.text }}
                                    className='text-center font-bold'>
                                    {item.name} {item.surname}
                                </Text>
                                <View className="flex-row justify-around">
                                    <Text
                                        style={{ color: theme?.[liga]?.colors?.text }}
                                        className="w-10 text-center font-bold text-base">
                                        {item.yellowCard}
                                    </Text>
                                    <Text
                                        style={{ color: theme?.[liga]?.colors?.text }}
                                        className="w-10 text-center font-bold text-base">
                                        {item.blueCard}
                                    </Text>
                                    <Text
                                        style={{ color: theme?.[liga]?.colors?.text }}
                                        className="w-10 text-center font-bold text-base">
                                        {item.redCard}
                                    </Text>
                                    <Text
                                        style={{ color: theme?.[liga]?.colors?.text }}
                                        className="w-10 text-center font-bold text-base">
                                        {item.star}
                                    </Text>
                                    <Text
                                        style={{ color: theme?.[liga]?.colors?.text }}
                                        className="w-10 text-center font-bold text-base">
                                        {item.goals}
                                    </Text>
                                </View>
                            </Link>
                        )}
                    />
                </View>
            }
        </Screen>
    )
}