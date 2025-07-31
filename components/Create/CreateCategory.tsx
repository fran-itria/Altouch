import { View, Text, TextInput, Pressable } from "react-native"
import { theme } from "../../tailwind.config";
import { CreateCategoryProps } from "../../types/CreateTypes";
import { useState } from "react";

export default function Category({ liga, category, setCategory, setSteps }: CreateCategoryProps) {
    const [error, setError] = useState<{ name?: string, teamsNumber?: string } | null>(null);
    const nextStep = () => {
        if (!category?.name) {
            setError((prev) => ({ ...prev, name: "El nombre de la categoría es obligatorio" }));
        } else {
            setError((prev) => ({ ...prev, name: undefined }));
        }
        if (!category?.teamsNumber) {
            setError((prev) => ({ ...prev, teamsNumber: "La cantidad de equipos es obligatoria" }));
        } else {
            setError((prev) => ({ ...prev, teamsNumber: undefined }));
        }
        if (category?.name && category?.teamsNumber) {
            setError(null);
            setSteps(1);
        }
    }
    return <View className="h-72 flex flex-col justify-around">
        <View>
            <Text
                style={{ color: theme?.[liga]?.colors?.text }}
                className="px-2 font-bold text-lg">
                Nombre de la categoría
            </Text>
            <TextInput
                autoFocus={true}
                keyboardType="default"
                className="font-bold rounded-full bg-white mt-2 p-2"
                onChangeText={(text) => setCategory((prev) => ({ ...prev, name: text }))}
            >
            </TextInput>
            <Text className={`${!error?.name ? 'invisible' : 'visible'} text-red-400 text-base m-2`}>* {error?.name && error.name}</Text>
        </View>
        <View>
            <Text
                style={{ color: theme?.[liga]?.colors?.text }}
                className="px-2 font-bold text-lg">
                Cantidad de equipos
            </Text>
            <TextInput
                keyboardType="number-pad"
                className="font-bold rounded-full bg-white mt-2 p-2"
                onChangeText={(text) => setCategory((prev) => ({ ...prev, teamsNumber: Number(text) }))}
            >
            </TextInput>
            <Text className={`${!error?.teamsNumber ? 'invisible' : 'visible'} text-red-400 text-base m-2`}>* {error?.teamsNumber && error.teamsNumber}</Text>
        </View>
        <Pressable
            style={{ backgroundColor: theme?.[liga]?.colors?.secondary }}
            className="mt-5 p-2 rounded-full items-center"
            onPress={() => nextStep()}
        >
            <Text
                style={{ color: theme?.[liga]?.colors?.text }}
                className="font-bold text-base"
            >
                Siguiente
            </Text>
        </Pressable>
    </View>
}