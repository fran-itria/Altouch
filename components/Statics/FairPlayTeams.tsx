import { FlatList, Image, Text, View } from "react-native";
import { theme } from "../../tailwind.config";

interface FairPlayTeam {
    id: string;
    matches: number;
    name: string;
    image?: string;
    yellowCard: number;
    blueCard: number;
    redCard: number;
    absence: number;
    pointsFairPlay: number;
}

interface Props {
    liga: string;
    fairPlayTeam: FairPlayTeam[];
}

export default function FairPlayTeams({ liga, fairPlayTeam }: Props) {
    return (
        <View className={`w-full px-2 mt-10 mb-10`}>
            <View
                style={{ backgroundColor: theme?.[liga]?.colors?.secondary }}
                className={`rounded-t-lg px-2 h-8 w-full flex flex-row justify-between items-center `}
            >
                <View>
                    <Text style={{ color: theme?.[liga].colors.text }} className='w-32 text-start font-bold'>Equipo</Text>
                </View>
                <View className="w-48 flex flex-row items-center justify-between">
                    <Text style={{ color: theme?.[liga].colors.text }} className='w-8 text-center font-bold'>J</Text>
                    <Text className='color-[#FFF600] w-8 text-center font-bold'>TA</Text>
                    <Text className='color-[#0900FF] w-8 text-center font-bold'>TA</Text>
                    <Text className='color-[#FF0000] w-8 text-center font-bold'>TR</Text>
                    <Text style={{ color: theme?.[liga].colors.text }} className='w-8 text-center font-bold'>WO</Text>
                    <Text style={{ color: theme?.[liga].colors.text }} className='w-8 text-center font-bold'>PTS</Text>
                </View>
            </View>
            <FlatList
                data={fairPlayTeam}
                keyExtractor={(item) => item.id}
                style={{ borderBottomEndRadius: 8, borderBottomStartRadius: 8 }}
                renderItem={({ item, index }) => (
                    <View
                        style={{ backgroundColor: theme?.[liga]?.colors?.table }}
                        className={`${fairPlayTeam && index < fairPlayTeam.length - 1 ? 'border-b border-gray-700' : 'border-0'} px-2 h-12 flex flex-row justify-between items-center`}>
                        <View className="flex flex-row items-center justify-between">
                            {
                                item.image &&
                                <Image
                                    source={{ uri: item.image }}
                                    style={{ width: 30, height: 30 }}
                                />
                            }
                            {!item.name.includes(' ') ?
                                <Text
                                    style={{ color: theme?.[liga].colors.text }}
                                    className={`${!item.image ? 'ml-4' : 'ml-2'} text-center font-bold`}>
                                    {item.name}
                                </Text>
                                :
                                <View className="ml-2">
                                    <Text
                                        style={{ color: theme?.[liga].colors.text }}
                                        className='text-center font-bold'>
                                        {item.name.split(' ')[0]}
                                    </Text>
                                    <Text
                                        style={{ color: theme?.[liga].colors.text }}
                                        className='text-center font-bold'>
                                        {item.name.split(' ')[1]}
                                    </Text>
                                </View>

                            }
                        </View>
                        <View className="w-48 flex flex-row items-center justify-between">
                            <Text style={{ color: theme?.[liga].colors.text }} className={`w-8 text-center text-sm font-bold`}>{item.matches}</Text>
                            <Text style={{ color: theme?.[liga].colors.text }} className={`w-8 text-center text-sm font-bold`}>{item.yellowCard}</Text>
                            <Text style={{ color: theme?.[liga].colors.text }} className={`w-8 text-center text-sm font-bold`}>{item.blueCard}</Text>
                            <Text style={{ color: theme?.[liga].colors.text }} className={`w-8 text-center text-sm font-bold`}>{item.redCard}</Text>
                            <Text style={{ color: theme?.[liga].colors.text }} className={`w-8 text-center text-sm font-bold`}>{item.absence}</Text>
                            <Text style={{ color: theme?.[liga].colors.text }} className={`w-8 text-center text-sm font-bold`}>{item.absence}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}