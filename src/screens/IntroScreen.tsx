import { View, Text, Dimensions, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinkHandler from '../components/LinkHandler';
import Carousel from 'react-native-reanimated-carousel'
import { images } from '../constants/image';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/globalStyles';
import { textData } from '../constants/text';
import { colors } from '../styles/colors';
import { storeUserData } from '../utils/asyncStorage';

//Image data
const sliderData =[
  {img: images.sliderImage2},
  {img: images.sliderImage1},
  {img: images.sliderImage3},
]
const { width } = Dimensions.get("window"); // width based on the device
/**
 * Introscreen component for the application.
 * It displays cart image, greeting message, image slider and buttons(prev, next), navigates to Login screen after clicked the continue button.
 * @returns Intro screen UI
 */
const IntroScreen = () => {
  //Access the navigation object using the useNavaigation hook
  const navigation: any = useNavigation();
  const itemWidth = width - 60;// width calculation to every device looks properly.

  /**
   * Used useState to manage  dots slide to move according to image slide(auto play)/ manually
   * Carousel component updating the activeIndex whenever the slide autoplays/manully to next slide.
   * onSnapToItem(for swipe changes- index updated) - callback will be triggered whenever the carousel slide to new item and update the activeIndex with the new index.
   */
  const [activeIndex, setActiveIndex]= useState(0);

 //Skip - Handles navigation To LoginScreen ,Triggers when user clicked skip text
  const goToLogin = async()=>{
    await storeUserData("introCompleted", true);
    navigation.replace("Login");
  }
  //handle previous and Next buttons, navigate to login as continue button
  const handleNext = async()=>{
    if(activeIndex < sliderData.length-1){
      setActiveIndex(prev =>prev+1);
    }
  }
  const handlePrev =async()=>{
    if(activeIndex >0){
      setActiveIndex(prev => prev-1);
    }
  }
  return (
    <View style={globalStyles.container}>
      {/* header */}
      <View style={styles.introDisplay}>
        {/* conditionally render skip button */}
        {activeIndex < sliderData.length -1 && (
          <LinkHandler content={ textData.skip} onPress={goToLogin} textStyle={styles.skip}/>
        )}
        <LinkHandler iconName='shopping-bag-1' iconSize={90} iconColor={colors.iconBag}/>
        {/* <MaterialIcons name="delivery-dining" color={colors.iconBag} size={90} /> */}

        <Text style={styles.greetingText}>
          {textData.welcome}<Text style={styles.appName}>{textData.ourApp}</Text> {textData.letShop}
        </Text>
      </View>
      {/* slider */}
      <View style={styles.sliderContainer}>
         <Carousel
          key={activeIndex} //force carousel component re-render whenever the activeIndex change
          defaultIndex={activeIndex} //sets the initial index of carousel when it is first rendered, not dynamically update the carousel position after initial render
          data={ sliderData ||[]} //carousel component receives a valid array, if data prop is undefined, null, not provided
          enabled={false} // to disable swipe gesture in carousel, if true(can swipe, images only changed not dots, for dots have to enable onSnapItem)
          renderItem={({ item }) => (
            <Image
              source={item.img}
              style={{width:itemWidth, height:300}}
              resizeMode='cover'
            /> 
        )}
        width={itemWidth}
        height={300}
      />
      </View>
      {/* dots below the Slider*/}
      <View style={styles.dotsContainer}>
        {/*if data is undefined or null, instead of crash it shows empty */}
        {sliderData?.map((item, index)=>(
          <View
           key={index}
           style={[styles.dot, 
            index === activeIndex ? styles.activeDot : styles.inactiveDot,
           ]}/>

        ))}
      </View>
      {/* Next and Previous buttons */}
      <View style={styles.navigationContainer}>
        {/* first slide */}
        {activeIndex === 0 &&(
         <LinkHandler  content={textData.next}  onPress={handleNext} textStyle={styles.buttonText} viewStyle={styles.buttons} />
        )}
        {/* middle slide */}
         {activeIndex > 0 && activeIndex < sliderData.length -1 &&(
          <>
           <LinkHandler content={textData.previous} onPress={handlePrev}textStyle={styles.buttonText} viewStyle={styles.buttons}/>
           <LinkHandler content={textData.next} onPress={handleNext} textStyle={styles.buttonText} viewStyle={styles.buttons}/>  
          </>
         )}
         {/* last slide */}
         {activeIndex === sliderData.length-1 && (
          <>
           <LinkHandler content={textData.continue} onPress={goToLogin} textStyle={styles.buttonText} viewStyle={styles.buttons}/>  
          </>
         )}
      </View>
    </View>
  )
}

export default IntroScreen

const styles= StyleSheet.create({
 introDisplay:{
   alignItems:"center",
   marginTop:20,
 },
 skip:{
   left: 150,
   fontSize:16,
   fontWeight:"bold",
   color: colors.iconSkip,
   top:-20
 },
 greetingText:{
   textAlign:"center",
   fontSize:17,
   fontFamily:"AlanSans-Medium",
   marginTop:20,
   marginBottom:50,
   color:colors.black,
 },
 appName:{
   fontFamily: "Figtree-ExtraBold",
 },
 sliderContainer:{
   flex:1,
   alignItems:"center",
 },
 dotsContainer:{
   flexDirection:"row",
   justifyContent:"center",
 },
 dot:{
   marginHorizontal:5,
 },
 activeDot:{
   width:20,
   height:8,
   borderRadius:4,
   backgroundColor:colors.buttons,
 },
 inactiveDot:{
   width:8,
   height:8,
   borderRadius:4,
   backgroundColor:colors.inActive,
 },
 navigationContainer:{
    flexDirection:'row',
    justifyContent:"center",
    marginVertical:70,
    gap:90,
 },
 buttons: {
    padding: 10,
    backgroundColor: colors.buttons,
    borderRadius: 20,
    width:120,
    height:43,
  },
 buttonText:{
   textAlign:"center",
   fontFamily:"AlanSans-Medium",
   fontSize:16,
   color:colors.white,
 },
})

