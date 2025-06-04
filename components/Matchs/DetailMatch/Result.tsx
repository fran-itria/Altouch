import { Image, Text, View } from "react-native";
import { match } from "../../../firebase/services";


export default function Result({ item, textColor, textFinishColor }: { item: match, textColor: string, textFinishColor: string }) {
    return (
        <View className="col-span-2 flex flex-row justify-around items-center h-28 border-b">
            {/* TEAM 1 */}
            <View className="flex flex-col items-center justify-around">
                <Image source={{ uri: item.teamsMatch[0].image }} style={{ width: 50, height: 50 }} />
                {item.teamsMatch[0].name.includes(' ') ?
                    <View className="flex flex-col items-center">
                        <Text style={{ color: textColor }} className="font-bold text-base">{item.teamsMatch[0].name.split(' ')[0]}</Text>
                        <Text style={{ color: textColor }} className="font-bold text-base">{item.teamsMatch[0].name.split(' ')[1]}</Text>
                    </View>
                    :
                    <Text style={{ color: textColor }} className="font-bold text-base">{item.teamsMatch[0].name}</Text>
                }
            </View>
            {/* RESULT */}
            <View className="flex flex-col h-16 justify-around">
                <Text className="bg-white rounded-lg px-2 text-base text-center font-bold">Finalizado</Text>
                <View className="w-full flex flex-row justify-between items-center">
                    <Text style={{ color: textColor }} className="text-lg text-center font-bold ">{item.result.split('-')[0]}</Text>
                    <Text style={{ color: textColor }} className="text-lg text-center font-bold ">{item.result.split('-')[1]}</Text>
                </View>
            </View>
            {/* TEAM 2 */}
            <View className="flex flex-col items-center justify-around">
                <Image source={{ uri: item.teamsMatch[1].image }} style={{ width: 50, height: 50 }} />
                {item.teamsMatch[1].name.includes(' ') ?
                    <View className="flex flex-col items-center">
                        <Text style={{ color: textColor }} className="font-bold text-base">{item.teamsMatch[1].name.split(' ')[0]}</Text>
                        <Text style={{ color: textColor }} className="font-bold text-base">{item.teamsMatch[1].name.split(' ')[1]}</Text>
                    </View>
                    :
                    <Text style={{ color: textColor }} className="font-bold text-base">{item.teamsMatch[1].name}</Text>
                }
            </View>
        </View>
    )
}