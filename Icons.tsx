import FontAwesome from '@expo/vector-icons/FontAwesome';

export const PositionsIcon = ({ color }: { color: string }) => {
    return <FontAwesome name="list-ol" size={24} color={color} />
}

export const BallIcon = ({ color }: { color: string }) => {
    return <FontAwesome name="soccer-ball-o" size={24} color={color} />
}

export const CalendarIcon = ({ color }: { color: string }) => {
    return <FontAwesome name="calendar" size={24} color={color} />
}

export const FairPlayIcon = ({ color }: { color: string }) => {
    return <FontAwesome name="handshake-o" size={24} color={color} />
}
