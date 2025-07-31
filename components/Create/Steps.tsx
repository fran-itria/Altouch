import { View, Animated, Easing, Text } from "react-native";
import { useEffect, useRef } from "react";
import { theme } from "../../tailwind.config";

export default function Steps({ liga, step }: { liga: string, step: number }) {
    const anims = [
        useRef(new Animated.Value(0)).current,
        useRef(new Animated.Value(0)).current,
        useRef(new Animated.Value(0)).current
    ];

    useEffect(() => {
        anims.forEach((anim, i) => {
            Animated.timing(anim, {
                toValue: step === i ? 1 : 0,
                duration: 400,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: false,
            }).start();
        });
    }, [step]);

    return (
        <View className="flex flex-row justify-around items-center">
            {anims.map((anim, i) => (
                <View>
                    <Animated.View
                        key={i}
                        style={{
                            height: 8,
                            borderRadius: 4,
                            marginHorizontal: 4,
                            width: anim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [144, 176], // px
                            }),
                            backgroundColor: anim.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['gray', theme?.[liga]?.colors?.secondary],
                            }),
                        }}
                    />
                </View>
            ))}
        </View>
    );
}