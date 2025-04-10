import { View, Text, FlatList } from "react-native";
import { theme } from "../../tailwind.config";

interface player {
    name: string
    birth: string
    goals: number
    yellowCard: number
    blueCard: number
    redCard: number
    star: number
}

export default function Birth({ liga, player }: { liga: string, player: player }) {
    return (
        <View className="px-2">
            <View className="flex justify-center items-center mt-5">
                <Text
                    style={{ backgroundColor: theme?.[liga]?.colors?.secondary }}
                    className={`h-8 w-full rounded-t-lg flex justify-center items-center text-white font-bold text-base`} >Fecha de nacimineto</Text>
            </View>
            <FlatList
                data={Array(player)}
                keyExtractor={(item) => item?.name || ''}
                renderItem={(item) => <>
                    <View className="flex justify-center items-center">
                        <Text
                            style={{ backgroundColor: theme?.[liga]?.colors?.table }}
                            className={`h-8 flex items-center justify-center w-full rounded-b-lg text-white text-base`} >{item.item?.birth.split('-').reverse().join('/')}</Text>
                    </View>
                </>}
            />
        </View>
    )
}