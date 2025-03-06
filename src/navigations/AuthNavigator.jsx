import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../screens/Login';
import Register from '../screens/Register';
import ForgotPassword from '../screens/ForgotPassword';
import OTPValidate from '../screens/OTPValidate';
import ResetPassword from '../screens/ResetPassword';
import {setOnboarding} from '../redux/reducres/authSlice';
import {useDispatch, useSelector} from 'react-redux';
import OnboardingScreen from '../screens/OnboardingScreen';
import MyTabs from './BottomTabNavigation';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();
  const {isFirstTimeUser} = useSelector(state => state.auth);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isFirstTimeUser ? (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      ) : (
        <React.Fragment>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="OTPValidate" component={OTPValidate} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          {/* <Stack.Screen key={'home'} name={'home'} component={MyTabs} /> */}
        </React.Fragment>
      )}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
