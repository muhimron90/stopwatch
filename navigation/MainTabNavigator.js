import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';


import Home from '../screens/Pages/Home';
import About from '../screens/Pages/About';
const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: Home,
  },
  config
);

HomeStack.navigationOptions = {
  
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-stopwatch${focused ? '' : '-outline'}`
          : 'md-stopwatch'
      }
    />
  ),
};

HomeStack.path = '';

const AboutStack = createStackNavigator(
  {
    About: About,
  },
  config
);

AboutStack.navigationOptions = {
  tabBarLabel: 'About',
  tabBarIcon: ({
    focused
  }) => ( <
    TabBarIcon focused = {
      focused
    }
    name = {
      Platform.OS === 'ios' ? 'ios-information-circle' : 'md-information-circle'
    }
    />
  ),
};

AboutStack.path = '';



const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  AboutStack,
  // LinksStack,
  // SettingsStack,

  
},
{
  initialRouteName: 'HomeStack',
    animationEnabled: false,
    swipeEnabled: false,
    lazyLoad: true,
    tabBarOptions: {
    tinColor: '#fff',
    activeTintColor: '#fff',
    inactiveTintColor: '#888',
    
    indicatorStyle: {
      backgroundColor: 'transparent'
    },
    style: {
     backgroundColor: '#2d3436',
     
 
    }
  }
}

);
tabNavigator.navigationOptions = {
  
  
}
tabNavigator.path = '';

export default tabNavigator;
