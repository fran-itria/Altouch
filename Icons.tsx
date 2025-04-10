import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';

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

export const StarIcon = () => {
    return <FontAwesome name="star" size={18} color={'#d97706'} />
}

export const LoadingIcon = () => {
    return <AntDesign name="loading1" size={24} color="white" className='animate-spin' />
}