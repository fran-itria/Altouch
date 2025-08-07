import { View } from "react-native";
import useLigaName from "../../../../hooks/useLigaName";
import { theme } from "../../../../tailwind.config";
import { Screen } from "../../../../components/Screen";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import Steps from "../../../../components/Create/Steps";
import Category from "../../../../components/Create/CreateCategory";
import { TeamType } from "../../../../types/CreateTypes";
import CreateTeams from "../../../../components/Create/CreateTeams";
import ButtonSteps from "../../../../components/Create/ButtonsSteps";

export default function CreateCategory() {
    const { liga } = useLigaName()
    const [category, setCategory] = useState<
        {
            name?: string,
            teamsNumber?: number,
            teams?: TeamType[]
        }>();
    const [steps, setSteps] = useState<number>(0);

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

    useEffect(() => console.log(category), [category])
    return (
        <Screen background={theme?.[liga]?.colors?.primary}>
            <Stack.Screen
                options={{
                    headerTitle: 'Crear Categoria',
                    headerStyle: { backgroundColor: theme?.[liga]?.colors?.primary },
                    headerShadowVisible: false,
                    headerTintColor: theme?.[liga]?.colors?.text,
                    headerTitleAlign: 'center'
                }}
            />
            <View className="p-2">
                <View
                    style={{
                        borderWidth: 2,
                        borderTopStartRadius: 0,
                        borderTopEndRadius: 0,
                        borderBottomStartRadius: 20,
                        borderBottomEndRadius: 20,
                        borderBottomWidth: 4,
                        borderColor: theme?.[liga]?.colors?.secondary
                    }}
                    className="h-full"
                >
                    <View className="h-full px-2 flex flex-col justify-between">
                        <Steps liga={liga} step={steps} />
                        {steps == 0 ?
                            <Category liga={liga} setCategory={setCategory} category={category} error={error} />
                            :
                            steps == 1 ?
                                <CreateTeams liga={liga} setCategory={setCategory} setSteps={setSteps} />
                                :
                                null
                        }
                        <ButtonSteps liga={liga} nextStep={nextStep} steps={steps} setSteps={setSteps} />
                    </View>
                </View>
            </View>
        </Screen >
    );
}