import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import IntroScreen from '../screens/IntroScreen';
import Login from '../screens/AuthScreens/Login';
import AdminLogin from '../screens/AdminScreens/AdminLogin';
import AdminDashBoard from '../screens/AdminScreens/AdminDashBoard';
import SignUp from '../screens/AuthScreens/SignUp';
import AppNavigation from './AppNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import { getUserData } from '../utils/asyncStorage';
import { selectUser, setUser } from '../store/slices/userSlice';
import { textData } from '../constants/text';

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
 * @returns Navigation container with navigation stack with auto login using async storage
 */
const AuthNavigation  =()=> {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(true);
  const [introDone, setIntroDone] = useState(false);

  //auto login from Async storage
  useEffect(()=>{
    const loadUser = async() =>{
      await new Promise<void>(resolve => setTimeout(resolve, 3000))// keep splash visible for 3 seconds
     
      //check if intro already completed
      const introCompleted = await getUserData('introCompleted');
      setIntroDone(!!introCompleted);
      //load stored user if exists
      const storedUser = await getUserData("user");
      if(storedUser) dispatch(setUser(storedUser));

      setLoading(false);//finish loading
    }
    loadUser();
  },[]);

  //show splash screen while checking Async Storage
  if(loading) return <SplashScreen/>

  return (
    <NavigationContainer>
        <Stack.Navigator  screenOptions={{headerShown: false}}>
           {/* Intro shown only once - saved in async storage*/}
           {!introDone && (
             <Stack.Screen name="Intro" component={IntroScreen}/>
           )}
           {/* Auth screens (only if no user logged in) */}
           {!user &&(
            <>
             <Stack.Screen name="Login" component={Login}/>
             <Stack.Screen name="AdminLogin" component={AdminLogin}/>
             <Stack.Screen name="SignUp" component={SignUp}/>
            </>
           )}
           {/* Admin flow
           {user?.role === 'ADMIN' && (
            // <Stack.Screen name="AdminHome" component={AdminHome} />
           )} */}

           {/* Guest/ admin /normal user flow  for HomeTab*/}
          {(user?.role === textData.roleAdmin || !user || user?.role === textData.roleUser) && (
            <Stack.Screen name="HomeTab" component={AppNavigation} />
          )}

        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AuthNavigation



