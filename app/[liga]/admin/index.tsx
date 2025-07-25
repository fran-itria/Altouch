import { Image, Pressable, Text, TextInput, View } from "react-native";
import useLigaName from "../../../hooks/useLigaName";
import { Screen } from "../../../components/Screen";
import { theme } from "../../../tailwind.config";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../firebase/firebaseConfig";
import { verifyPassword } from "../../../firebase/services";

export default function Admin() {
    const { liga } = useLigaName();
    const [logo, setLogo] = useState<string>();
    const [password, setPassword] = useState<string>();
    const router = useRouter()
    useEffect(() => {
        (async () => {
            const imageRef = ref(storage, `Futbol/Logos/${liga}.png`)
            const url = await getDownloadURL(imageRef);
            if (url) setLogo(url);
        })()
    }, [])
    return (
        <View>
            <Screen background={theme?.[liga]?.colors?.primary}>
                <Stack.Screen
                    options={{
                        headerTitle: 'Admin',
                        headerStyle: { backgroundColor: theme?.[liga]?.colors?.primary },
                        headerShadowVisible: false,
                        headerTitleAlign: 'center',
                        headerTintColor: theme?.[liga]?.colors?.text,
                    }}
                />
                <View className="flex h-screen justify-center items-center">
                    <Image source={{ uri: logo }} style={{ width: 300, height: 300, borderRadius: '100%' }} />
                    <View
                        style={{
                            // boxShadow: `0px 5px 0px ${theme?.[liga]?.colors?.secondary}`,
                            borderWidth: 2,
                            borderTopStartRadius: 0,
                            borderTopEndRadius: 0,
                            borderBottomStartRadius: 20,
                            borderBottomEndRadius: 20,
                            borderBottomWidth: 4,
                            borderColor: theme?.[liga]?.colors?.secondary
                        }}
                        className="mt-5 p-5"
                    >
                        <Text style={{ color: theme?.[liga]?.colors?.text }} className="font-bold text-base">Ingresar codigo de acceso</Text>
                        <TextInput
                            keyboardType="number-pad"
                            className="bg-white mt-2 p-2 focus:border-blue-500 focus:border-2"
                            onChangeText={(text) => setPassword(text)}
                        >
                        </TextInput>
                        <Pressable
                            style={{ backgroundColor: theme?.[liga]?.colors?.secondary }}
                            className="mt-5 p-2 rounded-full items-center"
                            onPress={(e) => console.log(verifyPassword(liga, router, password))}
                        >
                            <Text
                                style={{ color: theme?.[liga]?.colors?.text }}
                                className="font-bold text-base"
                            >
                                Ingresar
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </Screen>
        </View>
    )
}