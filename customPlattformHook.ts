import { Platform } from "react-native"

export const useCustomPlattformHook = () => {
    const isWeb = Platform.OS === 'web'
    if (isWeb)
        return "https://wcybl-w-anonymous-8081.exp.direct/altouch"
    else return false
}