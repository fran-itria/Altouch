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
        <View className='mt-10 px-2'>
            <View
                style={{ backgroundColor: theme?.[liga].colors.secondary }}
                className={`rounded-t-lg flex flex-row justify-around p-2`}>
                <Text className='text-base text-center font-bold color-white'>Resultados anteriores</Text>
            </View>
            <FlatList
                data={matchs}
                keyExtractor={(item) => item.id ? item.id : item.result}
                style={{ borderBottomEndRadius: 8, borderBottomStartRadius: 8 }}
                renderItem={({ item, index }) => (
                    <FlatlistPlay liga={liga} division={division} item={item} index={index} length={matchs.length - 1} />
                )}
            />
        </View>
    )
}