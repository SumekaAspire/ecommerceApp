import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Clothes from '../screens/ProductsScreen/Clothes';
import ProductList from '../screens/HomeScreens/ProductList';
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from 'react-native';

/**
 * Defined Types for Product navigation stack
 * Each key represents screen name, value represents type of parameters passed to that screen.
 * If no parameters passed, value is undefined.
 */
export type ProductStack = {
  ProductHome: undefined;
  Electronics: undefined;
  Furnitures: undefined;
  Clothes: undefined;
};

//create stack navigator with the defined type for productStack
const Stack = createNativeStackNavigator<ProductStack>();

/**
 * ProductsStack component
 * setup navigation structure for the application with screens for submenus and respective components
 * @returns Navigation container with product navigation stack
 */
const ProductsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <TouchableOpacity onPress={() => {
              const drawer = navigation.getParent();  //inside ProductsStack, the parent is Drawer Navigator.
              // @ts-ignore // TypeScript does not know that the parent is a DrawerNavigator, by ignore it - will tell typescript that parent navigator is in this method
              drawer?.openDrawer && drawer.openDrawer();// does drawer exist and does it have a function called openDrawer() - If yes → call openDrawer() to show the side menu
            }} >
            <Ionicons name="arrow-back" size={24} />
          </TouchableOpacity>
        ),
      })}
    >
      <Stack.Screen name="ProductHome"component={ProductList} options={{ title: "Products" }}/>
      <Stack.Screen name="Clothes"component={Clothes} />

    </Stack.Navigator>
  );
};

export default ProductsStack;
