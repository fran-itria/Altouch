import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';

export const PositionsIcon = ({ color }: { color: string }) => {
    return <FontAwesome name="list-ol" size={24} color={color} />
}

export const BallIcon = ({ color, size = 24 }: { color: string, size?: number }) => {
    return <FontAwesome name="soccer-ball-o" size={size} color={color} />
}

export const CalendarIcon = ({ color }: { color: string }) => {
    return <FontAwesome name="calendar" size={24} color={color} />
}

export const FairPlayIcon = ({ color }: { color: string }) => {
    return <FontAwesome name="handshake-o" size={24} color={color} />
}

export const RegulationIcon = ({ color }: { color: string }) => {
    return <Entypo name="new" size={24} color={color} />
}

export const Card = ({ color }: { color: string }) => {
    return <FontAwesome name="square" size={18} color={color} />
}