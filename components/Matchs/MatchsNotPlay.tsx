import { FlatList, Text, View } from "react-native";
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
    pending?: boolean
}

export default function MatchsNotPlay({ liga, matchs, pending }: Props) {

    return (
        <View className='mt-10 px-2'>
            <View
                style={{ backgroundColor: theme?.[liga].colors.secondary }}
                className={`rounded-t-lg flex flex-row justify-around p-2`}>
                <Text
                    style={{ color: theme?.[liga].colors.text }}
                    className='text-base text-center font-bold'>
                    {!pending ? 'Proximos partidos' : 'Partidos pendientes'}
                </Text>
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