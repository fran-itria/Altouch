import { Pressable, Text, View } from "react-native";
import { theme } from "../../tailwind.config";
import { ButtonsStepsProps } from "../../types/CreateTypes";

export default function ButtonSteps({ liga, nextStep, steps, setSteps }: ButtonsStepsProps) {
    console.log(steps)
    return steps == 0 ?
        <Pressable
            style={{ backgroundColor: theme?.[liga]?.colors?.secondary }}
            className="mb-5 flex justify-center items-center h-8 rounded-full"
            onPress={() => nextStep()}
        >
            <Text
                style={{ color: theme?.[liga]?.colors?.text }}
                className="font-bold text-base"
            >
                Siguiente
            </Text>
        </Pressable> :
        steps == 1 || steps == 2 ?
            <View className="mb-5 flex flex-row justify-center">
                <Pressable
                    style={{ backgroundColor: theme?.[liga]?.colors?.back }}
                    className="w-1/2 flex justify-center items-center h-8 rounded-full"
                    onPress={() => setSteps(prev => prev - 1)}
                >
                    <Text
                        style={{ color: theme?.[liga]?.colors?.text }}
                        className="font-bold text-base"
                    >
                        Atrás
                    </Text>
                </Pressable>
                <Pressable
                    style={{ backgroundColor: theme?.[liga]?.colors?.secondary }}
                    className="w-1/2 flex justify-center items-center h-8 rounded-full"
                    onPress={() => setSteps(prev => prev + 1)}
                >
                    <Text
                        style={{ color: theme?.[liga]?.colors?.text }}
                        className="font-bold text-base"
                    >
                        Siguiente
                    </Text>
                </Pressable>
            </View>
            :
            null
}