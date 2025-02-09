import React from "react";
import { Stack, Tabs, useLocalSearchParams } from "expo-router";
import { BallIcon, CalendarIcon, PositionsIcon } from "../../Icons";
import { Image } from "react-native";

export default function TabsLayout() {
    const { division } = useLocalSearchParams() as { division: string };
    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: `${division}`,
                    headerLeft: () => undefined,
                    headerTitleStyle: { fontWeight: "bold" }
                }} />
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: "blue",
                    tabBarInactiveTintColor: "black",
                    headerShown: false,
                }}>
                <Tabs.Screen
                    name="[division]"
                    options={{
                        title: "",
                        tabBarIcon: ({ color }) => <PositionsIcon color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="matchs"
                    options={{
                        title: "",
                        tabBarIcon: ({ color }) => <CalendarIcon color={color} />
                    }}
                />
                <Tabs.Screen
                    name="about"
                    options={{
                        title: "",
                        tabBarIcon: ({ color }) => <BallIcon color={color} />
                    }}
                />
            </Tabs>
        </>
    )
} 