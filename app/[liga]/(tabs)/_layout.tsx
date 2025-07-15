import React from "react";
import { Stack, Tabs, useLocalSearchParams } from 'expo-router';
import { theme } from "../../../tailwind.config";
import MyTabBar from "../../../components/MyTabBar";

export default function TabsLayout() {
    const { liga, division } = useLocalSearchParams() as { liga: string, division: string };
    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: `${division}`,
                    headerTitleStyle: { fontWeight: "bold", fontSize: 25, color: theme?.[liga]?.colors?.text },
                    headerTitleAlign: "center",
                    headerStyle: { backgroundColor: theme?.[liga]?.colors?.primary },
                    headerTintColor: theme?.[liga]?.colors?.text,
                }} />
            <Tabs
                tabBar={(props) => <MyTabBar {...props} liga={liga} />}
                screenOptions={{
                    headerShadowVisible: false,
                    headerTitleAlign: 'center',
                    headerStyle: { backgroundColor: theme?.[liga]?.colors?.primary },
                    headerTitleStyle: { fontWeight: 'bold', color: theme?.[liga]?.colors?.text },
                }}
            >
                <Tabs.Screen
                    name="[division]/index"
                    options={{
                        headerShown: false
                    }}
                />
                <Tabs.Screen
                    name="fixture"
                    initialParams={{ liga, division }}
                />
                <Tabs.Screen
                    name="statics"
                    initialParams={{ liga, division }}
                />
                <Tabs.Screen
                    initialParams={{ liga }}
                    name="regulation"
                />
            </Tabs>
        </>
    );
}

