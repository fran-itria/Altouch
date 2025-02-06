import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen } from './Screen';

import { divisions } from '../mock';

export default function App() {
    return (
        <Screen>
            <Text style={styles.text}>Bienvenidos a la liga Altouch</Text>
            <Text style={styles.text}>Seleccione el torneo</Text>
            {divisions.map((division) => (
                <Link key={division.id} href={`/${division.name}`} asChild>
                    <Pressable>
                        <Text style={styles.text}>{division.name}</Text>
                    </Pressable>
                </Link>
            ))}
            <StatusBar style="auto" />
        </Screen>
    );
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