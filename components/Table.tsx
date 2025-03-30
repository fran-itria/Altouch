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
        <View className="px-2">
            <View className={`h-8 rounded-t-lg flex flex-row justify-between items-center bg-[${theme?.[liga].colors.tertiary}] px-2`}>
                <View>
                    <Text className='text-start font-bold color-white'>Equipo</Text>
                </View>
                <View className="flex flex-row w-64 justify-between">
                    <Text className='w-10 text-center font-bold color-white'>J</Text>
                    <Text className='w-10 text-center font-bold color-white'>G</Text>
                    <Text className='w-10 text-center font-bold color-white'>P</Text>
                    <Text className='w-10 text-center font-bold color-white'>E</Text>
                    {/* <Text className='w-10 text-center font-bold color-white'>GF</Text> */}
                    {/* <Text className='w-10 text-center font-bold color-white'>GE</Text> */}
                    <Text className='w-10 text-center font-bold color-white'>G+/-</Text>
                    <Text className='w-10 text-center font-bold color-white'>DG</Text>
                    <Text className='w-10 text-center font-bold color-white'>PTS</Text>
                </View>
            </View>
            <FlatList
                data={teams}
                keyExtractor={(item) => item.id ? item.id : item.name}
                style={{ borderBottomEndRadius: 8, borderBottomStartRadius: 8 }}
                renderItem={({ item, index }) => (
                    <Link
                        className={`${teams.length - 1 > index ? 'border-b border-gray-900' : 'border-0'} flex flex-row justify-between px-2 items-center h-12 bg-[${theme?.[liga].colors.secondary}]`}
                        href={{
                            pathname: '/[liga]/team/[id]',
                            params: { liga, division, id: item.id, team: item.name }
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
                                <Text className='ml-2 text-center color-white font-bold'>{item.name}</Text>
                                :
                                <View className="ml-2">
                                    <Text className='text-center color-white font-bold'>{item.name.split(' ')[0]}</Text>
                                    <Text className='text-center color-white font-bold'>{item.name.split(' ')[1]}</Text>
                                </View>

                            }
                        </View>
                        <View className="flex flex-row w-64 justify-between">
                            <Text className='w-10 text-center color-white font-bold'>{item.matches}</Text>
                            <Text className='w-10 text-center color-white font-bold'>{item.wins}</Text>
                            <Text className='w-10 text-center color-white font-bold'>{item.lost}</Text>
                            <Text className='w-10 text-center color-white font-bold'>{item.draws}</Text>
                            {/* <Text className='w-10 text-center color-white font-bold'>{item.goalsFor}</Text> */}
                            {/* <Text className='w-10 text-center color-white font-bold'>{item.goalsAgainst}</Text> */}
                            <Text className='w-10 text-center color-white font-bold'>{item.goalsFor}:{item.goalsAgainst}</Text>
                            <Text className='w-10 text-center color-white font-bold'>{item.goalsFor - item.goalsAgainst}</Text>
                            <Text className='w-10 text-center color-white font-bold'>{item.points}</Text>
                        </View>
                    </Link>
                )}
            />
        </View>
    )
}