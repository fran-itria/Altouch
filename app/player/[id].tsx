import { Link, Stack, useLocalSearchParams } from "expo-router";
import { Pressable, Text } from "react-native";
import { Screen } from "../../components/Screen";

export default function Team() {
    const { id } = useLocalSearchParams();

    return (
        <Screen>
            <Stack.Screen
                options={{
                    headerTitle: 'Franco Itria',
                    headerLeft: undefined,
                    headerRight: undefined,
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontWeight: 'bold', color: 'white', fontSize: 25 },
                }}
            />
        </Screen>
    )
}