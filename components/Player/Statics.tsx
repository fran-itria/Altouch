import { View, Text } from "react-native";
import { BallIcon, Card, StarIcon } from "../../Icons";

interface player {
    name: string
    birth: string
    goals: number
    yellowCard: number
    blueCard: number
    redCard: number
    star: number
}

export default function Statics({ player, colorText }: { player: player, colorText: string }) {
    return (
        <View className="flex-col h-24 justify-around items-center mt-5">
            <View className="w-52 flex-row justify-around items-center">
                <View className="flex-row items-center">
                    <Card color="yellow" />
                    <Text
                        style={{ color: colorText }}
                        className="font-bold text-lg ml-2">
                        {player?.yellowCard}
                    </Text>
                </View>
                <Text className="text-white font-bold text-lg">|</Text>
                <View className="flex-row items-center">
                    <Card color="blue" />
                    <Text
                        style={{ color: colorText }}
                        className="font-bold text-lg ml-2">
                        {player?.blueCard}
                    </Text>
                </View>
                <Text className="text-white font-bold text-lg">|</Text>
                <View className="flex-row items-center">
                    <Card color="red" />
                    <Text
                        style={{ color: colorText }}
                        className="font-bold text-lg ml-2">
                        {player?.redCard}
                    </Text>
                </View>
            </View>
            <View className="w-40 flex-row justify-around items-center">
                <View className="flex-row items-center">
                    <BallIcon color="white" />
                    <Text
                        style={{ color: colorText }}
                        className="font-bold text-lg ml-2">
                        {player?.goals}
                    </Text>
                </View>
                <Text className="text-white font-bold text-lg">|</Text>
                <View className="flex-row items-center">
                    <StarIcon />
                    <Text
                        style={{ color: colorText }}
                        className="font-bold text-lg ml-2">
                        {player?.star}
                    </Text>
                </View>
            </View>
        </View>
    )
}