import { View, Text, StyleSheet,ActivityIndicator } from 'react-native'
import React,{useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { getGreeting } from '../../utils/commonGreetings';
import { globalStyles } from '../../styles/globalStyles';
import UserTextInput from '../../components/UserTextInput';
import { textData, toast } from '../../constants/text';
import { colors } from '../../styles/colors';
import LinkHandler from '../../components/LinkHandler';
import Button from '../../components/Button';
import { validateEmail, validatePassword } from '../../constants/Validations';
import { storeUserData } from '../../utils/asyncStorage';
import { setUser } from '../../store/slices/userSlice';
import { showToast } from '../../utils/toast';
import { loginUser } from '../../services/api';

/**
 * Login Component - contains userInput with toggle password and show error with validation
 * Greeting - updates message for every 1 minute
 * @returns Login Screen ui and functionality
 */
const Login = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch<AppDispatch>();

  //manages state for login screen
  const [rememberMe, setRememberMe]= useState(false);
  const [greetings, setGreetings] = useState(getGreeting());
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //mangaes error state
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  /**Updates greeting message 
   * runs every 1 minute : 1minute = 60 seconds, 1 sec = 1000 millisecnds(60*1000)
   * automatically clears when component unmountes, prevents memmory leaks
   */
  useEffect(()=>{
    const interval = setInterval(()=>{
        setGreetings(getGreeting());
    },60*1000);
    return ()=> clearInterval(interval);
  },[])
  //handle navigates to SignUp and AdminLogin
  const handleNavigateToSignUp =()=>{
    navigation.navigate('SignUp');
  }
   const handleNavigateToAdminLogin=()=>{
    navigation.navigate('AdminLogin');
  }
  // handle navigate as guest
  const handleNavigateAsGuest=()=>{
    navigation.navigate('HomeTab');
  }
  
  //handles Login Button navigation with validtions, returns Login button to navigate to next screen
   const handleLogin =async()=>{
    const emailErr = validateEmail(email);
    const passwordErr= validatePassword(password);

    setEmailError(emailErr || "");
    setPasswordError(passwordErr || "");
    
    if(emailErr || passwordErr) return;
    try{
       setLoading(true); //start loading
      //Check login credentials from mock /data from db
       const validUser = await loginUser({email, password});
       if(!validUser){
          showToast({type:toast.typeError, text1: toast.unknown, text2: toast.userNotFound, position:"bottom"});
        }else{
          if(validUser.role=== textData.roleUser){
           //Saved to asyncStorage and redux
            await storeUserData('user', validUser),
            dispatch(setUser(validUser));
            showToast({type:toast.typeSuccess, text1: toast.loginSuccess, text2: toast.loginSucessText, position: "bottom",});
            // navigation.replace("HomeTab"); //Navigation is handled automatically by AuthNavigation
            setEmail("");
            setPassword("");
          }else if(validUser.role === textData.roleAdmin){
            showToast({type: toast.typeError, text1: toast.typeAdmin, text2: toast.typeAdminInfo, position:"bottom"});
          }else{
            showToast({type:toast.typeError, text1: toast.loginFailed, text2: toast.loginFailedText, position:"bottom"});
          }
        }
    }catch(error){
      console.log("Login Error", error);
    }finally{
      setLoading(false); //stop loading
    }
   }
  return (
    <View style={globalStyles.container}>
      {/* navigate to admin login */}
      <LinkHandler content={textData.adminUser} onPress={handleNavigateToAdminLogin} textStyle={styles.adminLoginNavigator} viewStyle={{ alignSelf: 'flex-end' }} />
      <Text style={globalStyles.heading}>{greetings}</Text>
      <Text style={globalStyles.subHeading}>{textData.loginWelcome}</Text>
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
      <View style={globalStyles.rowContainer}>
        {/* remember me  - used reusable checkbox component */}
        {/* <CheckboxContent value={rememberMe} onValueChange={setRememberMe} tintColors={{true: colors.ORANGE_COLOR, false: colors.ORANGE_COLOR}} textContent={textData.rememberMe}/> */}

        {/* Forget Password - used resuable component for TouchableOpacity  */}
        <LinkHandler content={textData.forgetPassword} textStyle={styles.forgetPassword}/>
      </View>


       {/* Login Button - reusable component, navigates to next screen*/}
       {loading?( <ActivityIndicator size="small" color={colors.orange} style={{marginVertical:20, }}/>): (
        <Button text={textData.loginText} onPress={handleLogin} containerStyle={styles.loginButton}/>
        )}      

       {/* Move to signUp screen through register text  - reusable component*/}
       <LinkHandler onPress={handleNavigateToSignUp} content={textData.register} textStyle={styles.textRegister} viewStyle={{alignSelf:"flex-start"}}/>
       {/* Move to hometab as as guest */}
       <Button text={textData.continueAsGuest} onPress={handleNavigateAsGuest} containerStyle={styles.loginButton}/>

       {/* OR Login with text and  icon to login */}
       <Text style={globalStyles.smallText}>{textData.orLoginWith}</Text>
       {/* auth icons - link to other- reusable componnets*/}
       <View style={globalStyles.socialContainer}>
        <LinkHandler iconName="google" iconColor={colors.google} iconSize={28} />
        <LinkHandler iconName="facebook" iconColor={colors.faceBook} iconSize={28} />
        <LinkHandler iconName="twitter" iconColor={colors.twitter} iconSize={28}/>
       </View>
       {/* Terms and condition- rendered tochableopacity view and here passed parameters */}
       <LinkHandler content={textData.termsAndConditions} textStyle={globalStyles.termCondition}/>
   
    </View>
  )
}

export default Login

const styles=StyleSheet.create({
  
  forgetPassword: {
    fontSize: 14,
    color: colors.iconSkip,
    fontFamily: "AlanSans-Medium",
    marginLeft:15,
    marginTop:-5,
  },
  textRegister: {
    color: colors.black,
    fontFamily: "AlanSans-SemiBold",
    marginLeft:24,
    marginBottom: 30,
    fontSize:14,
  },
  loginButton:{
    marginTop:15, 
    marginHorizontal:12,
    marginBottom:10,
  },
  adminLoginNavigator:{
    marginRight:20,
    fontSize:15,
    color: colors.iconSkip,
    fontFamily: 'AlanSans-SemiBold',
  }

})