import { View, ScrollView } from "react-native";
import { ReactNode } from "react";

export function Screen({ children, background }: { children: ReactNode, background: string }) {
    return (
        <ScrollView className={`bg-[${background}] h-screen flex flex-column justify-start`}>
            {children}
        </ScrollView>
    )
}