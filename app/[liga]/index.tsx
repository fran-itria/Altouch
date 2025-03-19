import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../../components/Screen';

import { useEffect, useState } from 'react';
import { getDivisions } from '../../firebase/services';

import { theme } from "../../tailwind.config";

export default function App() {
    const { liga }: { liga: string } = useLocalSearchParams()
    const [divisions, setDivisions] = useState<{ id: string, categoria: string; }[]>([]);
    useEffect(() => {
        (async () => {
            const response = await getDivisions(liga);
            setDivisions(response);
        })()
    }, [])

    return (
        <ScrollView>
            <Screen background={theme?.[liga]?.colors?.primary || '#b91c1c'}>
                <Stack.Screen
                    options={{
                        headerShown: true,
                        headerShadowVisible: false
                    }}
                />
                <View className='flex flex-col h-screen items-center justify-start p-10'>
                    <Image source={require('../../assets/Logo.png')} className='rounded-full w-72 h-72' />
                    <Text className='text-white font-bold underline' style={styles.text}>Seleccione la categoría</Text>
                    {divisions.map((division, i) => (
                        <View key={division.id}>
                            <Link href={`/${liga}/${division.categoria}`} asChild>
                                <Pressable
                                    className='active:bg-[#009558] active:border-transparent rounded-full border-red-300 mt-5 pl-5 pr-5 pb-2 pt-2 bg-[#00311D]'>
                                    <Text
                                        className='text-white font-bold'
                                        style={styles.text}
                                    >
                                        {division.categoria}
                                    </Text>
                                </Pressable>
                            </Link>
                        </View>
                    ))}
                </View>
                <StatusBar style="auto" />
            </Screen>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontVariant: ['small-caps']
    }
});