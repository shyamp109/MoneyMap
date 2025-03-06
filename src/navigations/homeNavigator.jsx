import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyTabs from './BottomTabNavigation';
import DialPad from '../screens/DialPad';
import SetPin from '../screens/SetPin';
const HomeNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="home">
      <React.Fragment>
        <Stack.Screen name="home" component={MyTabs} />
      </React.Fragment>
    </Stack.Navigator>
  );
};

export default HomeNavigator;
