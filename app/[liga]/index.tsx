import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, Pressable, Text, View } from 'react-native';
import { Screen } from '../../components/Screen';

import { useEffect, useState } from 'react';
import { getDivisions } from '../../firebase/services';

import { theme } from "../../tailwind.config";
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../firebase/firebaseConfig';
import useLigaName from '../../hooks/useLigaName';
import { AddIcon } from '../../Icons';

export default function App() {
    const { liga } = useLigaName();
    const [divisions, setDivisions] = useState<{ id: string, categoria: string; }[]>([]);
    const [logo, setLogo] = useState<string>();
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const location = useLocalSearchParams()
    useEffect(() => {
        (async () => {
            const imageRef = ref(storage, `Futbol/Logos/${liga}.png`)
            const url = await getDownloadURL(imageRef);
            if (url) setLogo(url);
            const response = await getDivisions(liga);
            setDivisions(response);
            if (location.adminAccess && location.id)
                setIsAdmin(!!location.adminAccess);
        })()
    }, [])

    return (
        <View>
            <Screen background={theme?.[liga]?.colors?.primary}>
                <Stack.Screen
                    options={{
                        headerShown: true,
                        headerShadowVisible: false,
                        headerStyle: { backgroundColor: theme?.[liga]?.colors?.primary },
                        headerTintColor: theme?.[liga]?.colors?.text,
                        headerLeft: () => null,
                    }}
                />
                <View className='flex flex-col h-screen items-center justify-start p-10'>
                    <Image source={{ uri: logo }} style={{ width: 300, height: 300, borderRadius: '100%' }} />
                    <Text className='text-2xl font-bold underline underline-offset-8' style={{ color: theme?.[liga]?.colors?.text }}>Seleccione la categoría</Text>
                    {divisions.map((division, i) => (
                        <View key={division.id} className={`${division.categoria == 'Regulation' && 'hidden'}`}>
                            <Link href={`/${liga}/${division.categoria}`} asChild>
                                <Pressable
                                    style={{
                                        backgroundColor: theme?.[liga]?.colors?.secondary,
                                    }}
                                    className={`rounded-full mt-5 pl-5 pr-5 pb-2 pt-2`}>
                                    <Text
                                        style={{ color: theme?.[liga]?.colors?.text }}
                                        className='font-bold text-xl'
                                    >
                                        {division.categoria}
                                    </Text>
                                </Pressable>
                            </Link>
                        </View>
                    ))}
                    {isAdmin &&
                        <Link href={`/${liga}/admin/createCategory`} asChild>
                            <Pressable
                                style={{
                                    backgroundColor: theme?.[liga]?.colors?.secondary,
                                }}
                                className={`rounded-full mt-5 pl-5 pr-5 pb-2 pt-2`}>
                                <View className='flex flex-row items-center justify-between'>
                                    <AddIcon />
                                    <Text
                                        style={{ color: theme?.[liga]?.colors?.text }}
                                        className='ml-2 font-bold text-xl flex items-center'
                                    >
                                        Categoría
                                    </Text>
                                </View>
                            </Pressable>
                        </Link>
                    }
                </View>
                <StatusBar style="auto" />
            </Screen>
        </View>
    );
}