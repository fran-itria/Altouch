import { Link } from "expo-router";
import { FlatList, Image, Text, View } from "react-native";
import { team } from "../firebase/services";
import { theme } from "../tailwind.config";

interface Props {
    liga: string
    teams: team[]
    division: string
}

export default function Table({ division, liga, teams }: Props) {
    return (
        <View className="px-2 mt-10">
            <View
                style={{ backgroundColor: theme?.[liga].colors.secondary }}
                className={`h-8 rounded-t-lg flex flex-row justify-between items-center px-2`}>
                <View>
                    <Text style={{ color: theme?.[liga].colors.text }} className='text-start font-bold ml-2'>Equipo</Text>
                </View>
                <View className="flex flex-row w-64 justify-between">
                    <Text
                        style={{ color: theme?.[liga].colors.text }}
                        className='w-10 text-center font-bold'>
                        J
                    </Text>
                    <Text
                        style={{ color: theme?.[liga].colors.text }}
                        className='w-10 text-center font-bold'>
                        G
                    </Text>
                    <Text
                        style={{ color: theme?.[liga].colors.text }}
                        className='w-10 text-center font-bold'>
                        P
                    </Text>
                    <Text
                        style={{ color: theme?.[liga].colors.text }}
                        className='w-10 text-center font-bold'>
                        E
                    </Text>
                    <Text
                        style={{ color: theme?.[liga].colors.text }}
                        className='w-10 text-center font-bold'>
                        G+/-
                    </Text>
                    <Text
                        style={{ color: theme?.[liga].colors.text }}
                        className='w-10 text-center font-bold'>
                        DG
                    </Text>
                    <Text
                        style={{ color: theme?.[liga].colors.text }}
                        className='w-10 text-center font-bold'>
                        PTS
                    </Text>
                </View>
            </View>
            <FlatList
                data={teams}
                keyExtractor={(item) => item.id ? item.id : item.name}
                style={{ borderBottomEndRadius: 8, borderBottomStartRadius: 8 }}
                renderItem={({ item, index }) => (
                    <Link
                        style={{ backgroundColor: theme?.[liga].colors.tertiary }}
                        className={`px-2 ${teams.length - 1 > index ? 'border-b border-gray-700' : 'border-0'} flex flex-row justify-between items-center h-12`}
                        href={{
                            pathname: '../team/[id]',
                            params: { division, id: item.id, team: item.name }
                        }}
                        key={item.id}
                    >
                        <View className="flex flex-row items-center justify-between">
                            {
                                <Image
                                    source={{ uri: item.image }}
                                    style={{ width: 30, height: 30 }}
                                />
                            }
                            {!item.name.includes(' ') ?
                                <Text
                                    style={{ color: theme?.[liga].colors.text }}
                                    className='ml-2 text-center font-bold'>
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
                        <View className="flex flex-row w-64 justify-between">
                            <Text
                                style={{ color: theme?.[liga].colors.text }}
                                className='w-10 text-center font-bold'>
                                {item.matches}
                            </Text>
                            <Text
                                style={{ color: theme?.[liga].colors.text }}
                                className='w-10 text-center font-bold'>
                                {item.wins}
                            </Text>
                            <Text
                                style={{ color: theme?.[liga].colors.text }}
                                className='w-10 text-center font-bold'>
                                {item.lost}
                            </Text>
                            <Text
                                style={{ color: theme?.[liga].colors.text }}
                                className='w-10 text-center font-bold'>
                                {item.draws}
                            </Text>
                            <Text
                                style={{ color: theme?.[liga].colors.text }}
                                className='w-10 text-center font-bold'>
                                {item.goalsFor}
                                :{item.goalsAgainst}</Text>
                            <Text
                                style={{ color: theme?.[liga].colors.text }}
                                className='w-10 text-center font-bold'>
                                {item.goalsFor -
                                    item.goalsAgainst}</Text>
                            <Text
                                style={{ color: theme?.[liga].colors.text }}
                                className='w-10 text-center font-bold'>
                                {item.points}
                            </Text>
                        </View>
                    </Link>
                )}
            />
        </View>
    )
}