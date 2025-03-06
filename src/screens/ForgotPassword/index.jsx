import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Image,
  Alert,
  Modal,
} from 'react-native';
import {useForm} from 'react-hook-form';
import {useStyles} from './style';
import {FONTS, ICONS, IMAGES} from '../../assets';
import CustomTextInput from '../../components/CustomTextInput';
import {COLORS} from '../../utills/colors';
import CustomButton from '../../components/CustomButton';
import {scale} from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';
import {sendEmail, showSuccess} from '../../utills/helper';
import auth from '@react-native-firebase/auth';
const ForgotPassword = ({navigation}) => {
  const styles = useStyles();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const handleAccountCreated = () => {
    setIsModalVisible(false);
    navigation.navigate('Login');
  };
  const generateOTP = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

  // const sendEmail = async (email, otp) => {
  //   const serviceID = 'service_pva5clo';
  //   const templateID = 'template_g2seb17';

  //   const templateParams = {
  //     email: email,
  //     message: `Your OTP Code is: ${otp}`,
  //   };
  //   try {
  //     await emailjs.send(serviceID, templateID, templateParams, {
  //       publicKey: 'kqkOsIuNbyTVPBMM3',
  //     });
  //     console.log('Email sent successfully');
  //   } catch (error) {
  //     console.error('Failed to send email:', error);
  //   }
  // };

  const onForgotPassword = async data => {
    setIsLoading(true);
    const {email} = data;

    try {
      await auth().sendPasswordResetEmail(email);
      setIsModalVisible(true);
    } catch (error) {
      console.error('Error sending reset email:', error);
    } finally {
      setIsLoading(false);
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
            Forgot Your Password
          </Text>
          <Text
            style={{
              fontFamily: FONTS.MontserratRegular,
              fontSize: scale(14),
              color: COLORS.black,
            }}>
            Enter your email and we’ll send you a verification code.
          </Text>

          <CustomTextInput
            name="email"
            placeholder="Email"
            control={control}
            icon={ICONS.email}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address',
              },
            }}
          />

          <View style={styles.btn}>
            <CustomButton
              loading={isLoading}
              disabled={isLoading}
              title="Sumbit"
              onPress={handleSubmit(onForgotPassword)}
            />
          </View>

          <Text style={styles.individualText}>
            Back to Login?
            <Text
              style={{
                fontFamily: FONTS.MontserratMedium,
                fontSize: scale(14),
                color: COLORS.primary,
              }}
              onPress={() => navigation.navigate('Login')}>
              {' Login'}
            </Text>
          </Text>
        </View>
      </ScrollView>
      {isModalVisible && (
        <Modal transparent visible={isModalVisible} animationType="fade">
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalContent}>
                <Image source={IMAGES.success} style={styles.successIcon} />
                <Text style={styles.title}>Email Sent!</Text>
                <Text style={styles.subtitle}>
                  Please check your email and verify it then reset your
                  password.
                </Text>
                <CustomButton
                  smallButton
                  title={'Go to Login'}
                  onPress={handleAccountCreated}
                />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
