import { FlatList, Text, View } from "react-native";
import Result from "./Result";
import Team1 from "./Team1";
import Team2 from "./Team2";
import { match } from "../../../firebase/services";

interface Props {
    match: match[] | undefined
    team1: {
        goals: {
            name: string;
            team: string;
        }[];
        yellowCards: {
            name: string;
            team: string;
        }[];
        blueCards: {
            name: string;
            team: string;
        }[];
        redCards: {
            name: string;
            team: string;
        }[];
    } | undefined
    team2: {
        name: string;
        team: string;
    }[][] | undefined
    colorText: string
    backgroundTable: string
    backgroundHeader: string
    textFinishColor: string
}

export default function DetailMatch({ match, team1, team2, colorText, textFinishColor, backgroundTable, backgroundHeader }: Props) {
    return (
        <View className="mt-20 px-2">
            <Text
                style={{ backgroundColor: backgroundHeader, color: colorText }}
                className={`text-base h-8 flex flex-row justify-center items-center rounded-t-lg w-full text-center font-bold`}>Detalle del partido</Text>
            <FlatList
                data={match}
                style={{ borderBottomEndRadius: 8, borderBottomStartRadius: 8 }}
                keyExtractor={(item: match) => item.id ? item.id : item.result}
                renderItem={({ item }) => (
                    <View
                        style={{ backgroundColor: backgroundTable }}
                        className={`grid grid-col-2`}>
                        <Result item={item} textColor={colorText} textFinishColor={textFinishColor} />
                        <Team1 team1={team1} textColor={colorText} />
                        <Team2 team2={team2} textColor={colorText} />
                    </View>
                )}
            />
        </View>
    )
}