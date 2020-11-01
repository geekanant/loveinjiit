/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'

AppRegistry.registerComponent(appName, () => App);
