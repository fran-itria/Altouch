import { Link, Stack } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../../components/Screen';
import { BallIcon } from '../../Icons';

export default function Statics() {
    return (
        <View className='bg-[#041433] h-screen flex flex-column justify-start'>
            <Stack.Screen
                options={{
                    headerTitle: 'Estadísticas',
                }}
            />
            <View className='bg-[#041433] flex flex-row justify-around mt-2'>
                <Pressable className='border-b-2 border-[#689BFF]'>
                    <Text className='text-white w-full' style={styles.text}>Goleadores</Text>
                </Pressable>
                <Pressable>
                    <Text className='text-white' style={styles.text}>V.M Vencida</Text>
                </Pressable>
                <Pressable>
                    <Text className='text-white' style={styles.text}>Figuras</Text>
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