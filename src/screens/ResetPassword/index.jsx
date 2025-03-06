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

const ResetPassword = ({route, navigation}) => {
  const {email} = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const styles = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    getValues,
    watch,
    formState: {errors},
  } = useForm();
  const newPassword = watch('password');
  const handleAccountCreated = () => {
    setIsModalVisible(false);
    navigation.navigate('Login');
  };
  const onResetPasswordPressed = async data => {
    setIsLoading(true);

    try {
      // 1️⃣ Get user document from Firestore
      const userQuery = await firestore()
        .collection('users')
        .where('email', '==', email)
        .get();

      if (userQuery.empty) {
        Alert.alert('Error', 'No user found with this email.');
        setIsLoading(false);
        return;
      }

      const userDoc = userQuery.docs[0].ref;
      await userDoc.update({
        password: data.password,
      });
      showSuccess('Password updated successfully');
      setIsModalVisible(true);
    } catch (error) {
      console.log('Reset Password Error:', error);
      Alert.alert('Error', 'Failed to update password. Please try again.');
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
            Create Your New Password
          </Text>
          <Text
            style={{
              fontFamily: FONTS.MontserratRegular,
              fontSize: scale(14),
              color: COLORS.black,
            }}>
            Your new password must be different from previous password.
          </Text>
          <CustomTextInput
            name="password"
            icon={ICONS.password}
            type="password"
            placeholder="Password"
            secureTextEntry
            control={control}
            rules={{
              required: 'Password is required',
            }}
            KeyboardType={undefined}
          />

          <CustomTextInput
            name="cpassword"
            icon={ICONS.password}
            type="password"
            placeholder="Confirm Password"
            secureTextEntry
            control={control}
            rules={{
              required: 'Confirm Password is required',
              validate: value =>
                value === newPassword || 'Passwords do not match',
            }}
            KeyboardType={undefined}
          />
          <View style={styles.btn}>
            <CustomButton
              loading={isLoading}
              disabled={isLoading}
              title="Reset Password"
              onPress={handleSubmit(onResetPasswordPressed)}
            />
          </View>
        </View>
      </ScrollView>
      {isModalVisible && (
        <Modal transparent visible={isModalVisible} animationType="fade">
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalContent}>
                <Image source={IMAGES.success} style={styles.successIcon} />
                <Text style={styles.title}>Password updated!</Text>
                <Text style={styles.subtitle}>
                  Your password has been setup successfully
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

export default ResetPassword;
