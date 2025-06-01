import { Modal, View } from "react-native";
import { LoadingIcon } from "../Icons";


export default function Loading() {
    return (
        <Modal transparent={true} visible={true} animationType="fade">
            <View className='flex justify-center items-center h-screen'>
                <View
                    className='w-fit h-fit p-5 rounded-full shadow'
                >
                    <LoadingIcon />
                </View>
            </View>
        </Modal>
    )
}