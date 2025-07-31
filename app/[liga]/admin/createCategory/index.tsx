import { View } from "react-native";
import useLigaName from "../../../../hooks/useLigaName";
import { theme } from "../../../../tailwind.config";
import { Screen } from "../../../../components/Screen";
import { Stack } from "expo-router";
import { useState } from "react";
import Steps from "../../../../components/Create/Steps";
import Category from "../../../../components/Create/CreateCategory";
import { TeamType } from "../../../../types/CreateTypes";

export default function CreateCategory() {
    const { liga } = useLigaName()
    const [category, setCategory] = useState<
        {
            name?: string,
            teamsNumber?: number,
            teams?: TeamType[]
        }>();
    const [steps, setSteps] = useState<number>(0);

    return (
        <View>
            <Screen background={theme?.[liga]?.colors?.primary}>
                <Stack.Screen
                    options={{
                        headerTitle: 'Crear Categoria',
                        headerStyle: { backgroundColor: theme?.[liga]?.colors?.primary },
                        headerShadowVisible: false,
                        headerTintColor: theme?.[liga]?.colors?.text,

                    }}
                />
                <View className="px-4">
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
                        className="mt-5 p-5"
                    >
                        <Steps liga={liga} step={steps} />
                        {steps == 0 ?
                            <Category liga={liga} setCategory={setCategory} setSteps={setSteps} category={category} />
                            :
                            null}
                    </View>
                </View>
            </Screen>
        </View>
    );
}