/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import LoginScreen from './app/containers/Login';
import HomeScreen from './app/containers/Root';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const routeConfigs = {
  Login: LoginScreen,
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Home',
      headerLeft: null,
    }
  },
}

const StackNavigatorConfig = {
  initialRouteName: 'Login',
}

const AppNavigator = createStackNavigator(routeConfigs, StackNavigatorConfig);

const App = createAppContainer(AppNavigator);

export default App;
