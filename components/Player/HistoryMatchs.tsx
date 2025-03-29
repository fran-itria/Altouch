import { FlatList, Text, View } from "react-native";
import { theme } from "../../tailwind.config";

export type matchs = {
    match: string;
    rival: string;
    goals: number;
    yellowCard: number;
    blueCard: number;
    redCard: number;
    star: number;
}[] | [];

export default function HistoryMatchs({ matchs, liga }: { matchs: matchs, liga: string }) {
    return (
        <View className="mt-5 px-2">
            <View className={`h-8 rounded-t-lg flex justify-center items-center bg-[${theme?.[liga].colors.tertiary}]`}>
                <Text className={`text-white font-bold text-base`}>Historial</Text>
            </View>
            <View className={`h-9 flex flex-row justify-between items-center bg-[${theme?.[liga].colors.secondary}]`}>
                <View>
                    <Text className={`ml-3 text-center text-white font-bold text-base`}>Fecha</Text>
                </View>
                <View className="flex-row justify-around mr-3">
                    <Text className={`w-10 text-center color-[#FFF600] font-bold text-base`}>TA</Text>
                    <Text className={`w-10 text-center color-[#0900FF] font-bold text-base`}>TA</Text>
                    <Text className={`w-10 text-center color-[#FF0000] font-bold text-base`}>TR</Text>
                    <Text className={`w-10 text-center text-white font-bold text-base`}>FIG</Text>
                    <Text className={`w-10 text-center text-white font-bold text-base`}>GOL</Text>
                </View>
            </View>
            <FlatList
                data={matchs}
                keyExtractor={(item) => item.rival}
                style={{ borderEndEndRadius: 10, borderEndStartRadius: 10 }}
                renderItem={({ item }) => (
                    <View className={`h-14 flex flex-row justify-between items-center bg-[${theme?.[liga].colors.table}]`}>
                        <View className="ml-3 flex flex-col items-start">
                            <Text className="text-white font-bold text-base">{item.match}</Text>
                            <Text className="text-white ">Vs {item.rival}</Text>
                        </View>
                        <View className="flex-row justify-around mr-3">
                            <Text className="w-10 text-center text-white text-base">{item.yellowCard}</Text>
                            <Text className="w-10 text-center text-white text-base">{item.blueCard}</Text>
                            <Text className="w-10 text-center text-white text-base">{item.redCard}</Text>
                            <Text className="w-10 text-center text-white text-base">{item.star}</Text>
                            <Text className="w-10 text-center text-white text-base">{item.goals}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    )


}