import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useStyles} from './style';
import {FONTS, ICONS, IMAGES} from '../../assets';
import CustomTextInput from '../../components/CustomTextInput';
import {COLORS} from '../../utills/colors';
import CustomButton from '../../components/CustomButton';
import {scale} from 'react-native-size-matters';

const ForgotPassword = ({navigation}) => {
  const styles = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const password = useRef(null);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSignInPressed = async data => {};
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
            Forgot
          </Text>
          <Text
            style={{
              fontFamily: FONTS.MontserratExtraBold,
              fontSize: scale(30),
              color: COLORS.black,
              textAlign: 'left',
            }}>
            Your Password
          </Text>
          <Text
            style={{
              fontFamily: FONTS.MontserratRegular,
              fontSize: scale(14),
              color: COLORS.black,
              textAlign: 'left',
            }}>
            Enter your email and we’ll send you a link to reset your password.
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

          <View style={styles.btn}>
            <CustomButton
              loading={isLoading}
              disabled={isLoading}
              title="Forgot Password"
              onPress={handleSubmit(onSignInPressed)}
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
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
