import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { globalStyles } from '../../styles/globalStyles'
import Button from '../../components/Button'
import LinkHandler from '../../components/LinkHandler'
import { textData, toast } from '../../constants/text'
import { useNavigation } from '@react-navigation/native'
import UserTextInput from '../../components/UserTextInput'
import { getGreeting } from '../../utils/commonGreetings'
import { colors } from '../../styles/colors'
import { validateEmail, validatePassword } from '../../constants/Validations'
import { loginUser } from '../../services/api'
import { storeUserData } from '../../utils/asyncStorage'
import { setUser } from '../../store/slices/userSlice'
import { AppDispatch } from '../../store/store'
import { showToast } from '../../utils/toast'

/**
 * AdminLogin Component
 * @returns AdminLogin UI-  navigates to admin Home
 */
const AdminLogin = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
   

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //mangaes error state
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

   //handle navigates to SignUp and AdminLogin
   const handleNavigateToSignUp =()=>{
    navigation.navigate('SignUp');
   }
   const handleAdminLogin=async()=>{
     const emailErr = validateEmail(email);
     const passwordErr= validatePassword(password);

     setEmailError(emailErr || "");
     setPasswordError(passwordErr || "");
    
     if(emailErr || passwordErr) return;
    try{
       setLoading(true);
      //Check admin login credentials from db
      const adminLogin = await loginUser({email, password});
      if(!adminLogin){
        showToast({type:toast.typeError, text1: toast.unknown, text2: toast.userNotFound, position:"bottom"});
      }else{
       if(adminLogin.role=== textData.roleAdmin){
         //Saved to asyncStorage and redux
          await storeUserData('user', adminLogin),
          dispatch(setUser(adminLogin));
          showToast({type:toast.typeSuccess, text1: toast.loginSuccess, text2: toast.loginSucessText, position: "bottom",});
          navigation.replace("HomeTab");
          setEmail("");
          setPassword("");
        }else{
          showToast({type:toast.typeError, text1: toast.loginFailed, text2: toast.loginFailedText, position:"bottom"});
      }
     } 
    
     }catch(error){
       console.log("Admin Login Error", error);
     }finally{
      setLoading(false); //loading stops
     }
   
  }
  return (
    <View style={[globalStyles.container,{paddingTop:100}]}>
       <View style={globalStyles.rowContainer}>
          <Text style={styles.heading}>{textData.helloAdmin}</Text>
          <AntDesign name="login" color="#000" size={22} />
       </View>
      {/* email */}
      <UserTextInput
        value={email}
        type="email"
        label={textData.emailPlaceholder} //placeholder
        onChangeText={setEmail}
        iconName="email"
        textLabel={textData.email}
        error={emailError}
      />

      {/* password */}
      <UserTextInput
        value={password}
        type="password"
        label={textData.passwordPlaceholder}
        onChangeText={setPassword}
        textLabel={textData.password}
        maxLength={16}
        error={passwordError}
      />
       {/* Forget Password - used resuable component for TouchableOpacity  */}
       <LinkHandler content={textData.forgetPassword} textStyle={styles.forgetPassword}/>

       {/* Login Button - reusable component, navigates to next screen*/}
       {loading?( <ActivityIndicator size="small" color={colors.orange} style={{marginVertical:20, }}/>): (
         <Button text={textData.loginText} onPress={handleAdminLogin} containerStyle={styles.loginButton}/>
        )}  
      
       {/* Move to signUp screen through userregister text  - reusable component*/}
       <LinkHandler onPress={handleNavigateToSignUp} content={textData.userRegister} textStyle={styles.textRegister} viewStyle={{alignSelf:"flex-start"}}/>
       
    </View>
  )
 }

export default AdminLogin;

const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    fontFamily: 'AlanSans-Medium',
    marginTop: 25,
    marginBottom:20,
  },
 
forgetPassword: {
    fontSize: 14,
    color: colors.orange,
    fontFamily: "AlanSans-Medium",
    marginLeft:15,
    marginTop:2,
    marginBottom:10
  },
  textRegister: {
    color: colors.black,
    fontFamily: "AlanSans-SemiBold",
    marginTop: 30,
    fontSize:14,
    marginLeft:46
  },
  loginButton:{
    marginTop:15, 
    marginHorizontal:15,
    marginBottom:10,
  },
})