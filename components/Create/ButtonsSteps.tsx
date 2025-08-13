import { Pressable, Text, View } from "react-native";
import { theme } from "../../tailwind.config";
import { ButtonsStepsProps } from "../../types/CreateTypes";
import { nextStep } from "./services";

export default function ButtonSteps({ liga, steps, setSteps, category, setError }: ButtonsStepsProps) {
    return steps == 0 ?
        <Pressable
            style={{ backgroundColor: theme?.[liga]?.colors?.secondary }}
            className="mb-5 flex justify-center items-center h-8 rounded-full"
            onPress={() => nextStep({ category, setError, setSteps })}
        >
            <Text
                style={{ color: theme?.[liga]?.colors?.text }}
                className="font-bold text-base"
            >
                Siguiente
            </Text>
        </Pressable> :
        steps == 1 || steps == 2 ?
            <View className="mt-5 mb-5 flex flex-row justify-around">
                <Pressable
                    style={{ backgroundColor: theme?.[liga]?.colors?.back }}
                    className="w-1/3 flex justify-center items-center h-8 rounded-full"
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
                    className="w-1/3 flex justify-center items-center h-8 rounded-full"
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