import { View, Text, FlatList } from "react-native";
import { theme } from "../../tailwind.config";

export default function Birth({ liga, birth }: { liga: string, birth: string }) {
    return (
        <View className="px-2">
            <View className="flex justify-center items-center mt-5">
                <Text
                    style={{ backgroundColor: theme?.[liga]?.colors?.secondary }}
                    className={`h-8 w-full rounded-t-lg flex justify-center items-center text-white font-bold text-base`} >Fecha de nacimineto</Text>
            </View>
            <FlatList
                data={Array(birth)}
                keyExtractor={(_item) => birth || ''}
                renderItem={(_item) => <>
                    <View className="flex justify-center items-center">
                        <Text
                            style={{ backgroundColor: theme?.[liga]?.colors?.table, color: theme?.[liga]?.colors?.text }}
                            className={`h-8 flex items-center justify-center w-full rounded-b-lg text-base font-bold`} >{birth ? birth.split('-').reverse().join('/') : 'Sin información'}</Text>
                    </View>
                </>}
            />
        </View>
    )
}