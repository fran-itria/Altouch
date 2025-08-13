import { View, Text, TextInput, Pressable, Image } from "react-native";
import { theme } from "../../tailwind.config";
import { CreateTeamComponentProps, PlayerType, TeamType } from "../../types/CreateTypes";
import { useImagePicker } from "../../hooks/useImagePicker";
import { FileIconUp, PencilIcon, TrashIcon } from "../../Icons";
import { CreatePlayer } from "./CreatePlayer";
import { useEffect, useState } from "react";

export default function CreateTeams({ category, teamNumber, liga, setCategory, setSteps }: CreateTeamComponentProps) {
    const { selectedImage, showImagePicker, setSelectedImage } = useImagePicker()
    const [team, setTeam] = useState<TeamType>({
        matches: 0,
        points: 0,
        wins: 0,
        draws: 0,
        lost: 0,
        goalsAgainst: 0,
        goalsFor: 0,
        name: "",
        image: "",
        yellowCard: 0,
        redCard: 0,
        blueCard: 0,
        absences: 0,
        players: []
    })
    const [totalPlayers, setTotalPlayers] = useState(1)
    const [error, setError] = useState<{ name?: string, players?: string }>()
    const addTeam = () => {
        if (!team.name) {
            setError((prev) => ({ ...prev, name: "El nombre del equipo es obligatorio" }))
        } else {
            setError((prev) => ({ ...prev, name: undefined }))
        }
        if (team.players.length == 0) {
            setError((prev) => ({ ...prev, players: "Debes agregar al menos un jugador" }))
        } else {
            setError((prev) => ({ ...prev, players: undefined }))
        }
        if (selectedImage) setTeam((prev) => ({ ...prev, image: selectedImage }))
        if (team.name && team.players.length > 0) {
            if (category?.teams && category.teams[teamNumber]) {
                setCategory((prev = { teams: [] }) => {
                    const teams = [...(prev.teams ?? [])];
                    teams[teamNumber] = team;
                    return { ...prev, teams };
                })
            } else {
                setCategory((prev) => ({
                    ...prev,
                    teams: prev?.teams ? [...prev.teams, team] : [team]
                }))
            }
        }
    }
    return <View
        className="rounded-lg p-2 mt-5 flex flex-col justify-around"
        style={{ backgroundColor: theme?.[liga]?.colors?.secondary }}
    >
        <View>
            <Text
                style={{ color: theme?.[liga]?.colors?.text }}
                className="px-2 font-bold text-xl text-center">
                Equipo {teamNumber + 1}
            </Text>
            <TextInput
                autoFocus={true}
                keyboardType="default"
                placeholder="Nombre del equipo"
                className="rounded-full bg-white mt-2 p-2 font-bold"
                onChangeText={(text) => setTeam((prev) => ({ ...prev, name: text }))}
            >
            </TextInput>
            <Text className={`${!error?.name ? 'invisible' : 'visible'} bg-red-200 rounded-full px-2 w-fit text-red-600 font-bold text-base mt-2`}>* {error?.name}</Text>
        </View>
        <View>
            <Text
                style={{ color: theme?.[liga]?.colors?.text }}
                className="px-2 font-bold text-lg">
                Logo del equipo
            </Text>
            <Pressable
                className={`bg-none w-fit px-2 rounded-full mt-2 items-center justify-center`}
                onPress={showImagePicker}
            >
                {selectedImage ? (
                    <View>
                        <Image
                            source={{ uri: selectedImage }}
                            className="w-20 h-20"
                        />
                        <View className="flex flex-row justify-around mt-2">
                            <Pressable onPress={showImagePicker}>
                                <PencilIcon color="#60a5fa" />
                            </Pressable>
                            <Pressable onPress={() => setSelectedImage(null)}>
                                <TrashIcon color={theme?.[liga]?.colors?.back} />
                            </Pressable>
                        </View>
                    </View>
                ) : (
                    <FileIconUp color={theme?.[liga]?.colors?.text} size={30} />
                )}
            </Pressable>
        </View>
        {totalPlayers > 0 && [...Array(totalPlayers)].map((_, index) => {
            return <CreatePlayer
                key={index}
                totalPlayers={totalPlayers}
                index={index}
                liga={liga}
                setTeam={setTeam}
                setTotalPlayers={setTotalPlayers}
            />
        })}
        <Text className={`${!error?.players ? 'invisible' : 'visible'} mb-5 text-red-600 font-bold text-base bg-red-200 w-fit rounded-full px-2`}>* {error?.players}</Text>
        <Pressable onPress={() => addTeam()}>
            <Text
                className="border border-2 bg-green-400 text-center text-xl font-semibold rounded-full px-3"
            >
                Confirmar/Editar equipo
            </Text>
        </Pressable>
    </View>
}