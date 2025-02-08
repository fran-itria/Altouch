import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen } from './Screen';

import { divisions } from '../mock';

export default function App() {
    return (
        <Screen>
            <Text className='text-white font-bold underline' style={styles.text}>Bienvenidos a la liga Altouch</Text>
            <Text className='text-white font-bold underline' style={styles.text}>Seleccione el torneo</Text>
            {divisions.map((division, i) => (
                <View key={division.id}>
                    <Link href={`/${division.name}`} asChild>
                        <Pressable
                            className='active:bg-red-100 active:border-transparent border-2 rounded-full border-red-300 mt-5 pl-5 pr-5 pb-2 pt-2'>
                            <Text
                                className='text-red-300 font-bold'
                                style={styles.text}
                            >{division.name}
                            </Text>
                        </Pressable>
                    </Link>
                </View>
            ))}
            <StatusBar style="auto" />
        </Screen>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontVariant: ['small-caps']
    }
});