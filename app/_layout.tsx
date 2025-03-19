import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import "../global.css"

export default function Layout() {
    return (
        <View style={styles.container}>
            {/* <Text style={styles.text}>Hola Mundo</Text> */}
            <Stack
                screenOptions={{
                    headerStyle: { backgroundColor: '#041433' },
                    headerTintColor: 'white',
                    headerTitle: ''
                }}
            >
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="/[liga]/team/[id]" />
                <Stack.Screen name="/[liga]/player/[id]" />
            </Stack>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    text: {
        color: 'red',
    }
})