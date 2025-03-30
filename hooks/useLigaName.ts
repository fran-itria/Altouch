import { useLocalSearchParams } from "expo-router";

export default function useLigaName(): { liga: string } {
    const { liga } = useLocalSearchParams()
    return { liga } as { liga: string }
}