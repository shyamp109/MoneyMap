import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import OTPTextInput from 'react-native-otp-textinput';
import {useStyles} from './style';
import {FONTS, IMAGES} from '../../assets';
import {scale} from 'react-native-size-matters';
import CustomButton from '../../components/CustomButton';
import {COLORS} from '../../utills/colors';
import {height, sendEmail, showError, showSuccess} from '../../utills/helper';
import firestore from '@react-native-firebase/firestore';
const OTPValidate = ({route, navigation}) => {
  const styles = useStyles();
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm();
  const {email} = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(60);
  const [otp, setOtp] = useState('');

  useEffect(() => {
    startResendTimer();
  }, []);

  const startResendTimer = () => {
    setResendDisabled(true);
    setCountdown(60);
    let timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleOtpValidateSubmit = async () => {
    if (otp.length < 6) {
      showError('Please enter a valid OTP');
      return;
    }
    setIsLoading(true);
    try {
      setTimeout(() => {
        setIsLoading(false);
        showSuccess('OTP Verified Successfully!');
        navigation.navigate('ResetPassword', {email});
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      showError('Invalid OTP, please try again.');
    }
  };

  const handleResendOTPSubmit = async () => {
    setResendDisabled(true);
    setCountdown(60);
    try {
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      await firestore().collection('otps').doc(email).set({otp: newOtp});
      await sendEmail(email, newOtp);
      showSuccess('A new OTP has been sent to your email.');
    } catch (error) {
      console.error('Resend OTP error:', error);
      showError('Failed to resend OTP. Please try again.');
      setResendDisabled(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <SafeAreaView
        style={Platform.OS === 'ios' && {backgroundColor: COLORS.white}}>
        <StatusBar
          backgroundColor={COLORS.white}
          translucent={false}
          barStyle="light-content"
        />
      </SafeAreaView>

      <ScrollView
        style={styles.scrollviewContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.mainConatiner}>
          <Image source={IMAGES.logo} style={styles.logo} />

          <Text
            style={{
              fontFamily: FONTS.MontserratExtraBold,
              fontSize: scale(30),
              color: COLORS.black,
            }}>
            Enter Your Verification Code
          </Text>
          <Text
            style={{
              fontFamily: FONTS.MontserratRegular,
              fontSize: scale(14),
              color: COLORS.black,
            }}>
            We sent a verification code to your email {email}. Please check your
            inbox.
          </Text>

          <Controller
            control={control}
            name="otp"
            rules={{required: 'Please enter OTP'}}
            render={({field: {onChange}}) => (
              <OTPTextInput
                handleTextChange={text => {
                  setOtp(text);
                  onChange(text);
                }}
                containerStyle={styles.textInputContainer}
                textInputStyle={{
                  color: COLORS.black,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderBottomWidth: 2,
                  width: height * 0.05,
                  height: height * 0.06,
                  textAlign: 'center',
                  padding: 0,
                }}
                inputCount={6}
                inputCellLength={1}
                tintColor={errors.otp ? COLORS.error : COLORS.primary}
                offTintColor={Array(6).fill(COLORS.focusOff)}
              />
            )}
          />
          {errors.otp && (
            <Text
              style={{
                fontSize: scale(12),
                fontFamily: FONTS.loraMedium,
                color: COLORS.error,
                marginLeft: 10,
              }}>
              {errors.otp.message} *
            </Text>
          )}

          <View style={styles.cardBtn}>
            <CustomButton
              loading={isLoading}
              disabled={isLoading}
              title="Verify OTP"
              onPress={handleSubmit(handleOtpValidateSubmit)}
            />
          </View>

          <View style={styles.textBottomSignup}>
            {resendDisabled ? (
              <Text style={styles.innerTextDown}>
                Resend OTP in{' '}
                <Text style={styles.innerTextForgot}>{countdown}s</Text>
              </Text>
            ) : (
              <TouchableOpacity onPress={handleResendOTPSubmit}>
                <Text style={styles.innerTextForgot}>Resend OTP</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default OTPValidate;
