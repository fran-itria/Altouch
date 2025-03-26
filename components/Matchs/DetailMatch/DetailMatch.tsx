import { FlatList, Text, View } from "react-native";
import Result from "./Result";
import Team1 from "./Team1";
import Team2 from "./Team2";
import { theme } from "../../../tailwind.config";
import { match } from "../../../firebase/services";

interface Props {
    match: match[] | undefined
    liga: string
    team1: {
        name: string;
        team: string;
    }[][] | undefined
    team2: {
        name: string;
        team: string;
    }[][] | undefined
}

export default function DetailMatch({ match, liga, team1, team2 }: Props) {
    return (
        <View className="mt-20 px-2">
            <View className="flex flex-row justify-center">
                <Text className={`p-1 text-base rounded-t-lg w-full text-center font-bold bg-[${theme?.[liga].colors.tertiary}]`}>Detalle del partido</Text>
            </View>
            <FlatList
                data={match}
                style={{ borderBottomEndRadius: 8, borderBottomStartRadius: 8 }}
                keyExtractor={(item: match) => item.id ? item.id : item.result}
                renderItem={({ item }) => (
                    <View className={`grid grid-col-2 bg-[${theme?.[liga].colors.table}]`}>
                        <Result item={item} />
                        <Team1 team1={team1} />
                        <Team2 team2={team2} />
                    </View>
                )}
            />
        </View>
    )
}