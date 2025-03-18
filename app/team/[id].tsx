import { Link, Stack, useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { Screen } from "../../components/Screen";

export default function Team() {
    const { team } = useLocalSearchParams();

    return (
        <Screen>
            <Stack.Screen
                options={{
                    headerTitle: `${team}`,
                    headerLeft: undefined,
                    headerRight: undefined,
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontWeight: 'bold', color: 'white', fontSize: 25 },
                }}
            />
            <Link href={{ pathname: '/player/[id]', params: { id: 1 } }}>
                <Text> Franco Itria </Text>
            </Link>
        </Screen>
    )
}