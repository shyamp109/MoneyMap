import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useStyles} from './style';
import {FONTS, ICONS, IMAGES} from '../../assets';
import CustomTextInput from '../../components/CustomTextInput';
import {COLORS} from '../../utills/colors';
import CustomButton from '../../components/CustomButton';
import {scale} from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {showError} from '../../utills/helper';
import {userData, userToken} from '../../redux/reducres/authSlice';
import {useDispatch} from 'react-redux';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const Login = ({navigation}) => {
  const styles = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const password = useRef(null);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '717657845942-valm1cj3hlg5eav9vmqa070fqk3f0850.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  const onSignInPressed = async data => {
    setIsLoading(true);
    const {email, password} = data;
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      const {uid} = userCredential.user;
      const token = await userCredential.user.getIdToken();
      const userDoc = await firestore().collection('users').doc(uid).get();
      if (userDoc.exists) {
        dispatch(userToken(token));
        dispatch(userData(userDoc?.data()));
        navigation.navigate('home');
      } else {
        showError('User record not found in Firestore.');
      }
    } catch (error) {
      console.log('error: ', error);
      if (error.code === 'auth/user-not-found') {
        showError('No user found with this email.');
      } else if (error.code === 'auth/wrong-password') {
        showError('Incorrect password.');
      } else if (error.code === 'auth/invalid-email') {
        showError('Invalid email address.');
      } else if (error.code === 'auth/invalid-credential') {
        showError('Invalid Credential');
      } else {
        showError('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('Google User Data:', userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login process');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing in...');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available');
      } else {
        console.log('Google Sign-In Error:', error);
      }
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
            Hey,
          </Text>
          <Text
            style={{
              fontFamily: FONTS.MontserratExtraBold,
              fontSize: scale(30),
              color: COLORS.black,
              textAlign: 'left',
            }}>
            Welcome Back
          </Text>
          <Text
            style={{
              fontFamily: FONTS.MontserratRegular,
              fontSize: scale(14),
              color: COLORS.black,
              textAlign: 'left',
            }}>
            Login now to track all your expenses
          </Text>
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
            onSubmitEditing={handleSubmit(onSignInPressed)}
            returnKeyType="next"
          />
          <Text
            style={styles.forgotText}
            onPress={() => navigation.navigate('ForgotPassword')}>
            Forgot Password?
          </Text>
          <View style={styles.btn}>
            <CustomButton
              loading={isLoading}
              disabled={isLoading}
              title="Log In"
              onPress={handleSubmit(onSignInPressed)}
            />
          </View>

          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleSignIn}>
            {/* <Image source={ICONS.google} style={styles.googleIcon} /> */}
            <Text style={styles.googleText}>Sign in with Google</Text>
          </TouchableOpacity>

          <Text style={styles.individualText}>
            Don't have an account?
            <Text
              style={{
                fontFamily: FONTS.MontserratMedium,
                fontSize: scale(14),
                color: COLORS.primary,
              }}
              onPress={() => {
                navigation.navigate('Register', {
                  isEditable: false,
                  driverData: null,
                });
              }}>
              {' ' + 'Sign up'}
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
