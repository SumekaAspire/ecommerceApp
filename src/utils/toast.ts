import Toast from "react-native-toast-message";

interface ToastParameterProps{
    type:string;
    text1:string;
    text2?:string;
    position?: "bottom" | "top";
    visibilityTime?: number;
}
/**
 * Displays toast message from the parameters
 */
export const showToast=({type, text1, text2="", position="bottom", visibilityTime =2000}: ToastParameterProps) =>{
     Toast.show({type, text1, text2, position, visibilityTime});
}