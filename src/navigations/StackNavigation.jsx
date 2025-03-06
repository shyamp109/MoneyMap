import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeNavigator from './homeNavigator';
import Splashscreen from '../screens/Splashscreen';
import {useSelector} from 'react-redux';
import AuthNavigator from './AuthNavigator';

const StackNavigation = () => {
  const [isSplashScreen, setSplashScreen] = useState(true);
  const {userInfo} = useSelector(state => state.auth);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashScreen(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isSplashScreen) {
    return <Splashscreen />;
  }

  return (
    <NavigationContainer>
      {userInfo.token ? <HomeNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default StackNavigation;
