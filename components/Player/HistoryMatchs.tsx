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
            <View
                style={{ backgroundColor: theme?.[liga].colors.secondary }}
                className={`h-8 rounded-t-lg flex justify-center items-center`}>
                <Text
                    style={{ color: theme?.[liga]?.colors?.text }}
                    className={`font-bold text-base`}>
                    Historial
                </Text>
            </View>
            {matchs && matchs.length > 0 ?
                <>
                    <View
                        style={{ backgroundColor: theme?.[liga].colors.tertiary }}
                        className={`h-9 flex flex-row justify-between items-center`}>
                        <View>
                            <Text
                                style={{ color: theme?.[liga]?.colors?.text }}
                                className={`ml-3 text-center font-bold text-base`}>
                                Fecha
                            </Text>
                        </View>
                        <View className="flex-row justify-around mr-3">
                            <Text className={`w-10 text-center color-[#FFF600] font-bold text-base`}>TA</Text>
                            <Text className={`w-10 text-center color-[#0900FF] font-bold text-base`}>TA</Text>
                            <Text className={`w-10 text-center color-[#FF0000] font-bold text-base`}>TR</Text>
                            <Text
                                style={{ color: theme?.[liga]?.colors?.text }}
                                className={`w-10 text-center font-bold text-base`}>
                                FIG
                            </Text>
                            <Text
                                style={{ color: theme?.[liga]?.colors?.text }}
                                className={`w-10 text-center font-bold text-base`}>
                                GOL
                            </Text>
                        </View>
                    </View>
                    <FlatList
                        data={matchs}
                        keyExtractor={(item) => item.rival}
                        style={{ borderEndEndRadius: 10, borderEndStartRadius: 10 }}
                        renderItem={({ item }) => (
                            <View
                                style={{ backgroundColor: theme?.[liga].colors.table }}
                                className={`h-14 flex flex-row justify-between items-center`}>
                                <View className="ml-3 flex flex-col items-start">
                                    <Text
                                        style={{ color: theme?.[liga]?.colors?.text }}
                                        className="font-bold text-base">
                                        {item.match}
                                    </Text>
                                    <Text style={{ color: theme?.[liga]?.colors?.text }}>
                                        Vs {item.rival}
                                    </Text>
                                </View>
                                <View className="flex-row justify-around mr-3">
                                    <Text
                                        style={{ color: theme?.[liga]?.colors?.text }}
                                        className="w-10 text-center text-base">
                                        {item.yellowCard}
                                    </Text>
                                    <Text
                                        style={{ color: theme?.[liga]?.colors?.text }}
                                        className="w-10 text-center text-base">
                                        {item.blueCard}
                                    </Text>
                                    <Text
                                        style={{ color: theme?.[liga]?.colors?.text }}
                                        className="w-10 text-center text-base">
                                        {item.redCard}
                                    </Text>
                                    <Text
                                        style={{ color: theme?.[liga]?.colors?.text }}
                                        className="w-10 text-center text-base">
                                        {item.star}
                                    </Text>
                                    <Text
                                        style={{ color: theme?.[liga]?.colors?.text }}
                                        className="w-10 text-center text-base">
                                        {item.goals}
                                    </Text>
                                </View>
                            </View>
                        )}
                    />
                </>
                :
                <View
                    style={{ backgroundColor: theme?.[liga].colors.tertiary }}
                    className={`h-9 flex flex-row justify-center items-center`}>
                    <View>
                        <Text
                            style={{ color: theme?.[liga]?.colors?.text }}
                            className={`ml-3 text-center font-bold text-base`}>
                            Sin partidos jugados
                        </Text>
                    </View>
                </View>
            }
        </View>
    )


}