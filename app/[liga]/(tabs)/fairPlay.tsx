import { Link, Stack } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function FairPlay() {
    return (
        <View className='bg-[#041433] h-screen flex flex-column justify-start'>
            <Stack.Screen
                options={{
                    headerTitle: 'Fair Play',
                }}
            />
            <View className='bg-[#041433] flex flex-row justify-around mt-2'>
                <Pressable className='border-b-2 border-[#689BFF]'>
                    <Text className='text-white w-full' style={styles.text}>Fair Play</Text>
                </Pressable>
                <Pressable>
                    <Text className='text-white' style={styles.text}>Suspendidos</Text>
                </Pressable>
                <Pressable>
                    <Text className='text-white' style={styles.text}>Tarjetas</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
    }
});