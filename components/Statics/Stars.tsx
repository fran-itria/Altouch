import { FlatList, Image, Text, View } from "react-native";
import { theme } from "../../tailwind.config";

export default function Stars({ liga, playersStars }: {
    liga: string,
    playersStars?: {
        id: string;
        name: string;
        team: string;
        goals: number;
        star: number
    }[]
}) {
    return (
        <View className="px-2 mt-10">
            <View
                style={{ backgroundColor: theme?.[liga]?.colors?.secondary }}
                className='flex flex-row justify-between rounded-t-lg h-8 items-center'>
                <Text className="w-28 text-start pl-2 text-sm font-bold text-white">Jugador</Text>
                <Text className="w-36 text-center text-sm font-bold text-white">Equipo</Text>
                <Text className="w-24 text-center text-sm font-bold text-white">Cant</Text>
            </View>
            <FlatList
                data={playersStars}
                keyExtractor={(item) => item.id}
                style={{ borderBottomEndRadius: 8, borderBottomStartRadius: 8, backgroundColor: theme?.[liga]?.colors?.table }}
                renderItem={({ item, index }) => (
                    <View className={`${playersStars && playersStars.length - 1 > index ? 'border-b border-gray-700' : 'border-0'} flex flex-row items-center justify-between h-14 pl-2`}>
                        <View className="flex flex-row items-center">
                            <Text className='text-center color-white font-bold mr-4'> {index + 1} </Text>
                            <Text className="text-white text-sm font-bold text-start">{item.name}</Text>
                        </View>
                        <Text className="w-36 text-white text-sm font-bold text-center">{item.team}</Text>
                        <Text className="w-24 text-white text-sm font-bold text-center">{item.goals}</Text>
                    </View>
                )}
            />
        </View>
    )
}