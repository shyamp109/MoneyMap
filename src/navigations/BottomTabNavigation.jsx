import React from 'react';
import {Text, Image, View, TouchableOpacity, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {scale} from 'react-native-size-matters';
import {FONTS, ICONS} from '../assets';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Budget from '../screens/Budget';
import Transaction from '../screens/Transaction';
import {COLORS} from '../utills/colors';
import {height, width} from '../utills/helper';
import {useNavigation} from '@react-navigation/native';
import AddExpense from '../screens/AddExpense';

const Tab = createBottomTabNavigator();

const CustomAddButton = ({onPress}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: Platform.OS === 'ios' ? 25 : 20,
      }}
      onPress={() => navigation.navigate('AddExpense')}>
      <Image
        source={ICONS.bottomAdd}
        style={{height: 50, width: 50, tintColor: '#fff'}}
      />
    </TouchableOpacity>
  );
};

const getIconByRouteName = name => {
  const icons = {
    Home: ICONS.bottomHome,
    Transaction: ICONS.bottomTransaction,
    Budget: ICONS.bottomBudget,
    Profile: ICONS.bottomProfile,
  };
  return icons[name];
};

const screenOptions = ({route}) => ({
  headerShown: false,
  tabBarStyle: {
    height: height * 0.08,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    height: height * 0.08,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  tabBarItemStyle: {
    flex: 1,
  },
  tabBarIcon: ({focused}) => {
    return (
      <Image
        source={getIconByRouteName(route.name)}
        style={{
          height: height * 0.035,
          width: height * 0.035,
          resizeMode: 'contain',
          tintColor: focused ? COLORS.primary : COLORS.focusOff,
        }}
      />
    );
  },
  tabBarLabel: ({focused}) => {
    return (
      <Text
        style={{
          fontSize: scale(11),
          fontFamily: FONTS.MontserratMedium,
          marginBottom: 5,
          color: focused ? COLORS.primary : COLORS.focusOff,
        }}>
        {route.name}
      </Text>
    );
  },
});

const MyTabs = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Transaction" component={Transaction} />

      <Tab.Screen
        name="AddExpense"
        component={AddExpense}
        options={{
          tabBarButton: () => <CustomAddButton />,
        }}
      />

      <Tab.Screen name="Budget" component={Budget} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default MyTabs;
