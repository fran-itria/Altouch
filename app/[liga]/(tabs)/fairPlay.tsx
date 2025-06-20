import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import Loading from '../../../components/Loading';
import SubNav from '../../../components/SubNav';
import useLigaName from '../../../hooks/useLigaName';
import { useState } from 'react';

export enum FairPlayEnum {
    FAIRPLAY = 'Fair Play',
    DISCIPLINE = 'Discipline',
    CARDS = 'Cards'
}

export default function FairPlay() {
    const { liga } = useLigaName()
    const [active, setActiveFairPlay] = useState<FairPlayEnum>(FairPlayEnum.FAIRPLAY)
    const { division } = useLocalSearchParams() as { division: string, liga: string }
    const [loading, setLoading] = useState(true)

    return (
        <View className='bg-[#041433] h-screen flex flex-column justify-start'>
            <Stack.Screen
                options={{
                    headerTitle: 'Fair Play',
                }}
            />
            {!loading ? <Loading /> :
                <View className={`${!loading ? 'blur-md' : 'blur-none'}`}>
                    <SubNav liga={liga} active={active} setActiveFairPlay={setActiveFairPlay} />
                </View>
            }
        </View>
    )
}