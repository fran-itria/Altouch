import { FlatList, Text, View } from "react-native";
import { theme } from "../../tailwind.config";
import { team } from "../../firebase/services";


export interface matchNotPlay {
    id: string
    day: { date: string, hour: string }
    teamsMatch: team[]
}

interface Props {
    liga: string
    matchs: matchNotPlay[]
}

export default function MatchsNotPlay({ liga, matchs }: Props) {
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
                        className={`flex-row justify-center bg-[${theme?.[liga].colors.table}] p-2`}
                    >
                        <View className='w-1/4 flex flex-row justify-around items-center'>
                            <View>
                                <Text className='color-white font-bold'>
                                    {item.teamsMatch[0].name}
                                </Text>

                            </View>
                            <View className="flex flex-col">
                                <Text className='color-white font-bold'>
                                    {item.day.date}
                                </Text>
                                <Text className='color-white font-bold text-center'>
                                    {item.day.hour}
                                </Text>
                            </View>
                            <View>
                                <Text className='color-white font-bold'>
                                    {item.teamsMatch[1].name}
                                </Text>
                            </View>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}