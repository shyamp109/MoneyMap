import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Image,
  Modal,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useStyles} from './style';
import {FONTS, ICONS, IMAGES} from '../../assets';
import CustomTextInput from '../../components/CustomTextInput';
import {COLORS} from '../../utills/colors';
import CustomButton from '../../components/CustomButton';
import {scale} from 'react-native-size-matters';
import {showError, showSuccess, validationSchema} from '../../utills/helper';
import {yupResolver} from '@hookform/resolvers/yup';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const Register = ({navigation}) => {
  const styles = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const password = useRef(null);
  const email = useRef(null);

  const handleAccountCreated = () => {
    setIsModalVisible(false);
    navigation.navigate('Login');
  };
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      cpassword: '',
      address: '',
    },
    resolver: yupResolver(validationSchema),
  });
  const onSignUpPressed = async data => {
    console.log('data: ', data);
    setIsLoading(true);
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        data.email,
        data.password,
      );
      const user = userCredential.user;
      await user.sendEmailVerification();
      await firestore().collection('users').doc(user.uid).set({
        username: data.username,
        email: data.email,
        created_at: new Date(),
      });
      setIsLoading(false);
      setIsModalVisible(true);
      showSuccess('User Created Successfully!');
    } catch (error) {
      console.log('error: ', error.message);
      showError(error.message);
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
          barStyle={'light-content'}
        />
      </SafeAreaView>

      <ScrollView
        style={styles.scrollviewContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.mainConatiner}>
          <View>
            <Image source={IMAGES.logo} style={styles.logo} />
          </View>
          <Text
            style={{
              fontFamily: FONTS.MontserratExtraBold,
              fontSize: scale(30),
              color: COLORS.black,
              textAlign: 'left',
            }}>
            Let's
          </Text>
          <Text
            style={{
              fontFamily: FONTS.MontserratExtraBold,
              fontSize: scale(30),
              color: COLORS.black,
              textAlign: 'left',
            }}>
            Get Started
          </Text>
          <Text
            style={{
              fontFamily: FONTS.MontserratRegular,
              fontSize: scale(14),
              color: COLORS.black,
              textAlign: 'left',
            }}>
            Create an account to track your expenses
          </Text>
          <CustomTextInput
            name="username"
            placeholder="Username"
            type="text"
            control={control}
            rules={{
              required: 'Username is required',
            }}
            KeyboardType={undefined}
            onSubmitEditing={() => email?.current?.focus()}
            returnKeyType="next"
          />
          <CustomTextInput
            name="email"
            placeholder="Email"
            type="text"
            control={control}
            icon={ICONS.email}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address',
              },
            }}
            ref={email}
            KeyboardType={undefined}
            onSubmitEditing={() => password?.current?.focus()}
            returnKeyType="next"
          />
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
            ref={password}
            KeyboardType={undefined}
            onSubmitEditing={handleSubmit(onSignUpPressed)}
            returnKeyType="next"
          />

          <View style={styles.btn}>
            <CustomButton
              loading={isLoading}
              disabled={isLoading}
              title="Sign Up"
              onPress={handleSubmit(onSignUpPressed)}
            />
          </View>

          <Text style={styles.individualText}>
            Already have an account?
            <Text
              style={{
                fontFamily: FONTS.MontserratMedium,
                fontSize: scale(14),
                color: COLORS.primary,
              }}
              onPress={() => {
                navigation.navigate('Login', {
                  isEditable: false,
                  driverData: null,
                });
              }}>
              {' ' + 'Login'}
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
                <Text style={styles.title}>Account Created Successfully</Text>
                <Text style={styles.subtitle}>
                  Your account has been created successfully. Listen to your
                  favorite music.
                </Text>
                <CustomButton
                  smallButton
                  title={'Go to Home'}
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

export default Register;
