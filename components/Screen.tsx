import { StyleSheet, View } from "react-native";
import { ReactNode } from "react";

export function Screen({ children, background }: { children: ReactNode, background: string }) {

    console.log('background', background)
    return (
        <View className={`bg-[${background}] h-screen flex flex-column justify-start`}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#041433',
        justifyContent: 'center',
        alignItems: 'center',
    }
})