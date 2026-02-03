import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from '../styles/colors';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, selectUser } from '../store/slices/userSlice';
import { AppDispatch } from '../store/store';
import { removeUserData } from '../utils/asyncStorage';
import { textData, toast } from '../constants/text';
import { showToast } from '../utils/toast';

/**
 * Custom Drawer Component
 * @param  Navigation-  here navigations be used as props not import instead.
 * @param  state(current state of drawer navigation: details)- used to determine active route
 * @returns Custom Drawer ui and navigations
 */
const CustomDrawer = ({navigation, state}: any) => {
    //state to toggle the visibility of submenu
    const [showSubMenu, setShowSubMenu] = useState(false);
    
    const user= useSelector(selectUser);
    const dispatch = useDispatch<AppDispatch>();

    //Logout handler
    const handleLogout =async() =>{
        Alert.alert(textData.logout, textData.logoutQuestion,
          [{text:textData.cancel, style:"cancel"},
           {text:textData.logout, style:"destructive", onPress: async() =>{
              dispatch(clearUser(user));// clear redux user
              await removeUserData("user");//remove form asyncStorage
              showToast({type:toast.typeSuccess, text1:toast.loggedOut, text2:toast.seeyouAgain, position:"bottom"});
           }}
          ], { cancelable: true }
        )
       
    }
    // To Get current active route name from the navigation state
    const getActiveRouteName = (state: any): string => {
      const activeRoute = state.routes[state.index];// It returns the name of the currently open screen.
      if (activeRoute.state) return getActiveRouteName(activeRoute.state);// activeRoute.state === undefined returns(not the submenu)
      //activeRoute.state is the nested navigator’s navigation state object, present only when the current screen contains another navigator.
      return activeRoute.name;
    };

    const activeRoute = getActiveRouteName(state);

   /**
    * DrawerItem Component- Helper to render a drawer item
    * @param label - Text label for the drawer item.
    * @param icon - Icon name for the drawer item (from Ionicons).
    * @param routeName -route name associated with the drawer item.
    * @param onPress - Function to handle the press event for navigation.
    * @returns A single drawer item with label, icon, and navigation functionality.
    */
    const DrawerItem =({label, icon, routeName, onPress}: any)=>{
        //to check current route is active
        const isActive = activeRoute === routeName;
        return(
           <TouchableOpacity style={[styles.item, isActive && styles.activeItem]} onPress={onPress}>
              <Ionicons name={icon} size={22} color={isActive ? colors.green : colors.black} //. change icon color based on active state
              />
              <Text style={[styles.label, { color: isActive ? colors.green : colors.black }]}> {label} </Text>
      </TouchableOpacity>
        )
    }

  return (
    <DrawerContentScrollView>

        <View style={styles.header}>
            <Ionicons name="person-circle-outline" size={65} color={colors.green}/>
            <Text style={styles.headerText}>
                {user ? `${textData.hello} ${user.name}` : textData.helloGuest}
            </Text>
            {user?.role === textData.roleAdmin && (<Text style= {styles.roleBadge}>{textData.roleAdmin}</Text>)}
        </View>

        {/* HOME button (auto route based on role) */}
        <DrawerItem label="Home" icon="home-outline"
        onPress={() => navigation.navigate(
            user?.role === textData.roleAdmin ? 'AdminDashBoard' : 'Home'
          )
        }
      />
       
       {/* guest menu */}
       {!user && (
        <>
          <DrawerItem label="Login / Signup" icon="log-in-outline"
             onPress={() => navigation.navigate("Login")}
           />
          <View>
             <DrawerItem label="Products" icon="grid-outline" routeName="Products"
                onPress={() => navigation.navigate("Products")}
              />
             {/* arrow to show/hide submenu */}
             <TouchableOpacity style={styles.arrow} onPress={() => setShowSubMenu(!showSubMenu)} >
               <Ionicons name={showSubMenu ? "chevron-up-outline" : "chevron-down-outline"} size={20}/>
             </TouchableOpacity>
          </View>

          {/* Submenu */}
          {showSubMenu && (
           <View style={styles.submenuContainer}>
              {/* <DrawerItem label="All Products" icon="bookmark-outline" routeName="ProductHome"
                    onPress={() => navigation.navigate("SubMenu", { screen: "ProductHome" })}
              /> */}
             <DrawerItem label="Clothes" icon="accessibility-outline" routeName="Clothes"
                onPress={() => navigation.navigate("SubMenu", { screen: "Clothes" })}
             />
           </View>
         )}
        </>
      )}

       {/* user menu */}
      {user?.role === textData.roleUser &&(
        <View>
         <DrawerItem label="Profile" icon="person-outline" routeName="Profile"
          onPress={() => navigation.navigate("Profile")}
        />
         <DrawerItem label="Cart" icon="cart-outline" routeName="Cart"
          onPress={() => navigation.navigate("Cart")}
         />
         <DrawerItem label="Wishlist" icon="heart-outline" routeName="Wishlist"
          onPress={() => navigation.navigate("Wishlist")}
         />
          {/* Products main menu */}
       <View>
         <DrawerItem label="Products" icon="grid-outline" routeName="Products"
           onPress={() => navigation.navigate("Products")}
         />
         {/* arrow to show/hide submenu */}
         <TouchableOpacity style={styles.arrow} onPress={() => setShowSubMenu(!showSubMenu)} >
           <Ionicons name={showSubMenu ? "chevron-up-outline" : "chevron-down-outline"} size={20}/>
         </TouchableOpacity>
       </View>

       {/* Submenu */}
      {showSubMenu && (
        <View style={styles.submenuContainer}>
          {/* <DrawerItem label="All Products" icon="bookmark-outline" routeName="ProductHome"
            onPress={() => navigation.navigate("SubMenu", { screen: "ProductHome" })}
          /> */}
          <DrawerItem label="Clothes" icon="accessibility-outline" routeName="Clothes"
            onPress={() => navigation.navigate("SubMenu", { screen: "Clothes" })}
          />
        </View>
      )}

  </View>
        
)}      
      {/* admin menu */}
      {user?.role === textData.roleAdmin && (
        <>
         <DrawerItem label="Manage Products" icon="grid-outline" routeName="ManageProducts"
            onPress={() => navigation.navigate("ManageProducts")}
         />  
        </>
      )}
      {(user?.role === textData.roleAdmin || user?.role === textData.roleUser)&& (
        <DrawerItem label="logout" icon="log-out-outline" routeName="Logout" onPress={handleLogout}/>
      )}
    </DrawerContentScrollView>
  )
}

export default CustomDrawer;


const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  activeItem: {
    backgroundColor: colors.activeItem, 
    borderRadius: 8,
  },
  label: {
    marginLeft: 15,
    fontSize: 16,
  },
  arrow: {
    position: "absolute",
    right: 15,
    top: 12,
  },
  submenuContainer: {
    paddingLeft: 15,
    marginTop: 3,
  },
  header:{
    alignItems:"center",
    paddingVertical:20,
    borderBottomWidth: 1,
    borderBlockColor:colors.inActive,
    marginBottom:10,
  },
  headerText:{
    fontSize:16,
    fontWeight:"bold",
    marginTop:5,
  },
  roleBadge:{
    backgroundColor:colors.green,
    color:colors.white,
    paddingHorizontal:8,
    paddingVertical:2,
    borderRadius:10,
    marginTop:4,
    fontSize:12,
  }
});






