import {StyleSheet} from 'react-native';
import {COLORS} from '../../utills/colors';
import {height, width} from '../../utills/helper';
import {FONTS} from '../../assets';
import {scale} from 'react-native-size-matters';

export const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
    scrollviewContainer: {
      marginHorizontal: height * 0.02,
      marginVertical: height * 0.01,
    },
    mainConatiner: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: COLORS.card,
      borderRadius: height * 0.01,
      marginVertical: height * 0.02,
      gap: height * 0.015,
    },
    profileContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: height * 0.02,
    },
    logoBg: {
      backgroundColor: COLORS.bg,
      height: height * 0.13,
      width: height * 0.13,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      height: height * 0.15,
      width: height * 0.15,
      resizeMode: 'contain',
      alignSelf: 'center',
    },
    text: {
      color: COLORS.white,
      fontFamily: FONTS.MontserratBold,
      fontSize: height * 0.04,
    },
    text1: {
      color: COLORS.heading,
      fontFamily: FONTS.MontserratBold,
      fontSize: height * 0.04,
    },
    text2: {
      color: COLORS.white,
      fontFamily: FONTS.MontserratLight,
      fontSize: height * 0.017,
    },
    logoText: {
      fontFamily: FONTS.MontserratMedium,
      fontSize: scale(14),
      color: COLORS.black,
      textAlign: 'center',
      marginTop: height * 0.06,
      marginBottom: height * 0.02,
      backgroundColor: COLORS.heading,
      alignSelf: 'center',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
    },
    errorText: {
      fontFamily: FONTS.MontserratMedium,
      fontSize: scale(12),
      color: COLORS.error,
      marginLeft: 15,
    },
    warningContainer: {
      backgroundColor: COLORS.warningBackground,
      paddingHorizontal: height * 0.02,
      paddingVertical: height * 0.01,
      borderRadius: 10,
    },
    profileText: {
      fontFamily: FONTS.MontserratMedium,
      fontSize: scale(12),
      color: COLORS.primary,
      marginTop: height * 0.01,
    },
    warningText: {
      fontFamily: FONTS.MontserratRegular,
      fontSize: scale(12),
      color: COLORS.warning,
      textAlign: 'left',
    },
    forgotText: {
      fontFamily: FONTS.MontserratMedium,
      fontSize: scale(14),
      color: COLORS.black,
      textAlign: 'right',
      marginTop: height * 0.01,
    },
    lineView: {
      borderBottomWidth: 1.5,
      borderColor: COLORS.textInputPlaceholder,
      marginVertical: height * 0.015,
    },
    individualText: {
      fontFamily: FONTS.MontserratMedium,
      fontSize: scale(14),
      color: COLORS.grayLight,
      textAlign: 'center',
    },
    btn: {
      marginVertical: height * 0.02,
      alignItems: 'center',
    },
  });
};
