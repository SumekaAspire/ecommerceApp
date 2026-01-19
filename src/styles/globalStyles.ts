import react, { StyleSheet } from 'react-native';
import { colors } from './colors';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_BACKGROUNDCOLOR,
    padding: 20,
    paddingTop:40,
  },
  text: {
    color: colors.black,
    fontSize: 14,
    fontFamily: 'FigTree-Regular',
  },
  /*SignUp and Login Screen */
  continueBtnText: {
    textAlign: 'center',
    color: colors.white,
    fontFamily: 'AlanSans-Regular',
    fontSize: 18,
    alignItems: 'center',
  },
  /** Common button for intro,auth screens */
  button: {
    width: "100%",
    height: 47,
    backgroundColor: colors.buttons,
    borderRadius: 10,
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.labelColor,
    left: 29,
    marginBottom: 3,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 18,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 17,
  },
  input: {
    flex: 1,
    marginLeft: 5,
    fontSize: 14,
    fontFamily: 'FigTree-Regular',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    textAlign: 'right',
    right: 12,
  },
  heading: {
    fontSize: 28,
    fontFamily: 'AlanSans-Medium',
    marginTop: 15,
    marginBottom:5,
  },
  subHeading: {
    fontSize: 14,
    marginBottom: 20,
    fontFamily: 'AlanSans-Regular',
    color: colors.labelColor,
    left: 5,
  },
  smallText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'FigTree-Regular',
    color: colors.labelColor,
    marginBottom: 10,
    marginTop:10,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    marginHorizontal: 12,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  termCondition: {
    textAlign: 'center',
    padding: 35,
    fontSize: 14,
    fontFamily: 'AlanSans-Regular',
    color: colors.labelColor,
  
  },
  //   globalError: {
  //     color: 'red',
  //     fontSize: 12,
  //     textAlign: 'center',
  //     right: 12,
  //   },
  //   buttonText: {
  //     color: colors.white,
  //     textAlign: 'center',
  //     fontWeight: 'bold',
  //   },
});
