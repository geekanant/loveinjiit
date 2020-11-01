import React from 'react';
import { StyleSheet, Text, View,Dimensions,Image,Animated,PanResponder,AsyncStorage } from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen';
import User from './screens/User'
import Profile from './screens/Profile'
import Start from './screens/Start'
import Intro from './screens/Intro'
import EditProfile from './screens/EditProfile'
import AuthLoadingScreen from './screens/AuthLoadingScreen'
import Matches from './screens/Matches'
import {createSwitchNavigator } from 'react-navigation'
import { Button } from 'react-native';
import {createStackNavigator} from 'react-navigation'
import { YellowBox } from 'react-native'

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

const AppStack = createStackNavigator({

  User:User,
  EditProfile:EditProfile,
  Matches:Matches,
},
{
  headerMode: 'none',
}
);
const AuthStack = createStackNavigator({
  Intro:Intro,
  WelcomeScreen: WelcomeScreen,
  Profile:Profile,

},
{
  headerMode: 'none',
}
);

export default createSwitchNavigator(
  {
    AuthLoadingScreen:AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoadingScreen',
  },

);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
