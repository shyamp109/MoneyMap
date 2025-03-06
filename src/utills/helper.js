import {Dimensions} from 'react-native';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';
import {COLORS} from './colors';
import {FONTS} from '../assets';
import {scale} from 'react-native-size-matters';
export const height = Dimensions.get('screen').height;
export const width = Dimensions.get('screen').width;
import emailjs from '@emailjs/react-native';
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
      fontSize: scale(12),
      color: COLORS.black,
      fontFamily: FONTS.MontserratRegular,
    },
    text2Style: {
      fontSize: scale(12),
      color: COLORS.primary,
      fontFamily: FONTS.MontserratRegular,
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
      fontSize: scale(12),
      color: COLORS.black,
      fontFamily: FONTS.MontserratRegular,
    },
    text2Style: {
      fontSize: scale(12),
      color: COLORS.black,
      fontFamily: FONTS.MontserratRegular,
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

export const sendEmail = async (email, otp) => {
  const serviceID = 'service_pva5clo';
  const templateID = 'template_g2seb17';

  const templateParams = {
    email: email,
    message: `Your OTP Code is: ${otp}`,
  };
  try {
    await emailjs.send(serviceID, templateID, templateParams, {
      publicKey: 'kqkOsIuNbyTVPBMM3',
    });
    console.log('Email sent successfully');
  } catch (error) {
  }
};
