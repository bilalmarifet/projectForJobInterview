import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Dimensions} from 'react-native';
import {createDrawerNavigator} from 'react-navigation-drawer';
const {width} = Dimensions.get('window');

import Home from '../screens/AppScreens/Home';
import Blank from '../screens/AppScreens/Blank';
import SideBar from '../screens/AppScreens/SideBar';
import Login from '../screens/AuthScreens/Login';
import AuthLoading from '../screens/AuthLoading';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';

import UserInfo from '../screens/AppScreens/User/UserInfo';
import PastOrders from '../screens/AppScreens/Order/PastOrders';
import {Icon} from 'native-base';
import {colors} from '../constants';
const MainStack = createStackNavigator(
  {
    Home: {screen: Home},
  },
  {
    initialRouteName: 'Home',
    // headerMode: "none"
  },
);

const UserStack = createStackNavigator(
  {
    User: {screen: UserInfo},
  },
  {
    initialRouteName: 'User',
    // headerMode: "none"
  },
);

const AuthStack = createStackNavigator(
  {
    Login: {screen: Login},
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);

const OrderStack = createStackNavigator(
  {
    PastOrder: {screen: PastOrders},
  },
  {
    initialRouteName: 'PastOrder',
  },
);

const tabNavigator = createBottomTabNavigator(
  {
    Restaurants: {
      screen: MainStack,
      navigationOptions: {
        tabBarIcon: ({focused, tintColor}) => {
          return (
            <Icon
              style={{color: focused ? colors.primary : colors.secondary}}
              name={'ios-home'}
              color={focused ? colors.accent : colors.secondary}
            />
          );
        },
      },
    },
    Profile: {
      screen: UserStack,
      navigationOptions: {
        tabBarIcon: ({focused, tintColor}) => {
          return (
            <Icon
              style={{color: focused ? colors.primary : colors.secondary}}
              name={'ios-radio-button-on'}
              color={focused ? colors.accent : colors.secondary}
            />
          );
        },
      },
    },
    Orders: {
      screen: OrderStack,
      navigationOptions: {
        tabBarIcon: ({focused, tintColor}) => {
          return (
            <Icon
              style={{color: focused ? colors.primary : colors.secondary}}
              name={'md-reorder'}
              color={focused ? colors.accent : colors.secondary}
            />
          );
        },
      },
    },
  },
  {
    tabBarComponent: props => (
      <TabBarComponent
        {...props}
        style={{
          borderTopColor: '#605F60',
          borderTopWidth: 0,
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.52,
          shadowRadius: 2.46,
          elevation: 9,
          backgroundColor: 'white',
          shadowColor: colors.secondary,
          borderBottomWidth: 0,
        }}
      />
    ),
  },
);

const TabBarComponent = props => <BottomTabBar {...props} />;

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      AuthStack: AuthStack,
      AppStack: tabNavigator,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
