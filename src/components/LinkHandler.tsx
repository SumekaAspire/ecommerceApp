import { View, Text, TextStyle, ViewStyle, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../styles/colors';
import Fontisto from 'react-native-vector-icons/Fontisto';

//type definition for LinkHandler
interface LinkHandlerProps{
    onPress?: ()=> void; //handl button press
    content?: string;
    textStyle?: TextStyle;
    iconName?: string;
    iconColor?: string;
    iconSize?: number;
    viewStyle?: ViewStyle;
    disabled?: boolean;
    iconComponent?: React.ReactNode; // allows JSX(like <Ioicons/>) - it covers JSX elements, strings, numbers, arrays, and null.)
    contentBack?: string;

}
/**
 * LinkHnadler Reusable Component -  contains CustomTouchableopacity for navigation to other screen/authentication content text or with auth icons
 * @returns LinkHandler Component - touchableopacity view
 */
const LinkHandler: React.FC<LinkHandlerProps> = ({ onPress, content, textStyle, iconColor = colors.grey, iconName, iconComponent, iconSize=20, disabled, viewStyle, contentBack}) => {
  return (
   <TouchableOpacity onPress={onPress} style={viewStyle} disabled={disabled}>
      {content && <Text style={textStyle}>{content}</Text>}
      {iconComponent ? (iconComponent) : (iconName && <Fontisto name={iconName} color={iconColor} size={iconSize} />)}
      {contentBack && <Text style={[textStyle]}>{contentBack}</Text>}
   </TouchableOpacity>
  )
}

export default LinkHandler;