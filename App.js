/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import LoginPage from './app/containers/LoginPage';
import HomePage from './app/containers/HomePage';
import RequestPage from './app/containers/RequestPage';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
const routeConfigs = {
  Login: {
    screen: LoginPage,
    navigationOptions: {
      title: 'Login Page',
    },
  },
  Home: {
    screen: HomePage,
    navigationOptions: {
      title: 'Home',
      headerLeft: null,
    },
  },
  Request: {
    screen: RequestPage,
    navigationOptions: {
      title: 'Emergency Response Panel',
    },
  },
};

const StackNavigatorConfig = {
  initialRouteName: 'Login',
  headerMode: 'none',
  navigationOptions: {
        headerVisible: false,
  },
};

const AppNavigator = createStackNavigator(routeConfigs, StackNavigatorConfig);

const App = createAppContainer(AppNavigator);

export default App;
