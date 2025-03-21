import { FlatList, Pressable, Switch, Text, View } from "react-native";
import { theme } from "../../tailwind.config";
import { getOneTeam, player, team, updateMatch } from "../../firebase/services";
import { useEffect, useState } from "react";
import { DocumentReference } from "firebase/firestore";


export interface matchNotPlay {
    id: string
    day: { date: string, hour: string }
    teamsMatch: team[]
}

interface Props {
    liga: string
    division: string
    matchs: matchNotPlay[]
}

export default function MatchsNotPlay({ liga, division, matchs }: Props) {
    const [playersTeam1, setPlayersTeam1] = useState<player[]>([])
    const [playersTeam2, setPlayersTeam2] = useState<player[]>([])
    const [playersOfMatch, setPlayersOfMatch] = useState<DocumentReference[]>([])

    return (
        <View className='mt-20 px-2'>
            <View className={`rounded-t-lg flex flex-row justify-around bg-[${theme?.[liga].colors.secondary}] p-2 border-b-2 border-b-black`}>
                <Text className='w-36 text-center font-bold color-white'>Proximos partidos</Text>
            </View>
            <FlatList
                data={matchs}
                keyExtractor={(item) => item.id}
                style={{ borderBottomEndRadius: 8, borderBottomStartRadius: 8 }}
                renderItem={({ item }) => (
                    <View
                        className={`p-2 w-full flex-column items-center bg-[${theme?.[liga].colors.table}]`}
                    >
                        <View className="w-full flex flex-row justify-between items-center">
                            <Text className='flex flex-col items-center color-white font-bold'>
                                {item.teamsMatch[0].name}
                            </Text>
                            <Pressable
                                className="flex flex-col items-center"
                                onPress={async () => {
                                    const playersTeam1 = await getOneTeam(liga, division, item.teamsMatch[0].name)
                                    const playersTeam2 = await getOneTeam(liga, division, item.teamsMatch[1].name)
                                    setPlayersTeam1(playersTeam1)
                                    setPlayersTeam2(playersTeam2)
                                }}
                            >
                                <Text className='color-white font-bold'>
                                    {item.day.date}
                                </Text>
                                <Text className='color-white font-bold text-center'>
                                    {item.day.hour} Hs
                                </Text>
                            </Pressable>
                            <Text className='flex flex-col items-center color-white font-bold'>
                                {item.teamsMatch[1].name}
                            </Text>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}