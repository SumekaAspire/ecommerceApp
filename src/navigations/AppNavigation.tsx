import CustomDrawer from '../navigations/CustomDrawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreens/HomeScreen';
import Products from '../screens/ProductsScreen/Products';
import ProfileScreen from '../screens/ProfileScreen.tsx/ProfileSCreen';
import WishlistScreen from '../screens/WishlistScreen';
import CartScreen from '../screens/CheckoutScreens/CartScreen';
import ProductStack from './ProductStack';
import ManageProducts from '../screens/AdminScreens/ManageProducts';
import AdminDashBoard from '../screens/AdminScreens/AdminDashBoard';
import { colors } from '../styles/colors';
import { textData } from '../constants/text';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/slices/userSlice';

//Type for drawer navigator
export type DrawerStack={
    Home: undefined;
    Profile:undefined;
    Products:undefined;
    Wishlist: undefined;
    Cart:undefined;
    SubMenu:undefined;

    //Admin
    AdminDashBoard: undefined;
    ManageProducts: undefined;
}

const Drawer = createDrawerNavigator<DrawerStack>();

/**
 *Drawer Navigation - shows component like Menu
 * now created custom drawer with icons and submenus
 * if use custom drawer , activetintcolor,activebackgroundcolor,inactivecolor not work
 * @returns Drawer Navigation Component
 */
const AppNavigation = () => {
    const user = useSelector(selectUser);
  return (
   <Drawer.Navigator 
      initialRouteName={user?.role === textData.roleAdmin ? "AdminDashBoard": "Home"}
      drawerContent={(props) =><CustomDrawer {...props}/>}// pass props - React Navigation automatically passes navigation, state, and descriptors to the custom drawer component.
      screenOptions={{ headerShown: true , drawerType:"front",
      drawerStyle: {backgroundColor: colors.drawerBackgroundColor, width: 300,},
     //drawerActiveBackgroundColor: '#a7abb2ff', drawerActiveTintColor: 'green',drawerInactiveTintColor: '#ae4646ff', //using Custom Drawer these are not worked
    }}>
    <Drawer.Screen name="Home" component={HomeScreen} options={{ headerShown: true, title: 'Easy Buy' }}/>
    <Drawer.Screen name="Products" component={Products}/>
    <Drawer.Screen name="SubMenu" component={ProductStack} options={{headerShown: false}}/>
    {/* user-screens */}
    <Drawer.Screen name ="Profile" component={ProfileScreen}/>
    <Drawer.Screen name="Wishlist" component={WishlistScreen}/>
    <Drawer.Screen name="Cart" component={CartScreen}/>

    {/* admin */}
    <Drawer.Screen name="AdminDashBoard" component={AdminDashBoard}/>
    <Drawer.Screen name="ManageProducts" component={ManageProducts}/>

    
   </Drawer.Navigator>
  )
}

export default AppNavigation