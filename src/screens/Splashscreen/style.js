import {StyleSheet} from 'react-native';
import {COLORS} from '../../utills/colors';
import {height, width} from '../../utills/helper';
import {FONTS} from '../../assets';
import {scale} from 'react-native-size-matters';

export const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imgContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },

    image: {
      width: height * 0.2,
      height: height * 0.2,
      resizeMode: 'contain',
      tintColor: COLORS.white,
    },
    title: {
      fontSize: scale(32),
      color: COLORS.white,
      fontFamily: FONTS.MontserratExtraBold,
    },
  });
};
