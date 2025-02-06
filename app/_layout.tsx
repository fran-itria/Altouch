import { Slot, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Layout() {
    return (
        <View style={styles.container}>
            {/* <Text style={styles.text}>Hola Mundo</Text> */}
            <Stack
                screenOptions={{
                    headerStyle: { backgroundColor: 'black' },
                    headerTintColor: 'white',
                    headerTitle: ''
                }}
            >
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="team/[id]" />
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