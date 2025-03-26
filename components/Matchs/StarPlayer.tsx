import { FlatList, Text, View } from "react-native";
import { theme } from "../../tailwind.config";

interface Props {
    liga: string
    star?: { name: string, team: string }[]
}

export default function StarPlayer({ liga, star }: Props) {

    return (
        <View className="mt-10 px-2">
            <View className="flex flex-row justify-center">
                <Text className={`p-1 text-base rounded-t-lg w-full text-center font-bold bg-[${theme?.[liga].colors.tertiary}]`}>Figura del partido</Text>
            </View>
            <FlatList
                data={star}
                style={{ borderBottomEndRadius: 8, borderBottomStartRadius: 8 }}
                keyExtractor={(item: { name: string, team: string }) => item.name}
                renderItem={({ item }) => (
                    <View className={`p-2 bg-[${theme?.[liga].colors.table}]`}>
                        <Text className="text-center text-white font-bold text-lg" >{item.name}</Text>
                        <Text className="text-center text-white font-bold text-xs" >{item.team}</Text>
                    </View>
                )}
            />
        </View>
    )
}