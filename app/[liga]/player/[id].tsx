import { Stack, useLocalSearchParams } from "expo-router";
import { Screen } from "../../../components/Screen";
import { useEffect, useState } from "react";
import { detailPlayer, getOnePlayer, player } from "../../../firebase/services";
import { theme } from "../../../tailwind.config";
import Statics from "../../../components/Player/Statics";
import Birth from "../../../components/Player/Birth";
import HistoryMatchs, { matchs } from "../../../components/Player/HistoryMatchs";
import useLigaName from "../../../hooks/useLigaName";
import { View } from "react-native";
import Loading from "../../../components/Loading";

export default function Team() {
    const { liga } = useLigaName()
    const { id, division, team }: { id: string, division: string, team: string } = useLocalSearchParams();
    const [player, setPlayer] = useState<detailPlayer>()
    const [loading, setLoading] = useState<boolean>(true)


    useEffect(() => {
        (async () => {
            const player = await getOnePlayer(liga, division, team, id)
            setPlayer(player)
            setLoading(false)
        }
        )()
    }, [])

    return (
        <Screen background={theme?.[liga]?.colors?.primary}>
            <Stack.Screen
                options={{
                    headerTitle: `${player ? player?.player.name : 'Jugador'}`,
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontWeight: 'bold', color: theme?.[liga]?.colors?.text, fontSize: 25 },
                    headerShadowVisible: true,
                    headerStyle: { backgroundColor: theme?.[liga]?.colors?.primary },
                    headerTintColor: theme?.[liga]?.colors?.text,
                }}
            />
            {loading ?
                <Loading />
                :
                <View className={`${loading ? 'blur-md' : 'blur-none'}`}>
                    <Statics player={player?.player as player} colorText={theme?.[liga]?.colors?.text} />
                    <Birth liga={liga} birth={player?.player.birth as string} />
                    <HistoryMatchs matchs={player?.matchs as matchs} liga={liga} />
                </View>
            }
        </Screen>
    )
}