import { FlatList, Image, Text, View } from "react-native";
import { theme } from "../../tailwind.config";

export default function Defeated({ liga, teams }: {
    liga: string, teams: {
        id: string;
        name: string;
        matches: number;
        goalsAgainst: number;
        image?: string;
    }[]
}) {
    return (
        <View className="px-2 mt-10">
            <View
                style={{ backgroundColor: theme?.[liga]?.colors?.secondary }}
                className='flex flex-row justify-between rounded-t-lg h-8 items-center px-2'>
                <Text className="w-28 text-start text-sm font-bold text-white">Equipo</Text>
                <View className="flex flex-row justify-between">
                    <Text className="w-12 text-center text-sm font-bold text-white">J</Text>
                    <Text className="w-12 text-center text-sm font-bold text-white">Goles</Text>
                </View>
            </View>
            <FlatList
                data={teams}
                keyExtractor={(item) => item.id}
                style={{ borderBottomEndRadius: 8, borderBottomStartRadius: 8, backgroundColor: theme?.[liga]?.colors?.table }}
                renderItem={({ item, index }) => (
                    <View className={`${teams.length - 1 > index ? 'border-b border-gray-500' : 'border-0'} flex flex-row items-center justify-between h-14 px-2`}>
                        <View className="w-28 flex flex-row items-center justify-between">
                            <Text className='text-center color-white font-bold mr-4'>
                                {index + 1}
                            </Text>
                            {item.image &&
                                <Image
                                    source={{ uri: item.image }}
                                    style={{ width: 30, height: 30 }}
                                />
                            }
                            {!item.name.includes(' ') ?
                                <Text className={`${item.image ? 'ml-4' : 'ml-0'} text-center color-white font-bold`}>{item.name}</Text>
                                :
                                <View className="ml-4">
                                    <Text className='text-center color-white font-bold'>{item.name.split(' ')[0]}</Text>
                                    <Text className='text-center color-white font-bold'>{item.name.split(' ')[1]}</Text>
                                </View>
                            }
                        </View>
                        <View className="flex flex-row justify-between">
                            <Text className="w-12 text-white text-sm font-bold text-center">{item.matches}</Text>
                            <Text className="w-12 text-white text-sm font-bold text-center">{item.goalsAgainst}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}