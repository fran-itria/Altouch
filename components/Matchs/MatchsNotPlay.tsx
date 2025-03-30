import { FlatList, Image, Text, View } from "react-native";
import { theme } from "../../tailwind.config";
import { team } from "../../firebase/services";
import FlatlistNotPlay from "./FlatlistNotPlay";

export interface matchNotPlay {
    id: string
    day: { date: string, hour: string }
    teamsMatch: team[]
}

interface Props {
    liga: string
    division: string
    matchs: matchNotPlay[]
}

export default function MatchsNotPlay({ liga, division, matchs }: Props) {

    return (
        <View className='mt-10 px-2'>
            <View className={`rounded-t-lg flex flex-row justify-around bg-[${theme?.[liga].colors.tertiary}] p-2`}>
                <Text className='text-base text-center font-bold color-white'>Proximos partidos</Text>
            </View>
            <FlatList
                data={matchs}
                keyExtractor={(item) => item.id}
                style={{ borderBottomEndRadius: 8, borderBottomStartRadius: 8 }}
                renderItem={({ item, index }) => (
                    <FlatlistNotPlay liga={liga} item={item} length={matchs.length - 1} index={index} />
                )}
            />
        </View>
    )
}