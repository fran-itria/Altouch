import React from "react";
import { Stack, Tabs, useLocalSearchParams } from "expo-router";
import { BallIcon, CalendarIcon, FairPlayIcon, PositionsIcon, RegulationIcon } from "../../Icons";
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
                initialRouteName="[division]"
                screenOptions={{
                    tabBarActiveTintColor: "",
                    tabBarInactiveTintColor: "white",
                    headerShown: false,
                    tabBarStyle: { backgroundColor: "#1D7544" },
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
                    name="statics"
                    options={{
                        title: "",
                        tabBarIcon: ({ color }) => <BallIcon color={color} />
                    }}
                />
                <Tabs.Screen
                    name="fairPlay"
                    options={{
                        title: "",
                        tabBarIcon: ({ color }) => <FairPlayIcon color={color} />
                    }}
                />
                <Tabs.Screen
                    name="regulation"
                    options={{
                        title: "",
                        tabBarIcon: ({ color }) => <RegulationIcon color={color} />
                    }}
                />
            </Tabs>
        </>
    )
} 