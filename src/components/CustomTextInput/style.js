import {StyleSheet} from 'react-native';
import {height, width} from '../../utills/helper';
import {scale} from 'react-native-size-matters';
import {FONTS} from '../../assets';
import {COLORS} from '../../utills/colors';

export const useStyles = () => {
  return StyleSheet.create({
    mainContainer: {},
    container: {
      height: height / 16,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: width / 24,
      borderWidth: 1.5,
    },
    input: {
      color: 'black',
    },
    mainContainerMultilineView: {
      height: height / 8,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: width / 24,
      borderWidth: 1,
      borderColor: COLORS.textInputBorder,
    },
    view: {
      height: height / 16,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: width / 24,
      borderWidth: 1,
      borderColor: COLORS.textInputBorder,
    },
    mainContainerMultilinefocus: {
      height: height / 8,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: width / 24,
      borderWidth: 1,
    },
    focusedView: {
      height: height / 16,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: width / 24,
      borderWidth: 1,
    },
    mainContainerMultilineError: {
      height: height / 8,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: width / 24,
      borderWidth: 1,
    },
    errorView: {
      height: height / 16,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: width / 24,
      borderWidth: 1,
    },
    icon: {
      height: 20,
      width: 20,
    },
    focusedIcon: {
      height: 20,
      width: 20,
    },
    errorIcon: {
      height: 20,
      width: 20,
    },
    textInput: {
      fontSize: scale(15),
      color: COLORS.textInputPlaceholder,
      fontFamily: FONTS.MontserratMedium,
      flex: 1,
    },
    errorText: {
      fontSize: scale(12),
      fontFamily: FONTS.MontserratRegular,
      marginLeft: height * 0.02,
    },
  });
};
