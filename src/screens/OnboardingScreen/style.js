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
    scrollContainer: {
      flexGrow: 1,
      padding: 20,
    },
    skipButton: {
      position: 'absolute',
      backgroundColor: COLORS.secondary,
      padding: height * 0.01,
      alignItems: 'center',
      justifyContent: 'center',
      top: 50,
      right: scale(20),
      paddingHorizontal: height * 0.025,
      zIndex: 1,
      borderRadius: 10,
    },
    skipText: {
      color: COLORS.primary,
      fontSize: scale(16),
      fontFamily: FONTS.MontserratMedium,
    },
    content: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    image: {
      width: height * 0.3,
      height: height * 0.3,
      resizeMode: 'contain',
    },
    title: {
      fontSize: scale(28),
      fontFamily: FONTS.MontserratBold,
      color: COLORS.black,
      textAlign: 'center',
      marginTop: 20,
    },
    description: {
      fontSize: scale(14),
      fontFamily: FONTS.MontserratRegular,
      color: COLORS.black,
      textAlign: 'center',
      marginTop: 10,
      paddingHorizontal: 10,
    },
    dotContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: scale(20),
    },
    dot: {
      width: height * 0.015,
      height: height * 0.015,
      borderRadius: 50,
      marginHorizontal: 5,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      padding: 20,
      marginTop: height * 0.02,
    },
    nextButton: {
      backgroundColor: COLORS.primary,
      padding: 12,
      borderRadius: 10,
      width: width * 0.9,
      alignItems: 'center',
    },
    nextText: {
      color: COLORS.white,
      fontSize: scale(16),
      fontFamily: FONTS.MontserratMedium,
    },
  });
};
