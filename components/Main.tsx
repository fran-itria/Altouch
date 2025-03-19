import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
    return (
        <View>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerShadowVisible: false
                }}
            />
            <View className='flex flex-col h-screen items-center justify-start p-10'>
                <Text> Bienvenido a la aplicacion de Ligas</Text>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontVariant: ['small-caps']
    }
});