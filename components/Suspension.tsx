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
            <Text
                style={{ backgroundColor: theme?.[liga]?.colors?.secondary, color: theme?.[liga]?.colors?.text }}
                className={`text-base h-8 flex justify-center items-center text-center font-bold rounded-t-lg`}
            >
                Suspendidos
            </Text>
            <View
                style={{ backgroundColor: theme?.[liga]?.colors?.tertiary }}
                className={`px-2 h-8 w-full flex flex-row justify-between items-center `}
            >
                <Text style={{ color: theme?.[liga].colors.text }} className='w-32 text-start font-bold'>Jugador</Text>
                <Text style={{ color: theme?.[liga].colors.text }} className='w-36 text-start font-bold'>Equipo</Text>
                <Text style={{ color: theme?.[liga].colors.text }} className='w-10 text-end font-bold'>Total</Text>
            </View>
            <FlatList
                data={playersSuspension}
                keyExtractor={(item) => item.id}
                style={{ borderBottomEndRadius: 8, borderBottomStartRadius: 8 }}
                renderItem={({ item, index }) => (
                    <View
                        style={{ backgroundColor: theme?.[liga]?.colors?.table }}
                        className={`px-2 ${index < playersSuspension.length - 1 ? 'border-b border-gray-700' : 'border-0'} h-12 flex flex-row justify-between items-center`}>
                        <View className={`flex flex-row w-32`}>
                            <Card color="red" />
                            <Text style={{ color: theme?.[liga].colors.text }} className={`text-sm ml-2 text-sm font-bold`}>{item.name}</Text>
                        </View>
                        <Text style={{ color: theme?.[liga].colors.text }} className={`w-36 text-start text-sm font-bold`}>{item.team}</Text>
                        <Text style={{ color: theme?.[liga].colors.text }} className={`w-10 text-center text-sm font-bold`}>{item.suspension}/{item.totalSuspension}</Text>
                    </View>
                )}
            />
        </View>
    )

}