import { Stack, useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { Screen } from "../../components/Screen";

export default function Team() {
    const { id } = useLocalSearchParams();

    return (
        <Screen>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: 'red' },
                    headerTintColor: 'white',
                    headerTitle: 'Team',
                    headerLeft: undefined,
                    headerRight: undefined
                }}
            />
            <Text style={{ color: 'red', fontWeight: 'bold' }}>{id}</Text>
        </Screen>
    )
}