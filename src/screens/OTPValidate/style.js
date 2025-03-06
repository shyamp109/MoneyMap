import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {FONTS} from '../../assets';
import {COLORS} from '../../utills/colors';
import {height, width} from '../../utills/helper';

export const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollviewContainer: {
      backgroundColor: COLORS.white,
    },
    image: {
      flex: 1,
      justifyContent: 'flex-end',
      height: height * 0.3,
    },
    textContainer: {
      padding: 10,
    },
    textContainer1: {
      marginTop: height * 0.03,
      marginBottom: height * 0.015,
    },
    imageStyle: {
      height: height * 0.2,
      width: width * 0.7,
      alignSelf: 'center',
      tintColor: COLORS.primary,
      resizeMode: 'contain',
    },
    mainText: {
      color: COLORS.primary,
      fontFamily: FONTS.MontserratMedium,
      fontSize: scale(24),
      textAlign: 'center',
    },
    innerText: {
      color: COLORS.black,
      fontFamily: FONTS.MontserratMedium,
      fontSize: scale(13),
      marginTop: height * 0.01,
      textAlign: 'center',
    },
    text: {
      color: '#fff',
      fontSize: scale(10),
      textAlign: 'center',
      fontWeight: '700',
      marginBottom: height * 0.04,
    },
    mainConatiner: {
      backgroundColor: COLORS.white,
      paddingHorizontal: height * 0.02,
      paddingVertical: height * 0.01,
      borderRadius: height * 0.01,
      justifyContent: 'space-between',
    },
    otpText: {
      fontSize: scale(16),
      color: '#555',
      marginVertical: 20,
    },
    textInputContainer: {
      marginTop: height * 0.03,
    },
    roundedTextInput: {
      color: COLORS.text,
      borderRadius: 10,
      borderWidth: 2,
      borderBottomWidth: 2,
      width: height * 0.05,
      height: height * 0.05,
      textAlign: 'center',
      padding: 0,
    },
    logo: {
      height: height * 0.15,
      width: height * 0.15,
      resizeMode: 'contain',
      alignSelf: 'center',
    },

    otpContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    otpInput: {
      width: 40,
      height: 40,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#000',
      textAlign: 'center',
      fontSize: scale(18),
    },
    cardBtn: {
      marginTop: height * 0.035,
    },
    btnText: {
      fontSize: scale(13),
      color: COLORS.white,
      fontFamily: FONTS.MontserratMedium,
      textAlign: 'center',
    },
    rememberMeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    checkbox: {
      marginRight: 10,
    },
    rememberMeText: {
      fontSize: scale(16),
    },
    textBottoForgot: {
      alignItems: 'flex-end',
      marginVertical: height * 0.02,
    },
    innerTextForgot: {
      color: COLORS.primary,
      fontFamily: FONTS.MontserratMedium,
      fontSize: scale(13),
    },
    textBottomSignup: {
      alignItems: 'center',
      marginVertical: height * 0.02,
    },
    innerTextDown: {
      color: COLORS.black,
      fontFamily: FONTS.MontserratMedium,
      fontSize: scale(13),
      textAlign: 'center',
    },
  });
};
