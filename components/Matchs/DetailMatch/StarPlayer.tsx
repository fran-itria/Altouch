import { FlatList, Image, Text, View } from "react-native";
import { theme } from "../../../tailwind.config";

interface Props {
    liga: string
    star?: { name: string, team: string, image: string }[]
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
                keyExtractor={(item: { name: string, team: string, image: string }) => item.name}
                renderItem={({ item }) => (
                    <View className={`p-2 bg-[${theme?.[liga].colors.table}] flex flex-row justify-around items-center`}>
                        <Image source={{ uri: item.image }} style={{ width: 50, height: 50 }} />
                        <View className="flex flex-col items-center">
                            <Text className="text-center text-white font-bold text-lg" >{item.name}</Text>
                            <Text className="text-center text-white font-bold text-xs" >{item.team}</Text>
                        </View>
                        <Image source={{ uri: item.image }} style={{ width: 50, height: 50 }} />
                    </View>
                )}
            />
        </View>
    )
}