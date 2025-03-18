import { Stack, useNavigation, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Screen } from './Screen';

export default function App() {
    return (
        <Screen>
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
        </Screen>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontVariant: ['small-caps']
    }
});