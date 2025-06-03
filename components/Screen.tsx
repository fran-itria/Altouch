import { ScrollView } from "react-native";
import { ReactNode } from "react";

export function Screen({ children, background }: { children: ReactNode, background: string }) {
    return (
        <ScrollView style={{ backgroundColor: background }} className={`h-screen flex flex-column justify-start`}>
            {children}
        </ScrollView>
    )
}