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
                <Text className={`w-full rounded-t-lg text-center bg-[${theme?.[liga].colors.tertiary}] text-white font-bold text-base`} >Fecha de nacimineto</Text>
            </View>
            <FlatList
                data={Array(player)}
                keyExtractor={(item) => item?.name || ''}
                renderItem={(item) => <>
                    <View className="flex justify-center items-center">
                        <Text className={`h-8 flex items-center justify-center w-full rounded-b-lg bg-[${theme?.[liga].colors.table}] text-white text-base`} >{item.item?.birth.split('-').reverse().join('/')}</Text>
                    </View>
                </>}
            />
        </View>
    )
}