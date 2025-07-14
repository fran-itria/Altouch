import { View, Pressable, Text, useWindowDimensions } from "react-native";
import { StaticsEnum } from "../app/[liga]/(tabs)/statics";
import { theme } from "../tailwind.config";

interface Props {
    liga: string
    active: StaticsEnum
    setActiveStats: React.Dispatch<React.SetStateAction<StaticsEnum>>
}

export default function SubNav({ liga, active, setActiveStats }: Props) {
    const { width } = useWindowDimensions()
    return (
        <View className='phone:grid phone:grid-cols-3 grid-center flex flex-row justify-around mt-2'>
            <Pressable
                style={{ borderColor: theme?.[liga]?.colors?.secondary }}
                className={`phone:flex phone:justify-center phone:items-center ${active == StaticsEnum.FAIRPLAY ? 'border-b-4 transition-all' : 'border-none'}`}
                onPress={() => setActiveStats(StaticsEnum.FAIRPLAY)}
            >
                <Text
                    style={{ color: theme?.[liga]?.colors?.text }}
                    className='text-xl font-bold'>
                    Fair Play
                </Text>
            </Pressable>
            <Pressable
                style={{ borderColor: theme?.[liga]?.colors?.secondary }}
                className={`phone:flex phone:justify-center phone:items-center ${active == StaticsEnum.DISCIPLINE ? 'border-b-4 transition-all' : 'border-none'}`}
                onPress={() => setActiveStats(StaticsEnum.DISCIPLINE)}
            >
                <Text
                    style={{ color: theme?.[liga]?.colors?.text }}
                    className='text-xl font-bold'>
                    Suspendidos
                </Text>
            </Pressable>
            <Pressable
                style={{ borderColor: theme?.[liga]?.colors?.secondary }}
                className={`phone:flex phone:justify-center phone:items-center ${active == StaticsEnum.GOALS ? 'border-b-4 transition-all' : 'border-none'}`}
                onPress={() => setActiveStats(StaticsEnum.GOALS)}
            >
                <Text
                    style={{ color: theme?.[liga]?.colors?.text }}
                    className='text-xl font-bold'>
                    Goleadores
                </Text>
            </Pressable>
            {width < 426 ?
                <View className="col-span-3 mt-3 flex flex-row justify-around">
                    <Pressable
                        style={{ borderColor: theme?.[liga]?.colors?.secondary }}
                        className={`${active == StaticsEnum.DEFEATED ? 'border-b-4 transition-all' : 'border-none'}`}
                        onPress={() => { setActiveStats(StaticsEnum.DEFEATED) }}
                    >
                        <Text
                            style={{ color: theme?.[liga]?.colors?.text }}
                            className='text-xl font-bold'>
                            V.M Vencida
                        </Text>
                    </Pressable>
                    <Pressable
                        style={{ borderColor: theme?.[liga]?.colors?.secondary }}
                        className={`${active == StaticsEnum.STARS ? 'border-b-4 transition-all' : 'border-none'}`}
                        onPress={() => setActiveStats(StaticsEnum.STARS)}
                    >
                        <Text
                            style={{ color: theme?.[liga]?.colors?.text }}
                            className='text-xl font-bold'>
                            Figuras
                        </Text>
                    </Pressable>
                </View>
                :
                <>
                    <Pressable
                        style={{ borderColor: theme?.[liga]?.colors?.secondary }}
                        className={`${active == StaticsEnum.DEFEATED ? 'border-b-4 transition-all' : 'border-none'}`}
                        onPress={() => { setActiveStats(StaticsEnum.DEFEATED) }}
                    >
                        <Text
                            style={{ color: theme?.[liga]?.colors?.text }}
                            className='text-xl font-bold'>
                            V.M Vencida
                        </Text>
                    </Pressable>
                    <Pressable
                        style={{ borderColor: theme?.[liga]?.colors?.secondary }}
                        className={`${active == StaticsEnum.STARS ? 'border-b-4 transition-all' : 'border-none'}`}
                        onPress={() => setActiveStats(StaticsEnum.STARS)}
                    >
                        <Text
                            style={{ color: theme?.[liga]?.colors?.text }}
                            className='text-xl font-bold'>
                            Figuras
                        </Text>
                    </Pressable>
                </>
            }
        </View>
    )
}