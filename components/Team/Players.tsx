import { Link } from "expo-router";
import { FlatList, Text, View } from "react-native";
import { player } from "../../firebase/services";
import { theme } from "../../tailwind.config";

interface Props {
    loading: boolean;
    liga: string;
    division: string;
    team: string;
    players: player[];
}
export default function Players({ division, liga, loading, players, team }: Props) {
    return (
        <View className={`p-4 ${loading ? 'blur-md' : 'blur-none'}`}>
            <View
                style={{ backgroundColor: theme?.[liga]?.colors?.secondary }}
                className={`rounded-t-lg flex flex-row justify-around p-2`}>
                <Text
                    style={{ color: theme?.[liga]?.colors?.text }}
                    className='w-36 text-center font-bold text-base'>
                    Jugadores/as
                </Text>
            </View>
            <View
                style={{ backgroundColor: theme?.[liga].colors.tertiary }}
                className={`h-8 flex flex-row justify-between items-center px-4`}>
                <View>
                    <Text
                        style={{ color: theme?.[liga]?.colors?.text }}
                        className={`text-center text-white font-bold`}>
                        Nombre
                    </Text>
                </View>
                <View className="flex-row justify-around">
                    <Text className={`w-10 text-center color-[#FFF600] font-bold`}>TA</Text>
                    <Text className={`w-10 text-center color-[#0900FF] font-bold`}>TA</Text>
                    <Text className={`w-10 text-center color-[#FF0000] font-bold`}>TR</Text>
                    <Text
                        style={{ color: theme?.[liga]?.colors?.text }}
                        className={`w-10 text-center font-bold`}>
                        FIG
                    </Text>
                    <Text
                        style={{ color: theme?.[liga]?.colors?.text }}
                        className={`w-10 text-center font-bold`}>
                        GOL
                    </Text>
                </View>
            </View>
            <FlatList
                data={players}
                keyExtractor={(item) => item.id ? item.id : item.name}
                style={{ borderBottomEndRadius: 8, borderBottomStartRadius: 8 }}
                renderItem={({ item, index }) => (
                    <Link
                        style={{ backgroundColor: theme?.[liga]?.colors?.table }}
                        className={`${players.length - 1 > index ? 'border-b border-gray-700' : 'border-0'} px-4 flex flex-row justify-between items-center h-12`}
                        href={{
                            pathname: '../player/[id]',
                            params: { liga, division, id: item.id, team }
                        }}
                        key={item.id}
                    >
                        <Text
                            style={{ color: theme?.[liga]?.colors?.text }}
                            className='text-center font-bold'>
                            {item.name} {item.surname}
                        </Text>
                        <View className="flex-row justify-around">
                            <Text
                                style={{ color: theme?.[liga]?.colors?.text }}
                                className="w-10 text-center font-bold text-base">
                                {item.yellowCard}
                            </Text>
                            <Text
                                style={{ color: theme?.[liga]?.colors?.text }}
                                className="w-10 text-center font-bold text-base">
                                {item.blueCard}
                            </Text>
                            <Text
                                style={{ color: theme?.[liga]?.colors?.text }}
                                className="w-10 text-center font-bold text-base">
                                {item.redCard}
                            </Text>
                            <Text
                                style={{ color: theme?.[liga]?.colors?.text }}
                                className="w-10 text-center font-bold text-base">
                                {item.star}
                            </Text>
                            <Text
                                style={{ color: theme?.[liga]?.colors?.text }}
                                className="w-10 text-center font-bold text-base">
                                {item.goals}
                            </Text>
                        </View>
                    </Link>
                )}
            />
        </View>
    )
}