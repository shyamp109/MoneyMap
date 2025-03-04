import React from 'react';
import {Text, Image, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {scale} from 'react-native-size-matters';
import {FONTS, ICONS} from '../assets';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Budget from '../screens/Budget';
import AddExpense from '../screens/AddExpense';
import Transaction from '../screens/Transaction';
import {COLORS} from '../utills/colors';
import {height} from '../utills/helper';

const MyTabs = () => {
  const Tab = createBottomTabNavigator();

  const icons = {
    Home: ICONS.bottomHome,
    Transaction: ICONS.bottomTransaction,
    Add: ICONS.bottomAdd,
    Budget: ICONS.bottomBudget,
    Profile: ICONS.bottomProfile,
  };

  const getIconByRouteName = name => {
    return icons[name];
  };

  const screenOptions = ({route}) => ({
    headerTitleAlign: 'center',
    headerShown: false,
    tabBarStyle: {
      height: Platform.OS === 'ios' ? height * 0.1 : height * 0.075,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    tabBarIcon: ({focused}) => {
      return (
        <Image
          source={getIconByRouteName(route.name)}
          style={{
            height: height * 0.03,
            width: height * 0.03,
            objectFit: 'contain',
            marginTop: 10,
            tintColor: focused ? COLORS.primary : COLORS.focusOff,
          }}
        />
      );
    },
    tabBarLabel: ({focused}) => {
      return (
        <Text
          style={{
            fontSize: scale(10),
            fontFamily: FONTS.MontserratMedium,
            color: focused ? COLORS.primary : COLORS.focusOff,
            marginBottom: 5,
          }}>
          {route.name}
        </Text>
      );
    },
  });

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Transaction" component={Transaction} />
      <Tab.Screen name="Add" component={AddExpense} />
      <Tab.Screen name="Budget" component={Budget} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default MyTabs;
