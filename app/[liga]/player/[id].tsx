import { Stack, useLocalSearchParams } from "expo-router";
import { Screen } from "../../../components/Screen";
import { theme } from "../../../tailwind.config";

export default function Team() {
    const { id, liga }: { id: string, liga: string } = useLocalSearchParams();

    return (
        <Screen background={theme?.[liga]?.colors?.primary || '#b91c1c'}>
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