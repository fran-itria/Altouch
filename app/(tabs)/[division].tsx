import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '../../components/Screen';
import { useEffect, useState } from 'react';
import { divisions } from '../../mock';


export default function About() {
    const { division } = useLocalSearchParams();
    const [teams, setTeams] = useState<{ id: number; name: string; }[]>([]);

    useEffect(() => {
        const filter = divisions.filter((d) => d.name == division)
        setTeams(filter[0].teams)
    }, [])
    return (
        <Screen>
            {teams.map(team => {
                return (
                    <Link
                        href={{
                            pathname: '/team/[id]',
                            params: { id: team.id }
                        }}
                        key={team.id}
                    >
                        <Text className='text-blue-200' key={team.id}>{team.name}</Text>
                    </Link>
                )
            })}
        </Screen>
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 20,
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        fontVariant: ['small-caps']
    }
});