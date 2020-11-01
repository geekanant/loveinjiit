import React from 'react';
import { StyleSheet, Text, View,Dimensions,Image,Animated,PanResponder,ActivityIndicator,TouchableOpacity,TextInput,AsyncStorage } from 'react-native';
import { Button } from 'react-native';
import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'
import '@firebase/storage'
import ImagePicker from 'react-native-image-crop-picker'
import RNFetchBlob from 'rn-fetch-blob'
const database = firebase.database();
import { YellowBox } from 'react-native';
import { Container, Header, Content, Form, Item, Picker } from 'native-base';

YellowBox.ignoreWarnings(['Setting a timer']);

export default class Start extends React.Component {

   constructor(props) {
    super(props)
    this.state = {
      loading: false,
      dp: null,

     }
     console.ignoredYellowBox = [
    'Setting a timer'
     ]
   }



   loginUser(){

             firebase.auth().onAuthStateChanged(function(user) {
                 if (user) {

                const uid = firebase.auth().currentUser.uid
                  this.props.navigation.navigate('User');
                }
              });
   }
componentWillMount(){

}

  render() {
      return(
            <View style={{flexDirection: "row"}}>
            <Button title="Start!" color="#09282f" onPress={()=>this.loginUser()} />  
           </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#455a64',
    alignItems: 'center',
    justifyContent:'center',
  },
  inputBox:{
    width:300,
    backgroundColor:'rgba(255,255,255,0.3)',
    borderRadius:25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#fff',
    marginVertical:10
  },

});
