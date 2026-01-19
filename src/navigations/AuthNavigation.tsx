import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import IntroScreen from '../screens/IntroScreen';
import Login from '../screens/AuthScreens/Login';
import AdminLogin from '../screens/AdminScreens/AdminLogin';
import AdminHome from '../screens/AdminScreens/AdminHome';
import SignUp from '../screens/AuthScreens/SignUp';
import AppNavigation from './AppNavigation';

/**
 * Defined Types for navigation stack
 * Each key represents screen name, value represents type of parameters passed to that screen.
 * If no parameters passed, value is undefined.
 */
export type NavStack ={
    Splash: undefined;
    Intro: undefined;
    SignUp: undefined;
    Login: undefined;
    AdminLogin: undefined;
    AdminHome: undefined;
    HomeTab: undefined;
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
            <Stack.Screen name="SignUp" component={SignUp}/>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="AdminLogin" component={AdminLogin}/>
            <Stack.Screen name="AdminHome" component={AdminHome}/>
            <Stack.Screen name="HomeTab" component={AppNavigation}/>


        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AuthNavigation