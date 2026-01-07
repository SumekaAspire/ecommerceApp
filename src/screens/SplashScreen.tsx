import { View,Text, Image, StyleSheet } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../constants/image'
import { colors } from '../styles/colors'
import { useNavigation } from '@react-navigation/native'
import { textData } from '../constants/text'
import { useEffect } from 'react'

/**
 * SplashScreen component for the application.
 * It displays app name, image and navigates to Intro screen after a delay of 5 seconds.
 * @returns rendered splash screen component
 */
const SplashScreen = () => {
    const navigation: any = useNavigation();
    useEffect(()=>{
        /**
        //  * Timer is used to navigate to intro screen after a delay of 5 seconds.
        //  * Timer is cleared automatically when componnt unmounts - prevent memory leaks.
        //  */  
        const timer = setTimeout(()=>{
           navigation.replace("Intro")
        },5000)
        return()=> clearInterval(timer);
    },[])
  return (
    <SafeAreaView style={ styles.container}>
        <Text style={styles.text}>{textData.appName}</Text>
        <Image source={images.splashIcon} style={styles.image}/>
        <MaterialIcons name="star" size={32} color="black" />
    </SafeAreaView>
  )
}

export default SplashScreen

const styles= StyleSheet.create({
  container: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
   backgroundColor: colors.PRIMARY_BACKGROUNDCOLOR, 
  },
  image:{
    width: 170,
    height: 170,
    resizeMode: 'cover',
    borderRadius:350
  },
  text:{
    paddingBottom:10,
    color:colors.black,
    fontFamily:'Frijole',
    fontSize:50,
  }
    

})