import { View, Text, ViewStyle, TouchableOpacity } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/globalStyles';

//interface for ButtonProps
interface ButtonProps{
    text:string;
    onPress :()=>void; //function to call button is pressed
    disabled?: boolean;
    containerStyle?:ViewStyle; // add optional containerStyle prop for outer container  to/like parent
    buttonStyle?:ViewStyle;
}
/**
 * Reusable button componnent
 * @returns Button component
 */
const Button:React.FC<ButtonProps> = ({text,onPress,disabled,containerStyle,buttonStyle}) => {
  return (
    <View style={[containerStyle]}>
     <TouchableOpacity style={[globalStyles.button, buttonStyle]} onPress={onPress} disabled={disabled}>
        <Text style={globalStyles.continueBtnText}>{text}</Text>
     </TouchableOpacity>
    </View>
  )
}

export default Button;