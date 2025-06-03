import { Pressable, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BallIcon, CalendarIcon, FairPlayIcon, PositionsIcon, RegulationIcon } from "../Icons";
import { theme } from "../tailwind.config";
import { StyleSheet } from 'nativewind';

export default function MyTabBar({ state, descriptors, navigation, liga }: BottomTabBarProps & { liga: string }) {

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: theme?.[liga]?.colors?.secondary,
            height: 40
        },
        itemFocus: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
        },
        borderFocusItem: {
            borderColor: theme?.[liga]?.colors?.tabBarActiveColor,
            borderWidth: 1,
            position: 'absolute',
            top: 0,
            width: '100%'
        }
    })

    function getIcon(name: string, color: string) {
        switch (name) {
            case 'fixture':
                return <CalendarIcon color={color} />;
            case 'statics':
                return <BallIcon color={color} />;
            case 'fairPlay':
                return <FairPlayIcon color={color} />;
            case 'regulation':
                return <RegulationIcon color={color} />;
            default:
                return <PositionsIcon color={color} />;
        }
    }

    return (
        <View style={styles.container}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <Pressable
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={isFocused ? styles.itemFocus : { flex: 1, alignItems: 'center', justifyContent: 'center' }}
                    >
                        <View style={isFocused && styles.borderFocusItem}></View>
                        {getIcon(route.name, isFocused ? theme?.[liga]?.colors.tabBarActiveColor : theme?.[liga]?.colors.tabBarInactiveColor)}
                    </Pressable>
                );
            })}
        </View>
    );
}