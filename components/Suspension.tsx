import { useEffect, useState } from "react"
import { getPlayersSuspension } from "../firebase/services"
import { FlatList, Text, View } from "react-native"
import { theme } from "../tailwind.config";
import { Card } from "../Icons";


interface Props {
    liga: string
    division: string
}

interface Player {
    id: string
    name: string
    team: string
    suspension: number
    totalSuspension: number
}

export default function PlayersSuspension({ division, liga }: Props) {
    const [playersSuspension, setPlayersSuspension] = useState<Player[]>([])
    useEffect(() => {
        (async () => {
            const players = await getPlayersSuspension(liga, division)
            setPlayersSuspension(players)
        })()
    }, [])

    return (
        <View className={`w-full px-2 mt-10 mb-10`}>
            <Text className={`text-base bg-[${theme?.[liga]?.colors.tertiary}] h-8 flex justify-center items-center text-center text-white font-bold rounded-t-lg`}>Suspendidos</Text>
            <View className={`px-2 h-8 w-full flex flex-row justify-between items-center bg-[${theme?.[liga]?.colors?.secondary}]`}>
                <Text className='text-white font-bold'>Jugador</Text>
                <Text className='text-white font-bold'>Equipo</Text>
                <Text className='text-white font-bold'>Total</Text>
            </View>
            <FlatList
                data={playersSuspension}
                keyExtractor={(item) => item.id}
                style={{ borderBottomEndRadius: 8, borderBottomStartRadius: 8 }}
                renderItem={({ item, index }) => (
                    <View className={`px-2 ${index < playersSuspension.length - 1 ? 'border-b border-gray-700' : 'border-0'} h-10 flex flex-row justify-between items-center bg-[${theme?.[liga]?.colors?.table}]`}>
                        <View className={`flex flex-row`}>
                            <Card color="red" />
                            <Text className={`text-sm ml-2 text-sm text-white font-bold`}>{item.name}</Text>
                        </View>
                        <Text className={`text-sm text-white font-bold`}>{item.team}</Text>
                        <Text className={`text-sm text-white font-bold`}>{item.suspension}/{item.totalSuspension}</Text>
                    </View>
                )}
            />
        </View>
    )

}