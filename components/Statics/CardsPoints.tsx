import { FlatList, Text, View } from "react-native";
import { theme } from "../../tailwind.config";
import { Card } from "../../Icons";

interface Props {
    liga: string;
    cardsPoints: { name: string, value: number }[]
}

export default function CardsPoints({ liga, cardsPoints }: Props) {
    const arrayImage = [<Card color="#FFF600" />, <Card color="#0900FF" />, <Card color="#FF0000" />]
    return (
        <View className={`w-full px-2 mt-10 mb-10`}>
            <View
                style={{ backgroundColor: theme?.[liga]?.colors?.secondary }}
                className={`rounded-t-lg px-2 h-8 w-full flex flex-row justify-between items-center `}
            >
                <Text style={{ color: theme?.[liga]?.colors?.text }} className="font-bold">Valor de las tarjetas</Text>
            </View>
            <FlatList
                data={cardsPoints}
                keyExtractor={(item) => item.name}
                style={{ borderBottomEndRadius: 8, borderBottomStartRadius: 8 }}
                renderItem={({ item, index }) => (
                    <View
                        style={{ backgroundColor: theme?.[liga]?.colors?.table }}
                        className={`${cardsPoints && index < cardsPoints.length - 1 ? 'border-b border-gray-700' : 'border-0'} px-2 h-12 flex flex-row justify-start items-center`}
                    >
                        {arrayImage[index]}
                        <Text style={{ color: theme?.[liga]?.colors?.text }} className={`${index < 3 && 'ml-3'} font-bold`}>{item.name} ({item.value} {item.value == 1 ? 'punto' : 'puntos'}) </Text>
                    </View>
                )}
            />
        </View>
    )
}