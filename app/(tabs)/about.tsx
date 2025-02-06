import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '../../components/Screen';

export default function About() {

    return (
        <Screen>
            <Text style={styles.text}>Reglamento</Text>
            <Link href={'/'} asChild>
                <Text style={{ color: 'red' }}> Regresar </Text>
            </Link>
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