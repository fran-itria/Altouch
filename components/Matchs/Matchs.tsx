import { FlatList, Text, View } from "react-native";
import { theme } from "../../tailwind.config";
import { match } from "../../firebase/services";

interface Props {
    liga: string
    matchs: match[]
}

export default function Matchs({ liga, matchs }: Props) {

    return (
        <View className='mt-20'>
            <View className={`flex flex-row justify-around bg-[${theme?.[liga].colors.secondary}] p-2 border-b-2 border-b-black`}>
                <Text className='w-36 text-center font-bold color-white'>Resultados anteriores</Text>
            </View>
            <FlatList
                data={matchs}
                keyExtractor={(item) => item.id ? item.id : item.result}
                renderItem={({ item }) => (
                    <View
                        className={`flex-row justify-center bg-[${theme?.[liga].colors.table}] p-2`}
                    >
                        <View className='w-1/4 flex flex-row justify-around items-center'>
                            <View>
                                <Text className='color-white font-bold'>
                                    {item.teamsMatch[0].name}
                                </Text>
                                {/* {
                                    item.teamsMatch[0].name == item.goalsMatch[0].team &&
                                    <Text className='color-white font-bold'>
                                        ⚽{item.goalsMatch[0].name}({item.goalsMatch.filter(player => player.name == item.goalsMatch[0].name).length})
                                    </Text>
                                } */}
                            </View>
                            <View className="flex flex-col items-center">
                                <Text className='color-white font-bold'>
                                    Finalizado
                                </Text>
                                <Text className='color-white font-bold'>
                                    {item.result}
                                </Text>
                            </View>
                            <View>
                                <Text className='color-white font-bold'>
                                    {item.teamsMatch[1].name}
                                </Text>
                                {/* {
                                    item.teamsMatch[1].name == item.goalsMatch[3].team &&
                                    <Text className='color-white font-bold'>
                                        ⚽{item.goalsMatch[3].name}({item.goalsMatch.filter(player => player.name == item.goalsMatch[3].name).length})
                                    </Text>
                                } */}
                            </View>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}