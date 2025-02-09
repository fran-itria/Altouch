import { Link, Stack } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../../components/Screen';
import { BallIcon } from '../../Icons';

export default function Statics() {

    return (
        <View className='bg-[#041433] h-screen flex flex-column justify-start'>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerStyle: { backgroundColor: '#00311D' },
                    headerTitle: 'Estadísticas',
                    headerTitleStyle: { fontWeight: 'bold', color: 'white' },
                    headerShadowVisible: false,
                }}
            />
            <View className='bg-[#041433] flex flex-row justify-around mt-2'>
                <Pressable className='border-b-2 border-white'>
                    <Text className='text-white w-full' style={styles.text}>Goleadores</Text>
                </Pressable>
                <Pressable>
                    <Text className='text-white' style={styles.text}>V.M Vencida</Text>
                </Pressable>
                <Pressable>
                    <Text className='text-white' style={styles.text}>Figuras</Text>
                </Pressable>
            </View>
            <Text className='text-black'>Estadisticas</Text>
            <Link href={'/'} asChild>
                <Text style={{ color: 'red' }}> Regresar </Text>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
    }
});