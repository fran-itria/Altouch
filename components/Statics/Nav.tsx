import { View, Pressable, Text } from "react-native";
import { StaticsEnum } from "../../app/[liga]/(tabs)/statics";
import { theme } from "../../tailwind.config";

interface Props {
    liga: string
    activeStats: StaticsEnum
    setActiveStats: React.Dispatch<React.SetStateAction<StaticsEnum>>
}

export default function StaticsNav({ liga, activeStats, setActiveStats }: Props) {
    return (
        <View className='flex flex-row justify-around mt-2'>
            <Pressable
                style={{ borderColor: theme?.[liga]?.colors?.secondary }}
                className={`${activeStats == StaticsEnum.GOALS ? 'border-b-4 transition-all' : 'border-none'}`}
                onPress={() => setActiveStats(StaticsEnum.GOALS)}
            >
                <Text
                    style={{ color: theme?.[liga]?.colors?.text }}
                    className='text-xl font-bold'>
                    Goleadores
                </Text>
            </Pressable>
            <Pressable
                style={{ borderColor: theme?.[liga]?.colors?.secondary }}
                className={`${activeStats == StaticsEnum.DEFEATED ? 'border-b-4 transition-all' : 'border-none'}`}
                onPress={() => setActiveStats(StaticsEnum.DEFEATED)}
            >
                <Text
                    style={{ color: theme?.[liga]?.colors?.text }}
                    className='text-xl font-bold'>
                    V.M Vencida
                </Text>
            </Pressable>
            <Pressable
                style={{ borderColor: theme?.[liga]?.colors?.secondary }}
                className={`${activeStats == StaticsEnum.STARS ? 'border-b-4 transition-all' : 'border-none'}`}
                onPress={() => setActiveStats(StaticsEnum.STARS)}
            >
                <Text
                    style={{ color: theme?.[liga]?.colors?.text }}
                    className='text-xl font-bold'>
                    Figuras
                </Text>
            </Pressable>
        </View>
    )
}