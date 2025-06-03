import { Stack } from "expo-router";
import { View } from "react-native";
import "../global.css"

export default function Layout() {
    return (
        <View className="flex-1 bg-black">
            <Stack
                screenOptions={{
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