import React from "react";
import { Stack, Tabs, useLocalSearchParams } from "expo-router";
import { BallIcon, CalendarIcon, FairPlayIcon, PositionsIcon, RegulationIcon } from "../../../Icons";

export default function TabsLayout() {
    const { division } = useLocalSearchParams() as { division: string };
    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: `${division}`,
                    headerTitleStyle: { fontWeight: "bold", fontSize: 25, },
                    headerTitleAlign: "center",
                    // headerShown: false
                }} />
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: "",
                    tabBarInactiveTintColor: "white",
                    tabBarStyle: { backgroundColor: "#1D7544" },
                    headerTitleStyle: { fontWeight: 'bold', color: 'white' },
                    headerStyle: { backgroundColor: '#041433' },
                    headerShadowVisible: false,
                    headerTitleAlign: 'center',
                }}>
                <Tabs.Screen
                    name="[division]/index"
                    options={{
                        title: "",
                        tabBarIcon: ({ color }) => <PositionsIcon color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="fixture"
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