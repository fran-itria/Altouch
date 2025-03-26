import { useLocalSearchParams } from "expo-router"
import { FlatList, Text, View } from "react-native"
import { Screen } from "../../../components/Screen"
import { theme } from "../../../tailwind.config";
import { useEffect, useState } from "react";
import { getOneMatch, match } from "../../../firebase/services";
import groupPlayers from "./groupPlayers";
import Result from "../../../components/Matchs/Result";
import Team1 from "../../../components/Matchs/Team1";
import Team2 from "../../../components/Matchs/Team2";
import StarPlayer from "../../../components/Matchs/StarPlayer";


export default function Matchs() {
    const { id, liga, division }: { id: string, liga: string, division: string } = useLocalSearchParams()
    const [match, setMatch] = useState<match[]>()
    const [team1, setTeam1] = useState<{ name: string, team: string }[][]>()
    const [team2, setTeam2] = useState<{ name: string, team: string }[][]>()

    useEffect(() => {
        (async () => {
            const match = await getOneMatch(liga, division, id)
            groupPlayers({ match, setTeam1, setTeam2 })
            setMatch(match)
        })()
    }, [])

    return (
        <Screen background={theme?.[liga]?.colors?.primary || '#b91c1c'}>
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
            <StarPlayer liga={liga} star={match && match[0].playerStar} />
        </Screen>
    )

}