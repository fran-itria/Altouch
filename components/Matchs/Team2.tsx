import { Text, View } from "react-native";
import { BallIcon, Card } from "../../Icons";

export default function Team2({ team2 }: {
    team2: {
        name: string;
        team: string;
    }[][] | undefined
}) {
    return (
        <View className="col-span-1 gap-2 border-l border-white">
            {/* GOLES */}
            {team2 && team2[0].map((goal, index) => (
                <View className="mt-2 mb-2 flex flex-row items-center justify-center" key={index}>
                    <BallIcon color="white" size={18} />
                    <Text className="text-white font-bold ml-2">{goal.name}</Text>
                </View>
            )
            )}
            {/* AMARILLAS */}
            {team2 && team2[1]?.map((player, index) => (
                <View className="mt-2 mb-2 flex flex-row items-center justify-center" key={index}>
                    <Card color="yellow" />
                    <Text className="text-white font-bold ml-2">{player.name}</Text>
                </View>
            )
            )}
            {/* AZULES */}
            {team2 && team2[2]?.map((player, index) => (
                <View className="mt-2 mb-2 flex flex-row items-center justify-center" key={index}>
                    <Card color="blue" />
                    <Text className="text-white font-bold ml-2">{player.name}</Text>
                </View>
            )
            )}
            {/* ROJAS */}
            {team2 && team2[3]?.map((player, index) => (
                <View className="mt-2 mb-2 flex flex-row items-center justify-center" key={index}>
                    <Card color="red" />
                    <Text className="text-white font-bold ml-2">{player.name}</Text>
                </View>
            )
            )}
        </View>
    )
}