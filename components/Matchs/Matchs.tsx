import { FlatList, Image, Text, View } from "react-native";
import { theme } from "../../tailwind.config";
import FlatlistPlay from "./FlatlistPlay";
import { Match } from "../../app/[liga]/(tabs)/[division]";

interface Props {
    liga: string
    matchs: Match[]
    division: string
    team?: string
}

export default function Matchs({ liga, matchs, division, team }: Props) {
    return (
        <View className='mt-10 px-2'>
            <View
                style={{ backgroundColor: theme?.[liga].colors.secondary }}
                className={`rounded-t-lg flex flex-row justify-around p-2`}>
                <Text style={{ color: theme?.[liga].colors.text }} className='text-base text-center font-bold'>Historial</Text>
            </View>
            <FlatList
                data={matchs}
                keyExtractor={(item) => item.id ? item.id : item.result}
                style={{ borderBottomEndRadius: 8, borderBottomStartRadius: 8 }}
                renderItem={({ item, index }) => (
                    <FlatlistPlay
                        liga={liga}
                        division={division}
                        item={item}
                        index={index}
                        length={matchs.length - 1}
                        team={team}
                    />
                )}
            />
        </View>
    )
}