import { Text, View } from "react-native";
import { BallIcon, Card } from "../../../Icons";
import { useEffect, useState } from "react";

export default function Team1({ team1, textColor }: {
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
    textColor: string
}) {
    const [goals, setGoals] = useState<{ name: string, count: number }[] | undefined>(undefined);
    useEffect(() => {
        const groupGoalsByName = Object.groupBy(team1?.goals || [], ({ name }) => name);
        const totalGoalsPlayer: { name: string, count: number }[] = []
        for (const key in groupGoalsByName) {
            if (groupGoalsByName[key]) {
                totalGoalsPlayer.push({ name: key, count: groupGoalsByName[key].length });
            }
        }
        setGoals(totalGoalsPlayer)
    }, [team1]);
    return (
        <View style={{ borderColor: textColor }} className="col-span-1 border-r">
            {/* GOALS */}
            {team1 && goals && goals.map((player, index) => (
                <View className="mt-2 mb-2 flex flex-row items-center justify-center" key={index}>
                    <BallIcon color="white" size={18} />
                    <Text style={{ color: textColor }} className="font-bold ml-2">
                        {player.name} {player.count > 1 && `( ${player.count} )`}
                    </Text>
                </View>
            )
            )}
            {/* YELLOW CARDS */}
            {team1 && team1.yellowCards?.map((player, index) => (
                <View className="mt-2 mb-2 flex flex-row items-center justify-center" key={index}>
                    <Card color="#facc15" />
                    <Text style={{ color: textColor }} className="font-bold ml-2">{player.name}</Text>
                </View>
            )
            )}
            {/* BLUE CARDS */}
            {team1 && team1.blueCards?.map((player, index) => (
                <View className="mt-2 mb-2 flex flex-row items-center justify-center" key={index}>
                    <Card color="blue" />
                    <Text style={{ color: textColor }} className="font-bold ml-2">{player.name}</Text>
                </View>
            )
            )}
            {/* RED CARDS */}
            {team1 && team1.redCards?.map((player, index) => (
                <View className="mt-2 mb-2 flex flex-row items-center justify-center" key={index}>
                    <Card color="red" />
                    <Text style={{ color: textColor }} className="font-bold ml-2">{player.name}</Text>
                </View>
            )
            )}
        </View>
    )
}