import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import IntroScreen from '../screens/IntroScreen';

/**
 * Defined Types for navigation stack
 * Each key represents screen name, value represents type of parameters passed to that screen.
 * If no parameters passed, value is undefined.
 */
export type NavStack ={
    Splash: undefined;
    Intro: undefined;
}
//create stack nvigator with defined types
const Stack = createNativeStackNavigator<NavStack>();

/**
 * AuthNavigation component
 * setup navigation structure for the application with screens and respective components, as well as initial route
 * @returns Navigation container with navigation stack
 */
const AuthNavigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Splash' screenOptions={{headerShown: false}}>
            <Stack.Screen name="Splash" component={SplashScreen}/>
            <Stack.Screen name="Intro" component={IntroScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AuthNavigation