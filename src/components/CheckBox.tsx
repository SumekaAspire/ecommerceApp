import { View, Text, TextStyle,StyleSheet } from 'react-native'
import React from 'react'
import CheckBox from '@react-native-community/checkbox'
import { textData } from '../constants/text'
import { colors } from '../styles/colors'


//type for checkBoxprops
interface CheckboxContentProps{
    value: boolean;
    onValueChange : (newValue: boolean) => void;
    tintColors?: {true: string, false: string}
    textContent: string
    textStyle?: TextStyle;
}
/**
 * 
 * CheckboxContent component - shows checkbox with text
 * true - Checkbox is checked(color of the tick + box)
 * false - Checkbox is unchecked(color of the box border)
 * @returns rendering the checkbox view
 */
const CheckboxContent : React.FC<CheckboxContentProps>= ({value, onValueChange,tintColors={ true: colors.ORANGE_COLOR, false: colors.ORANGE_COLOR },textContent, textStyle}) => {
  return (
    <View style={styles.checkBoxContainer}>
       <CheckBox
          value={value}
          onValueChange={onValueChange}
          tintColors={tintColors}
        />
        <Text style={[styles.checkBoxText, textStyle]}>{textContent}</Text>
    </View>
  )
}

export default CheckboxContent

const styles = StyleSheet.create({
  
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkBoxText: {
    fontSize: 14,
    color: colors.black,
    fontFamily: "AlanSans-Medium",
  },
 })