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
        <View className='mt-20'>
            <View className={`flex flex-row justify-around bg-[${theme?.[liga].colors.secondary}] p-2 border-b-2 border-b-black`}>
                <Text className='w-36 text-center font-bold color-white'>Proximos partidos</Text>
            </View>
            <FlatList
                data={matchs}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View
                        className={`p-2 w-full flex-column items-center bg-[${theme?.[liga].colors.table}]`}
                    >
                        <View className="w-full flex flex-row justify-center items-center">
                            <View className="w-56 flex flex-col items-center">
                                <Text className='color-white font-bold'>
                                    {item.teamsMatch[0].name}
                                </Text>
                                {playersTeam1.map((player) => (
                                    <View className="w-32 flex flex-row justify-around">
                                        <Text key={player.id} className='color-white'>{player.name}</Text>
                                        <Switch
                                            trackColor={{ false: '#f87171', true: '#4ade80' }}
                                            thumbColor={'white'}
                                            ios_backgroundColor={'white'}
                                            onValueChange={() => {
                                                if (!playersOfMatch.find((team) => team === player.ref))
                                                    setPlayersOfMatch((prev) => { return [...prev, player.ref] })
                                                else
                                                    setPlayersOfMatch((prev) => prev.filter((team) => team !== player.ref))
                                            }}
                                            value={playersOfMatch.find((players) => players === player.ref) ? true : false}
                                        />
                                    </View>
                                ))}
                            </View>
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
                                    {item.day.hour}
                                </Text>
                            </Pressable>
                            <View className="w-56 flex flex-col items-center">
                                <Text className='color-white font-bold'>
                                    {item.teamsMatch[1].name}
                                </Text>
                                {playersTeam2.map((player) => (
                                    <View className="w-32 flex flex-row justify-around">
                                        <Text key={player.id} className='color-white'>{player.name}</Text>
                                        <Switch
                                            trackColor={{ false: '#f87171', true: '#4ade80' }}
                                            thumbColor={'white'}
                                            ios_backgroundColor={'white'}
                                            onValueChange={() => {
                                                if (!playersOfMatch.find((team) => team === player.ref))
                                                    setPlayersOfMatch((prev) => { return [...prev, player.ref] })
                                                else
                                                    setPlayersOfMatch((prev) => prev.filter((team) => team !== player.ref))
                                            }}
                                            value={playersOfMatch.find((players) => players === player.ref) ? true : false}
                                        />
                                    </View>
                                ))}
                            </View>
                        </View>
                        <Pressable
                            className="mt-3 w-fit bg-blue-200 p-2 rounded-full h-6 justify-center items-center"
                            onPress={async () => {
                                await updateMatch(liga, division, item.id, playersOfMatch)
                            }}
                        >
                            <Text className="font-bold"> Actualizar partido </Text>
                        </Pressable>
                    </View>
                )}
            />
        </View>
    )
}