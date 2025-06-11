import { Stack, useLocalSearchParams } from "expo-router";
import { Screen } from "../../../components/Screen";
import { theme } from "../../../tailwind.config";
import { useEffect, useState } from "react";
import { getOneTeam, getOneTeamResponse, player } from "../../../firebase/services";
import useLigaName from "../../../hooks/useLigaName";
import Loading from "../../../components/Loading";
import Players from "../../../components/Team/Players";
import Matchs from "../../../components/Matchs/Matchs";
import { Match } from "../(tabs)/[division]";
import MatchsNotPlay, { matchNotPlay } from "../../../components/Matchs/MatchsNotPlay";

export default function Team() {
    const { liga } = useLigaName()
    const { division, team }: { team: string, division: string } = useLocalSearchParams();
    const [data, setData] = useState<getOneTeamResponse>();
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        (async () => {
            const data = await getOneTeam(liga, division, team)
            setData(data)
            setLoading(false)
        })()
    }, [])

    return (
        <Screen background={theme?.[liga]?.colors?.primary}>
            <Stack.Screen
                options={{
                    headerTitle: `${team ? team : 'Equipo'}`,
                    headerRight: undefined,
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontWeight: 'bold', color: theme?.[liga]?.colors?.text, fontSize: 25 },
                    headerStyle: { backgroundColor: theme?.[liga]?.colors?.primary },
                    headerTintColor: theme?.[liga]?.colors?.text,
                }}
            />
            {loading ?
                <Loading />
                :
                <>
                    <Players
                        division={division}
                        liga={liga}
                        loading={loading}
                        players={data?.players as player[]}
                        team={team}
                    />
                    <Matchs
                        division={division}
                        liga={liga}
                        matchs={data?.matchsHistory as Match[]}
                        team={team}
                    />
                    <MatchsNotPlay
                        division={division}
                        liga={liga}
                        matchs={data?.matchsPending as matchNotPlay[]}
                        pending={true}
                    />
                </>
            }
        </Screen>
    )
}