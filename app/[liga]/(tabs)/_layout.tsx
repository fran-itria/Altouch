import React from "react";
import { Stack, Tabs, useLocalSearchParams } from "expo-router";
import { BallIcon, CalendarIcon, FairPlayIcon, PositionsIcon, RegulationIcon } from "../../../Icons";
import { theme } from "../../../tailwind.config";

export default function TabsLayout() {
    const { liga, division } = useLocalSearchParams() as { liga: string, division: string };
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
                    tabBarStyle: { backgroundColor: theme?.[liga]?.colors?.secondary },
                    headerTitleStyle: { fontWeight: 'bold', color: 'white' },
                    headerStyle: { backgroundColor: theme?.[liga]?.colors?.primary },
                    headerShadowVisible: false,
                    headerTitleAlign: 'center',
                }}>
                <Tabs.Screen
                    name="[division]/index"
                    options={{
                        headerShown: false,
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
                    initialParams={{ liga, division }}
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