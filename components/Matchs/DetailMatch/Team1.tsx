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
    const [goals, setGoals] = useState<{ name: string, count: number | undefined }[] | undefined>(undefined);
    const [yellowCards, setYellowCards] = useState<{ name: string, count: number | undefined }[] | undefined>(undefined);
    useEffect(() => {
        const groupGoalsByName = Object.groupBy(team1?.goals || [], ({ name }) => name);
        const groupYellowCardsByName = Object.groupBy(team1?.yellowCards || [], ({ name }) => name);
        const totalGoalsPlayer = Object.entries(groupGoalsByName).map(([key, value]) => {
            return { name: key, count: value && value.length };
        });
        const totalYellowCardsPlayer = Object.entries(groupYellowCardsByName).map(([key, value]) => {
            return { name: key, count: value && value.length };
        });
        setGoals(totalGoalsPlayer)
        setYellowCards(totalYellowCardsPlayer);
    }, [team1]);
    return (
        <View style={{ borderColor: textColor }} className="col-span-1 border-r">
            {/* GOALS */}
            {team1 && goals && goals.map((player, index) => (
                <View className="mt-2 mb-2 flex flex-row items-center justify-center" key={index}>
                    <BallIcon color="white" size={18} />
                    <Text style={{ color: textColor }} className="font-bold ml-2">
                        {player.name} {player.count && player.count > 1 && `( ${player.count} )`}
                    </Text>
                </View>
            )
            )}
            {/* YELLOW CARDS */}
            {team1 && yellowCards && yellowCards.map((player, index) => (
                <View className="mt-2 mb-2 flex flex-row items-center justify-center" key={index}>
                    <Card color="#facc15" />
                    <Text style={{ color: textColor }} className="font-bold ml-2">
                        {player.name} {player.count && player.count > 1 && `( ${player.count} )`}
                    </Text>
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