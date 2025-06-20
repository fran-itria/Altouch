import { View, Pressable, Text } from "react-native";
import { StaticsEnum } from "../app/[liga]/(tabs)/statics";
import { theme } from "../tailwind.config";
import { FairPlayEnum } from "../app/[liga]/(tabs)/fairPlay";
import { useEffect } from "react";

interface Props {
    liga: string
    active: StaticsEnum | FairPlayEnum
    setActiveStats?: React.Dispatch<React.SetStateAction<StaticsEnum>>
    setActiveFairPlay?: React.Dispatch<React.SetStateAction<FairPlayEnum>>
}

export default function SubNav({ liga, active, setActiveStats, setActiveFairPlay }: Props) {
    return (
        <View className='flex flex-row justify-around mt-2'>
            <Pressable
                style={{ borderColor: theme?.[liga]?.colors?.secondary }}
                className={`${(active == StaticsEnum.GOALS || active == FairPlayEnum.FAIRPLAY) ? 'border-b-4 transition-all' : 'border-none'}`}
                onPress={() => {
                    if (setActiveStats) setActiveStats(StaticsEnum.GOALS)
                    else if (setActiveFairPlay) setActiveFairPlay(FairPlayEnum.FAIRPLAY)
                }}
            >
                <Text
                    style={{ color: theme?.[liga]?.colors?.text }}
                    className='text-xl font-bold'>
                    {setActiveStats ? 'Goleadores' : 'Fair Play'}
                </Text>
            </Pressable>
            <Pressable
                style={{ borderColor: theme?.[liga]?.colors?.secondary }}
                className={`${(active == StaticsEnum.DEFEATED || active == FairPlayEnum.DISCIPLINE) ? 'border-b-4 transition-all' : 'border-none'}`}
                onPress={() => {
                    if (setActiveStats) setActiveStats(StaticsEnum.DEFEATED)
                    else if (setActiveFairPlay) setActiveFairPlay(FairPlayEnum.DISCIPLINE)
                }}
            >
                <Text
                    style={{ color: theme?.[liga]?.colors?.text }}
                    className='text-xl font-bold'>
                    {setActiveStats ? 'V.M Vencida' : 'Suspendidos'}
                </Text>
            </Pressable>
            <Pressable
                style={{ borderColor: theme?.[liga]?.colors?.secondary }}
                className={`${(active == StaticsEnum.STARS || active == FairPlayEnum.CARDS) ? 'border-b-4 transition-all' : 'border-none'}`}
                onPress={() => {
                    if (setActiveStats) setActiveStats(StaticsEnum.STARS)
                    else if (setActiveFairPlay) setActiveFairPlay(FairPlayEnum.CARDS)
                }}
            >
                <Text
                    style={{ color: theme?.[liga]?.colors?.text }}
                    className='text-xl font-bold'>
                    {setActiveStats ? 'Figuras' : 'Tarjetas'}
                </Text>
            </Pressable>
        </View>
    )
}