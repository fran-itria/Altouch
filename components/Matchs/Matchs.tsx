import { FlatList, Image, Text, View } from "react-native";
import { theme } from "../../tailwind.config";
import { match } from "../../firebase/services";
import FlatlistPlay from "./FlatlistPlay";

interface Props {
    liga: string
    matchs: match[]
    division: string
}

export default function Matchs({ liga, matchs, division }: Props) {
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
                    <FlatlistPlay liga={liga} division={division} item={item} />
                )}
            />
        </View>
    )
}