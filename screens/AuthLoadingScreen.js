import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { Root } from "native-base";

export default class AuthLoadingScreen extends React.Component {

  constructor(props) {
    super(props);
  }
  componentWillMount(){
  AsyncStorage.getItem('userData').then((user_data_json) => {
     let user_data = JSON.parse(user_data_json);
     if(user_data != null){
       this.props.navigation.navigate('App');
     } 
     else{
       this.props.navigation.navigate('Auth');
     }
   });
}
  render() {
    return (
      <View style={{justifyContent:'center',alignItems:'center'}} >
        <ActivityIndicator />
      </View>
    );
  }
}
