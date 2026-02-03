import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { globalStyles } from '../../styles/globalStyles'
import HomeScreenTop from './HomeScreenTop'
import { colors } from '../../styles/colors'

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      
      <ScrollView>
        <HomeScreenTop/>
      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.white,
        padding:7
      
    },
    scrollContent:{
      paddingBottom: 20
    }
  
})