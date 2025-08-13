import { Pressable, Text, TextInput, View } from "react-native";
import { theme } from "../../tailwind.config";
import { CreatePlayerProps, PlayerType } from "../../types/CreateTypes";
import { useEffect, useState } from "react";
import { AddPlayerIcon } from "../../Icons";
import { add, edit } from "./services";

export function CreatePlayer({ totalPlayers, index, liga, setTeam, setTotalPlayers }: CreatePlayerProps) {
    const [player, setPlayer] = useState<PlayerType>({
        birth: "",
        dni: 0,
        blueCard: 0,
        goals: 0,
        name: "",
        redCard: 0,
        star: 0,
        surname: "",
        suspension: 0,
        totalSuspension: 0,
        yellowCard: 0,
        matchs: [],
        division: []
    })
    const [error, setError] = useState<string | null>(null)

    return (
        <View className="rounded-lg px-2 mt-5 mb-5" style={{ backgroundColor: theme?.[liga]?.colors?.tertiary }}>
            <Text style={{ color: theme?.[liga]?.colors?.text }} className="mt-3 text-center font-bold text-lg">Jugador {index + 1}</Text>
            <View className="mb-3">
                <Text
                    style={{ color: theme?.[liga]?.colors?.text }}
                    className="px-2 font-bold text-lg"
                >
                    Fecha de nacimiento
                </Text>
                <TextInput
                    textContentType="birthdate"
                    className="rounded-full bg-white mt-2 p-2 font-bold"
                    onChangeText={(text) => setPlayer({ ...player, birth: text })}
                />
            </View>
            <View className="mb-3">
                <Text
                    style={{ color: theme?.[liga]?.colors?.text }}
                    className="px-2 font-bold text-lg"
                >
                    DNI
                </Text>
                <TextInput
                    keyboardType="phone-pad"
                    className="rounded-full bg-white mt-2 p-2 font-bold"
                    onChangeText={(text) => setPlayer({ ...player, dni: Number(text) })}
                />
            </View>
            <View className="mb-3">
                <Text
                    style={{ color: theme?.[liga]?.colors?.text }}
                    className="px-2 font-bold text-lg"
                >
                    Nombre
                </Text>
                <TextInput
                    keyboardType="phone-pad"
                    className="rounded-full bg-white mt-2 p-2 font-bold"
                    onChangeText={(text) => setPlayer({ ...player, name: text })}
                />
            </View>
            <View className="mb-3">
                <Text
                    style={{ color: theme?.[liga]?.colors?.text }}
                    className="px-2 font-bold text-lg"
                >
                    Apellido
                </Text>
                <TextInput
                    keyboardType="phone-pad"
                    className="rounded-full bg-white mt-2 p-2 font-bold"
                    onChangeText={(text) => setPlayer({ ...player, surname: text })}
                />
            </View>
            <Text className={`${!error ? 'invisible' : 'visible'} text-red-400 text-base m-2`}>* {error}</Text>
            {
                index == totalPlayers - 1 ? (
                    <Pressable
                        className="mb-3 flex flex-row justify-center items-center"
                        onPress={() => add(setTeam, setTotalPlayers, player, setError)}
                    >
                        <AddPlayerIcon size={30} color={theme?.[liga]?.colors?.text} />
                    </Pressable>
                )
                    :
                    <Pressable
                        className="mt-3 mb-3 flex flex-row justify-center items-center"
                        onPress={() => edit(setTeam, index, player)}
                    >
                        <Text
                            style={{ backgroundColor: theme?.[liga]?.colors?.edit, color: theme?.[liga]?.colors?.text }}
                            className="text-lg font-bold rounded-full px-3"
                        >
                            Confirmar edición
                        </Text>
                    </Pressable>
            }
        </View>
    )
}