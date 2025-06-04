import { Text, View } from "react-native";
import { BallIcon, Card } from "../../../Icons";

export default function Team2({ team2, textColor }: {
    team2: {
        name: string;
        team: string;
    }[][] | undefined
    textColor: string
}) {
    return (
        <View style={{ borderColor: textColor }} className="col-span-1 gap-2 border-l">
            {/* GOALS */}
            {team2 && team2[0].map((goal, index) => (
                <View className="mt-2 mb-2 flex flex-row items-center justify-center" key={index}>
                    <BallIcon color="white" size={18} />
                    <Text style={{ color: textColor }} className="font-bold ml-2">{goal.name}</Text>
                </View>
            )
            )}
            {/* YELLOW CARDS */}
            {team2 && team2[1]?.map((player, index) => (
                <View className="mt-2 mb-2 flex flex-row items-center justify-center" key={index}>
                    <Card color="yellow" />
                    <Text style={{ color: textColor }} className="font-bold ml-2">{player.name}</Text>
                </View>
            )
            )}
            {/* BLUE CARDS */}
            {team2 && team2[2]?.map((player, index) => (
                <View className="mt-2 mb-2 flex flex-row items-center justify-center" key={index}>
                    <Card color="blue" />
                    <Text style={{ color: textColor }} className="font-bold ml-2">{player.name}</Text>
                </View>
            )
            )}
            {/* RED CARDS */}
            {team2 && team2[3]?.map((player, index) => (
                <View className="mt-2 mb-2 flex flex-row items-center justify-center" key={index}>
                    <Card color="red" />
                    <Text style={{ color: textColor }} className="font-bold ml-2">{player.name}</Text>
                </View>
            )
            )}
        </View>
    )
}