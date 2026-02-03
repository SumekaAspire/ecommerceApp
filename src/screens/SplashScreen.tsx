import { View,Text, Image, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../constants/image'
import { colors } from '../styles/colors'
import { useNavigation } from '@react-navigation/native'
import { textData } from '../constants/text'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store/store'
import { getUserData } from '../utils/asyncStorage'
import { setUser } from '../store/slices/userSlice'

/**
 * SplashScreen component for the application.
 * It displays app name, image and navigates to Intro screen after a delay of 5 seconds.
 * @returns rendered splash screen component
 */
const SplashScreen = () => {
    // const navigation: any = useNavigation();
    // const dispatch = useDispatch<AppDispatch>();
    // useEffect(()=>{
    //     /**
    //     //  * Timer is used to navigate to intro screen after a delay of 5 seconds.
    //     //  * Timer is cleared automatically when componnt unmounts - prevent memory leaks.
    //     //  */  
    //     const timer = setTimeout(()=>{
    //        navigation.replace("Intro")
    //     },5000)
    //     return()=> clearTimeout(timer);
    // },[])
    // useEffect(()=>{
    //   const timer = setTimeout(async() =>{
    //     try{
    //       const savedUser = await getUserData('user');
    //       const introCompleted = await getUserData('introCompleted');

    //       if(!introCompleted){
    //        //navigate to introscreen if intro is not completed
    //         return navigation.replace('Intro');
    //       }else if(savedUser){
    //         //if user exists, stored in redux and goes to home
    //          dispatch(setUser(savedUser));
    //         if(savedUser.role === "ADMIN"){
    //          return  navigation.replace("AdminHome");
    //         }else{
    //           return navigation.replace("HomeTab");
    //         }
    //       }
    //       //if intro is completed but user is not logged in, goes to login
    //       navigation.replace("Login");

    //     }catch(error){
    //       console.log('Erroe in checking splash: async storage', error);
    //       navigation.replace("Login");
    //     }
    //   }, 3000); // delay the splash
    //   return () => clearTimeout(timer);
    // },[navigation, dispatch])
  return (
    <SafeAreaView style={ styles.container}>
        <Text style={styles.text}>{textData.appName}</Text>
        <Image source={images.splashIcon} style={styles.image}/>
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
    color: colors.black,
    fontFamily: 'Frijole',
    fontSize: 50
  }
    

})