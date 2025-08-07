import { useState } from 'react';
import { Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export const useImagePicker = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const pickImageWeb = (): Promise<string | null> => {
        return new Promise((resolve) => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (event: any) => {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const imageUri = e.target?.result as string;
                        setSelectedImage(imageUri);
                        resolve(imageUri);
                    };
                    reader.readAsDataURL(file);
                } else {
                    resolve(null);
                }
            };
            input.click();
        });
    };

    const pickImageMobile = async (): Promise<string | null> => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert("Error", "Se necesitan permisos para acceder a la galería");
            return null;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            return result.assets[0].uri;
        }
        return null;
    };

    const pickImage = async (): Promise<string | null> => {
        if (Platform.OS === 'web') {
            return await pickImageWeb();
        } else {
            return await pickImageMobile();
        }
    };

    const takePhoto = async (): Promise<string | null> => {
        if (Platform.OS === 'web') {
            // En web usamos el mismo selector de archivos
            return await pickImageWeb();
        }

        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert("Error", "Se necesitan permisos para acceder a la cámara");
            return null;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            return result.assets[0].uri;
        }
        return null;
    };

    const showImagePicker = () => {
        if (Platform.OS === 'web') {
            pickImage();
        } else {
            Alert.alert(
                "Seleccionar imagen",
                "¿De dónde quieres obtener la imagen?",
                [
                    { text: "Galería", onPress: pickImage },
                    { text: "Cámara", onPress: takePhoto },
                    { text: "Cancelar", style: "cancel" }
                ]
            );
        }
    };

    return {
        selectedImage,
        setSelectedImage,
        pickImage,
        takePhoto,
        showImagePicker
    };
};
