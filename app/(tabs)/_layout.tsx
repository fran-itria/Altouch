import React from "react";
import { Stack, Tabs, useLocalSearchParams } from "expo-router";
import { BallIcon, CalendarIcon, PositionsIcon } from "../../Icons";

export default function TabsLayout() {
    const { division } = useLocalSearchParams();
    return (
        <>
            <Stack.Screen
                options={{
                    headerTintColor: "white",
                    headerTitle: `${division}`,
                    headerLeft: undefined,
                }} />
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: "blue",
                    tabBarInactiveTintColor: "black"
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