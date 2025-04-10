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
        <Screen background={theme?.[liga]?.colors?.primary || '#b91c1c'}>
            <Stack.Screen
                options={{
                    headerTitle: `${player?.player.name}`,
                    headerLeft: undefined,
                    headerRight: undefined,
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontWeight: 'bold', color: 'white', fontSize: 25 },
                    headerShadowVisible: false,
                }}
            />
            <View className={`${loading ? 'blur-md' : 'blur-none'}`}>
                <Statics player={player?.player as player} />
                <Birth liga={liga} player={player?.player as player} />
                <HistoryMatchs matchs={player?.matchs as matchs} liga={liga} />
            </View>
            {loading && <Loading />}
        </Screen>
    )
}