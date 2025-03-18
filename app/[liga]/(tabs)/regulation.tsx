import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function Regulation() {
    return (
        <View className='bg-[#041433] h-screen flex flex-column justify-start'>
            <Stack.Screen
                options={{
                    headerTitle: 'Reglamento'
                }}
            />
        </View>
    )
}