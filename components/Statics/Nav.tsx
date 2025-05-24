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
                className={`${activeStats == StaticsEnum.GOLEADORES ? 'border-b-4 transition-all' : 'border-none'}`}
                onPress={() => setActiveStats(StaticsEnum.GOLEADORES)}
            >
                <Text className='text-white text-xl font-bold'>Goleadores</Text>
            </Pressable>
            <Pressable
                style={{ borderColor: theme?.[liga]?.colors?.secondary }}
                className={`${activeStats == StaticsEnum.VENCIDA ? 'border-b-4 transition-all' : 'border-none'}`}
                onPress={() => setActiveStats(StaticsEnum.VENCIDA)}
            >
                <Text className='text-white text-xl font-bold'>V.M Vencida</Text>
            </Pressable>
            <Pressable
                style={{ borderColor: theme?.[liga]?.colors?.secondary }}
                className={`${activeStats == StaticsEnum.FIGURAS ? 'border-b-4 transition-all' : 'border-none'}`}
                onPress={() => setActiveStats(StaticsEnum.FIGURAS)}
            >
                <Text className='text-white text-xl font-bold'>Figuras</Text>
            </Pressable>
        </View>
    )
}