import { FlatList, Text, View } from "react-native";
import { theme } from "../../tailwind.config";

export default function Goals({ liga, goalsPlayers }: {
    liga: string
    goalsPlayers?: {
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
                className='flex flex-row justify-between rounded-t-lg h-8 items-center px-4'>
                <Text style={{ color: theme?.[liga]?.colors?.text }} className="font-bold text-base">Jugador</Text>
                <Text style={{ color: theme?.[liga]?.colors?.text }} className="font-bold text-base">Equipo</Text>
                <Text style={{ color: theme?.[liga]?.colors?.text }} className="font-bold text-base">Goles</Text>
            </View>
            <FlatList
                data={goalsPlayers}
                keyExtractor={(item) => item.id}
                style={{ borderBottomEndRadius: 8, borderBottomStartRadius: 8, backgroundColor: theme?.[liga]?.colors?.table }}
                renderItem={({ item, index }) => (
                    <View className={`${goalsPlayers && goalsPlayers.length - 1 > index ? 'border-b border-gray-700' : 'border-0'} flex flex-row items-center justify-between h-14 px-4`}>
                        <View className="flex flex-row items-center">
                            <Text style={{ color: theme?.[liga]?.colors?.text }} className='font-bold'> {index + 1}</Text>
                            <Text style={{ color: theme?.[liga]?.colors?.text }} className="font-bold ml-2">{item.name}</Text>
                        </View>
                        <Text style={{ color: theme?.[liga]?.colors?.text }} className="w-36 font-bold text-center ml-3">{item.team}</Text>
                        <Text style={{ color: theme?.[liga]?.colors?.text }} className="w-24 font-bold text-end px-4">{item.goals}</Text>
                    </View>
                )}
            />
        </View>
    )
}
