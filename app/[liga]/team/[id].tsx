import { Link, Stack, useLocalSearchParams } from "expo-router";
import { Button, FlatList, Image, Platform, Text, View } from "react-native";
import { Screen } from "../../../components/Screen";
import { theme } from "../../../tailwind.config";
import { useEffect, useState } from "react";
import { getOneTeam, player, updateTeam } from "../../../firebase/services";
import * as ImagePicker from "expo-image-picker";
require('../../../assets/Logo.png')

export default function Team() {
    const { liga, division, team }: { team: string, liga: string, division: string } = useLocalSearchParams();
    const [players, setPlayers] = useState<player[]>([]);
    const [image, setImage] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const players = await getOneTeam(liga, division, team)
            // await updateTeam(team, players[0].team, require('../../../assets/Logo.png'))
            setPlayers(players)
        })()
    }, [])

    const pickImage = async () => {
        // Solicitar permisos para acceder a la galería
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Se requieren permisos para acceder a la galería.');
                return;
            }
        }

        // Seleccionar una imagen
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    useEffect(() => console.log(image), [image])

    return (
        <Screen background={theme?.[liga]?.colors?.primary || '#b91c1c'}>
            <Stack.Screen
                options={{
                    headerTitle: `${team}`,
                    // headerLeft: undefined,
                    headerRight: undefined,
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontWeight: 'bold', color: 'white', fontSize: 25 },
                }}
            />
            <View className="p-4">
                <View className={`rounded-t-lg flex flex-row justify-around bg-[#1D7544] p-2 border-b-2 border-b-black`}>
                    <Text className='w-36 text-center font-bold color-white'>Jugadores</Text>
                </View>
                <View className={`flex flex-row justify-around bg-[${theme?.[liga].colors.secondary}] p-2 border-b-2 border-b-black`}>
                    <Text className='w-36 text-center font-bold color-white w-60'>Nombre</Text>
                    <Text className='w-36 text-center font-bold color-[#FFF600]'>TA</Text>
                    <Text className='w-36 text-center font-bold color-[#0900FF]'>TA</Text>
                    <Text className='w-36 text-center font-bold color-[#FF0000]'>TR</Text>
                    <Text className='w-36 text-center font-bold color-white'>FIG</Text>
                    <Text className='w-36 text-center font-bold color-white'>GOL</Text>
                </View>
                <FlatList
                    data={players}
                    keyExtractor={(item) => item.id ? item.id : item.name}
                    renderItem={({ item }) => (
                        <Link
                            className={`rounded-b-lg flex flex-row justify-around bg-[#1E1E1E] p-2`}
                            href={{
                                pathname: '/[liga]/team/[id]',
                                params: { liga, division, id: item.id, team: item.name }
                            }}
                            key={item.id}
                        >
                            <Text className='w-36 text-center color-white font-bold text-sm w-60'>{item.name} {item.surname}</Text>
                            <Text className='w-36 text-center color-white font-bold text-sm'>{item.yellowCard}</Text>
                            <Text className='w-36 text-center color-white font-bold text-sm'>{item.blueCard}</Text>
                            <Text className='w-36 text-center color-white font-bold text-sm'>{item.redCard}</Text>
                            <Text className='w-36 text-center color-white font-bold text-sm'>{item.star}</Text>
                            <Text className='w-36 text-center color-white font-bold text-sm'>{item.goals}</Text>
                        </Link>
                    )}
                />
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Button title="Seleccionar Imagen" onPress={pickImage} />
                    {image && <View>
                        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                        <Button title="Subir" onPress={() => updateTeam(team, players[0].team, image)}></Button>
                    </View>}
                </View>
            </View>
        </Screen>
    )
}