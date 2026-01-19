import { View, Text, ViewStyle, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../styles/colors';
import { globalStyles } from '../styles/globalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from "react-native-vector-icons/MaterialIcons";

//interface for UserTextInput Props
interface UserTextInputProps{
    type?: "email" | "password" | "confirmPassword" | "name" | "city" | "phone" | "state" | "pincode" | "address" | "houseFlat" | "country";
    value:string;
    label?: string; //placeholder for text input
    onChangeText?: (newValue: string) => void;
    iconName?: string;
    size?: number;
    iconColor?: string;
    error?: string;
    maxLength?: number;
    textLabel?: string;
    containerStyle?: ViewStyle;
    numberOfLines?: number;
    editable?: boolean;
}
/**
 * Reusable UserTextInput Component
 * @returns Text Input View 
 */
const UserTextInput: React.FC<UserTextInputProps>= ({type,value, label, onChangeText, iconName,size=22,iconColor= colors.grey, error,maxLength,textLabel , containerStyle,numberOfLines= 4, editable}) => {

    const isPassword = type === 'password';
    const isConfirmPassword = type === 'confirmPassword';
    const keyboardType = type ==='email'? 'email-address' : 'default';
    const isAddress = type ==='address';

    //Manage password visibility
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const togglePasswordVisibiity =()=>{
        setIsPasswordVisible((prev) =>(!prev));
    }

  return (
    <View>
      <Text style={globalStyles.label}>{textLabel}</Text>
      <View style={[globalStyles.inputContainer,containerStyle]}>
       <TextInput
        key={isPasswordVisible.toString()} //Force re-render when visibility changes
        value={value}
        onChangeText={onChangeText}
        placeholder={label}
        style={globalStyles.input}
        maxLength={maxLength} 
        autoCapitalize="none"
        keyboardType={keyboardType}
        //secureTextEntry={secureTextEntry}
        secureTextEntry={(isPassword || isConfirmPassword) && !isPasswordVisible}
        multiline={isAddress} //Enable multiline for address type
        numberOfLines={isAddress? numberOfLines: 1} //set number of lines for address type
        editable={editable}
        />
        {iconName && <Icon name={iconName} size={size} color={colors.grey} />}
        {isPassword && (
          <TouchableOpacity onPress={togglePasswordVisibiity}>
            <Ionicons
             name={isPasswordVisible? 'eye-sharp': 'eye-off-sharp'}
             size={size}
             color={colors.grey}
             />
          </TouchableOpacity>
        )}
      </View>
      {error ?(<Text style={globalStyles.errorText}>{error}</Text>): null}
    </View>
  )
}

export default UserTextInput;