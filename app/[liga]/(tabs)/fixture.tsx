import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '../../../components/Screen';

export default function Fixture() {
    return (
        <Screen background='#041433'>
            <Stack.Screen
                options={{
                    title: 'Fixture'
                }}
            />
        </Screen>
    )
}