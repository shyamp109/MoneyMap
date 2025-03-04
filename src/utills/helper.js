import {Dimensions} from 'react-native';
import * as Yup from 'yup';
export const height = Dimensions.get('screen').height;
export const width = Dimensions.get('screen').width;

export const showSuccess = message => {
  Toast.show({
    swipeable: true,
    type: 'success',
    text1: 'Success',
    text2: message,
    position: 'top',
    visibilityTime: 3000,
    autoHide: true,
    text1Style: {
      fontSize: scale(14),
      color: COLORS.black,
      fontFamily: fonts.MontserratRegular,
    },
    text2Style: {
      fontSize: scale(16),
      color: COLORS.primary,
      fontFamily: fonts.MontserratRegular,
    },
  });
};

export const showError = message => {
  Toast.show({
    swipeable: true,
    type: 'error',
    text1: 'Error',
    text2: message,
    position: 'top',
    visibilityTime: 3000,
    autoHide: true,
    text1Style: {
      fontSize: scale(13),
      color: COLORS.black,
      fontFamily: fonts.MontserratRegular,
    },
    text2Style: {
      fontSize: scale(14),
      color: COLORS.black,
      fontFamily: fonts.MontserratRegular,
    },
  });
};

export const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('User Name is required')
    .matches(/^[A-Za-z]+$/i, 'User Name must contain only letters')
    .min(3, 'User Name must be at least 3 characters long'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
    ),
});
