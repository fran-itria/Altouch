import { Text, View } from "react-native";
import { BallIcon, Card } from "../../../Icons";

export default function Team1({ team1 }: {
    team1: {
        name: string;
        team: string;
    }[][] | undefined
}) {
    return (
        <View className="col-span-1 border-r border-white">
            {/* GOALS */}
            {team1 && team1[0]?.map((player, index) => (
                <View className="mt-2 mb-2 flex flex-row items-center justify-center" key={index}>
                    <BallIcon color="white" size={18} />
                    <Text className="text-white font-bold ml-2">{player.name}</Text>
                </View>
            )
            )}
            {/* YELLOW CARDS */}
            {team1 && team1[1]?.map((player, index) => (
                <View className="mt-2 mb-2 flex flex-row items-center justify-center" key={index}>
                    <Card color="#facc15" />
                    <Text className="text-white font-bold ml-2">{player.name}</Text>
                </View>
            )
            )}
            {/* BLUE CARDS */}
            {team1 && team1[2]?.map((player, index) => (
                <View className="mt-2 mb-2 flex flex-row items-center justify-center" key={index}>
                    <Card color="blue" />
                    <Text className="text-white font-bold ml-2">{player.name}</Text>
                </View>
            )
            )}
            {/* RED CARDS */}
            {team1 && team1[3]?.map((player, index) => (
                <View className="mt-2 mb-2 flex flex-row items-center justify-center" key={index}>
                    <Card color="red" />
                    <Text className="text-white font-bold ml-2">{player.name}</Text>
                </View>
            )
            )}
        </View>
    )
}