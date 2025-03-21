import { FlatList, Text, View } from "react-native";
import { theme } from "../../tailwind.config";
import { match } from "../../firebase/services";

interface Props {
    liga: string
    matchs: match[]
}

export default function Matchs({ liga, matchs }: Props) {

    return (
        <View className='mt-20 px-2'>
            <View className={`rounded-t-lg flex flex-row justify-around bg-[${theme?.[liga].colors.secondary}] p-2 border-b-2 border-b-black`}>
                <Text className='w-36 text-center font-bold color-white'>Resultados anteriores</Text>
            </View>
            <FlatList
                data={matchs}
                keyExtractor={(item) => item.id ? item.id : item.result}
                style={{ borderBottomEndRadius: 8, borderBottomStartRadius: 8 }}
                renderItem={({ item }) => (
                    <View
                        className={`p-2 w-full flex-column items-center bg-[${theme?.[liga].colors.table}]`}
                    >
                        <View className="w-full flex flex-row justify-between n items-center">
                            <Text className='flex flex-col items-center color-white font-bold'>
                                {item.teamsMatch[0].name}
                            </Text>
                            <View className="flex flex-col items-center">
                                <Text className='color-black font-bold text-xs bg-white rounded-full px-2'>
                                    Finalizado
                                </Text>
                                <View className="w-full flex flex-row justify-between items-center mt-1">
                                    <Text className='color-white font-bold'>
                                        {item.result.split('-')[0]}
                                    </Text>
                                    <Text className='color-white font-bold'>
                                        {item.result.split('-')[1]}
                                    </Text>
                                </View>
                            </View>
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