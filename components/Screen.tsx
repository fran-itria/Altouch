import { StyleSheet, View } from "react-native";
import { ReactNode } from "react";

export function Screen({ children }: { children: ReactNode }) {
    return (
        <View style={styles.container}>
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