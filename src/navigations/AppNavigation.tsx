import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreens/HomeScreen';
import Products from '../screens/ProductsScreen/Products';

//Type for drawer navigator
export type DrawerStack={
    Home: undefined;
    Profile:undefined;
    Products:undefined;
    Wishlist: undefined;
    Cart:undefined;

}
/**
 *Drawer Navigation - shows component like Menu
 * @returns Drawer Navigation Component
 */
const AppNavigation = () => {
    const Drawer = createDrawerNavigator<DrawerStack>();
  return (
   <Drawer.Navigator>
    <Drawer.Screen name="Home" component={HomeScreen}/>
    <Drawer.Screen name="Products" component={Products}/>
    
   </Drawer.Navigator>
  )
}

export default AppNavigation