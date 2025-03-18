import { Link, useLocalSearchParams } from 'expo-router';
import { ScrollView, Text } from 'react-native';
import { Screen } from '../../../components/Screen';
import { useEffect, useState } from 'react';
import { divisions } from '../../../mock';


export default function About() {
    const { liga, division } = useLocalSearchParams();
    const [teams, setTeams] = useState<{ id: number; name: string; }[]>([]);

    useEffect(() => {
        console.log(liga, division)
        const filter = divisions.filter((d) => d.name == division)
        setTeams(filter[0].teams)
    }, [])
    return (
        <ScrollView>
            <Screen>
                {teams.map(team => {
                    return (
                        <Link
                            href={{
                                pathname: '/team/[id]',
                                params: { id: team.id, team: team.name }
                            }}
                            key={team.id}
                        >
                            <Text className='text-blue-200' key={team.id}>{team.name}</Text>
                        </Link>
                    )
                })}
            </Screen>
        </ScrollView>
    )
}