import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function Regulation() {
    return (
        <View className='bg-[#041433] h-screen flex flex-column justify-start'>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerStyle: { backgroundColor: '#041433' },
                    headerTitle: 'Reglamento',
                    headerTitleStyle: { fontWeight: 'bold', color: 'white' },
                    headerShadowVisible: false,
                }}
            />
        </View>
    )
}