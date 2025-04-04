import { FlatList, Image, Text, View } from "react-native";
import { theme } from "../../../tailwind.config";

interface Props {
    liga: string
    star?: { name: string, team: string, image: string }[]
}

export default function StarPlayer({ liga, star }: Props) {

    return (
        <View className="mt-10 px-2">
            <Text
                style={{ backgroundColor: theme?.[liga].colors.secondary }}
                className={`h-8 flex flex-row justify-center items-center text-white rounded-t-lg w-full text-center font-bold`}>Figura del partido</Text>
            <FlatList
                data={star}
                style={{ borderBottomEndRadius: 8, borderBottomStartRadius: 8 }}
                keyExtractor={(item: { name: string, team: string, image: string }) => item.name}
                renderItem={({ item }) => (
                    <View
                        style={{ backgroundColor: theme?.[liga].colors.table }}
                        className={`p-2 flex flex-row justify-around items-center`}>
                        <Image source={{ uri: item.image }} style={{ width: 50, height: 50 }} />
                        <View className="flex flex-col items-center">
                            <Text className="text-center text-white font-bold text-lg" >{item.name}</Text>
                            <Text className="text-center text-white font-bold" >{item.team}</Text>
                        </View>
                        <Image source={{ uri: item.image }} style={{ width: 50, height: 50 }} />
                    </View>
                )}
            />
        </View>
    )
}