import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../styles/globalStyles';
import { termsAndConditions, textData, toast } from '../constants/text';
import { colors } from '../styles/colors';
import CheckBox from '@react-native-community/checkbox';
import { showToast } from '../utils/toast';

interface TermsAndConditionsProps{
  onAccept: () =>void;//callback function to notify when terms are accepted
}
/**
 * Reusable component - Displaying and handling modal logic with toast
 * @returns TermsAndCondtionsModal Component
 */
const TermsAndConditionsModal:React.FC<TermsAndConditionsProps> = ({ onAccept }) => {

 //Manage state for ModalVisibility and checkbox status
 const [isModalVisible, setModalVisible] = useState(false);
 const [checkBoxChecked, setCheckBoxChecked] = useState(false);
  
  /**
   * HandleAccept - to check the checkbox is clicked or not,
   * if not, display a toast to the user to click the checkbox
   */
  const handleAcceptClose = () => {
    if (checkBoxChecked) {
      onAccept();
      setModalVisible(false); //close the modal
    }else{
      showToast({
         type: toast.typeError,
         text1: termsAndConditions.acceptTandC,
         position: 'bottom',
       });
    };
}  
  return (
    <View>
        {/* Triggers to open modal(show the term and condition content) */}
        <TouchableOpacity onPress={() =>setModalVisible(true)}>
            <Text style={globalStyles.termCondition}>{textData.termsAndConditions}</Text>
        </TouchableOpacity>

        {/* Modal for terms and conditions */}
        <Modal
          visible={isModalVisible}
          transparent={true} //false - give white background //  backdropColor={"red"}
          animationType="slide" //slide, fade, none
          onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
             <View style={styles.modalContent}>
                <Text style={styles.modalTextHeading}>{termsAndConditions.termsAndConditionsTitle}</Text>
                <Text style={globalStyles.termCondition}>{termsAndConditions.textForTermsAndConditions}</Text>
         
                {/* checkbox */}
                <View style={styles.checkBoxContainer}>
                  <CheckBox
                    value={checkBoxChecked}
                    onValueChange={setCheckBoxChecked}
                    tintColors={{ true: colors.ORANGE_COLOR, false: colors.ORANGE_COLOR }}
                  />
                 <Text style={styles.checkBoxText}>{termsAndConditions.acceptTermsAndConditions}</Text>
                </View>
               {/* close button */}
               <TouchableOpacity style={styles.closeButton} onPress={handleAcceptClose}>
                   <Text style={styles.closeButtonText}>{termsAndConditions.close}</Text>
               </TouchableOpacity>
             </View>
            </View>
        </Modal>
      
    </View>
  )
}


export default TermsAndConditionsModal;

const styles = StyleSheet.create({
  
   modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.modalOverlay,
  },
  modalContent: {
    width: '85%',
    padding: 20,
    backgroundColor: colors.PRIMARY_BACKGROUNDCOLOR,
    borderRadius: 10,
  },
  modalTextHeading: {
    fontSize: 16,
    marginBottom: 20,
    textAlign:'center',
    fontFamily: "AlanSans-Medium",
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal:20
  },
  checkBoxText: {
    fontSize: 13,
    color: colors.black,
    fontFamily: "AlanSans-Medium",
  },
  closeButton: {
    alignSelf: 'center',
    padding: 10,
    backgroundColor: colors.labelColor,
    borderRadius: 5,
    marginVertical:10,
  },
  closeButtonText: {
    color: colors.PRIMARY_BACKGROUNDCOLOR,
    fontSize: 14,
    fontFamily: "AlanSans-Medium",
  },
})