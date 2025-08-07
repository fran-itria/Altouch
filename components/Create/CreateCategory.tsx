import { View, Text, TextInput } from "react-native"
import { theme } from "../../tailwind.config";
import { CreateCategoryProps } from "../../types/CreateTypes";

export default function Category({ liga, category, setCategory, error }: CreateCategoryProps) {
    return <View className="mt-5 flex flex-col justify-around">
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
                defaultValue={category?.name}
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
                defaultValue={category?.teamsNumber?.toString()}
                onChangeText={(text) => setCategory((prev) => ({ ...prev, teamsNumber: Number(text) }))}
            >
            </TextInput>
            <Text className={`${!error?.teamsNumber ? 'invisible' : 'visible'} text-red-400 text-base m-2`}>* {error?.teamsNumber && error.teamsNumber}</Text>
        </View>
    </View>
}