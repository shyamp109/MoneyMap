import {StyleSheet} from 'react-native';
import {COLORS} from '../../utills/colors';
import {height, width} from '../../utills/helper';
import {FONTS} from '../../assets';
import {scale} from 'react-native-size-matters';

export const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
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
    },
    listContainer: {
      paddingBottom: height * 0.15,
    },
    movieItem: {
      width: width / 2 - 24,
      alignItems: 'center',
      backgroundColor: '#f8f8f8',
      borderRadius: 8,
      padding: 8,
    },
    row: {
      justifyContent: 'space-between', // Space between items
      marginBottom: 16,
    },
    movieImage: {
      width: 100,
      height: 150,
    },
    movieInfo: {
      flex: 1,
      padding: 10,
      justifyContent: 'center',
    },
    movieTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.heading,
    },
    emptyText: {
      textAlign: 'center',
      fontSize: 16,
      color: COLORS.gray,
      marginTop: 20,
    },
    logoutContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: 16,
      marginBottom: height * 0.08,
      backgroundColor: COLORS.white,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background
    },
    modalContainer: {
      width: '85%',
      backgroundColor: COLORS.white,
      borderRadius: 10,
      padding: height * 0.024,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: scale(18),
      fontFamily: FONTS.MontserratBold,
      color: COLORS.primary,
      marginBottom: 10,
    },
    modalMessage: {
      fontFamily: FONTS.MontserratMedium,
      color: COLORS.gray,
      textAlign: 'center',
      marginTop: height * 0.01,
    },
    modalActions: {
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      gap: 10,
      marginTop: height * 0.04,
    },
    cancelButton: {
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    cancelButtonText: {
      color: COLORS.heading,
      fontFamily: FONTS.MontserratSemibold,
      fontSize: scale(14),
    },
    logoutButton: {
      minWidth: '30%',
      textAlignL: 'center',
      paddingVertical: height * 0.015,
      backgroundColor: COLORS.primary,
      borderTopRightRadius: height * 0.04,
      borderBottomLeftRadius: height * 0.04,
    },
    logoutButtonText: {
      color: COLORS.white,
      fontFamily: FONTS.MontserratMedium,
      fontSize: scale(14),
    },
  });
};
