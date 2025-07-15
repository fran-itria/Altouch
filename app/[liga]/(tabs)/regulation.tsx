import { Stack } from 'expo-router';
import { Screen } from '../../../components/Screen';
import useLigaName from '../../../hooks/useLigaName';
import { theme } from "../../../tailwind.config";
import { useEffect, useState } from 'react';
import { getRegulationLeague } from '../../../firebase/services';
import { View, Text, Image } from 'react-native';
import Loading from '../../../components/Loading';
import { storage } from '../../../firebase/firebaseConfig';
import { ref, getDownloadURL } from 'firebase/storage';

export default function Regulation() {
    const { liga } = useLigaName()
    const [regulation, setRegulation] = useState<string>()
    const [image, setImage] = useState<string>()
    useEffect(() => {
        (async () => {
            const regulationResponse = await getRegulationLeague(liga)
            const imageRef = ref(storage, `Futbol/Logos/Arbitro.jpg`);
            const url = await getDownloadURL(imageRef);
            if (url) setImage(url);
            setRegulation(regulationResponse)
        })()
    }, [])
    useEffect(() => console.log(regulation), [regulation])
    return (
        <Screen background={theme?.[liga]?.colors?.primary}>
            <Stack.Screen
                options={{
                    headerTitle: 'Reglamento'
                }}
            />
            {!regulation && <Loading />}
            <View className='px-2'>
                <Image source={{ uri: image }} style={{ height: 200 }} />
            </View>
            <View className='px-2 py-2'>
                <View className='p-4 phone:flex phone:items-center phone:justify-center border border-gray-300 '>
                    <Text style={{ color: theme?.[liga]?.colors?.text }} className='font-bold'>{regulation}</Text>
                </View>
            </View>
        </Screen>
    )
}