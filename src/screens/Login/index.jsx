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
import {height, showError, width} from '../../utills/helper';
import {userData, userToken} from '../../redux/reducres/authSlice';
import {useDispatch} from 'react-redux';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const Login = ({navigation}) => {
  const styles = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [GoogleIsLoading, setGoogleIsLoading] = useState(false);
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
      if (error.code === 'auth/invalid-credential') {
        showError('Invalid credential');
      } else if (error.code === 'auth/wrong-password') {
        showError('wrong password.');
      } else if (error.code === 'auth/invalid-email') {
        showError('Invalid email address.');
      } else {
        showError('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setGoogleIsLoading(true);
      const isSignedIn = await GoogleSignin.getCurrentUser();
      if (isSignedIn) {
        await GoogleSignin.signOut();
      }

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const {user, idToken} = userInfo.data;
      const {email, name, photo} = user;

      if (!idToken) {
        return;
      }

      const uid = user.id;
      const userDocRef = firestore().collection('users').doc(uid);
      const userSnapshot = await userDocRef.get();

      if (!userSnapshot.exists) {
        await userDocRef.set(
          {
            username: name,
            email,
            profilePic: photo,
            createdAt: firestore.FieldValue.serverTimestamp(),
          },
          {merge: true},
        );
      }
      const updatedUserDoc = await userDocRef.get();
      const userDataFromFirestore = updatedUserDoc.data();
      dispatch(userData(userDataFromFirestore));
      dispatch(userToken(idToken));
      setGoogleIsLoading(false);
      navigation.navigate('home');
    } catch (error) {
      console.error('🔥 Google Sign-In Error:', JSON.stringify(error, null, 2));

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        showError('Google Sign-In was cancelled.');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        showError('Google Sign-In is already in progress.');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        showError('Google Play Services not available.');
      } else {
        showError('Google Sign-In failed. Please try again.');
      }
    } finally {
      setGoogleIsLoading(false);
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
          <View
            style={{
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: height * 0.02,
            }}>
            <View
              style={{
                width: width * 0.4,
                height: 1,
                borderWidth: 1,
                borderColor: COLORS.secondary,
              }}
            />
            <Text
              style={{
                fontFamily: FONTS.MontserratMedium,
                fontSize: scale(12),
                color: COLORS.black,
                textAlign: 'left',
              }}>
              Or
            </Text>
            <View
              style={{
                width: width * 0.4,
                height: 1,
                borderWidth: 1,
                borderColor: COLORS.secondary,
              }}
            />
          </View>
          <CustomButton
            loading={isLoading}
            disabled={isLoading}
            title="Sign in with Google"
            icon={ICONS.google}
            isborder={true}
            isColor={COLORS.primary}
            onPress={handleGoogleSignIn}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
