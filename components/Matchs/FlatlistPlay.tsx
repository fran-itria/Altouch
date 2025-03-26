import { Link } from "expo-router";
import { View, Text, Image } from "react-native";
import { theme } from "../../tailwind.config";
import { match } from "../../firebase/services";

interface Props {
    liga: string
    division: string
    item: match
}

export default function FlatlistPlay({ liga, division, item }: Props) {

    return (
        <Link
            href={{
                pathname: '/[liga]/match/[id]',
                params: { liga, division, id: item.id }
            }}
            className={`p-2 w-full flex-column items-center bg-[${theme?.[liga].colors.table}]`}
        >
            <View className="w-full flex flex-row justify-between items-center">
                <View className="w-36 flex flex-row items-center justify-around">
                    {!item.teamsMatch[0].name.includes(' ') ?
                        <Text className='flex flex-col items-center color-white font-bold'>
                            {item.teamsMatch[0].name}
                        </Text>
                        :
                        <View className="flex flex-col items-center">
                            <Text className='color-white font-bold'>
                                {item.teamsMatch[0].name.split(' ')[0]}
                            </Text>
                            <Text className='color-white font-bold'>
                                {item.teamsMatch[0].name.split(' ')[1]}
                            </Text>
                        </View>
                    }
                    <Image source={{ uri: item.teamsMatch[0].image }} style={{ width: 30, height: 30 }} />
                </View>
                <View className="flex flex-col items-center">
                    <Text className='color-black font-bold text-xs bg-white rounded-full px-2'>
                        Finalizado
                    </Text>
                    <View className="w-full flex flex-row justify-between items-center mt-1">
                        <Text className='color-white font-bold'>
                            {item.result.split('-')[0]}
                        </Text>
                        <Text className='color-white font-bold'>
                            {item.result.split('-')[1]}
                        </Text>
                    </View>
                </View>
                <View className="flex flex-row items-center w-36 justify-around">
                    <Image source={{ uri: item.teamsMatch[1].image }} style={{ width: 30, height: 30 }} />
                    {!item.teamsMatch[1].name.includes(' ') ?
                        <Text className='flex flex-col items-center color-white font-bold'>
                            {item.teamsMatch[1].name}
                        </Text>
                        :
                        <View className="flex flex-col items-center">
                            <Text className='color-white font-bold'>
                                {item.teamsMatch[1].name.split(' ')[0]}
                            </Text>
                            <Text className='color-white font-bold'>
                                {item.teamsMatch[1].name.split(' ')[1]}
                            </Text>
                        </View>
                    }
                </View>
            </View>
        </Link>
    )
}