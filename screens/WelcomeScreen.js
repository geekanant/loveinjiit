import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dimensions,StatusBar, StyleSheet, Text,TextInput, View,ImageBackground,Image,Animated,PanResponder,Linking,AsyncStorage  } from 'react-native';
import {Item, Picker } from 'native-base';

import { Button } from 'react-native-elements';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;
import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'
const firebaseConfig={
  apiKey: "apiKey",
     authDomain: "domain",
     databaseURL: "dbURL",
     projectId: "PID",
     storageBucket: "bucketURL"

};
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Setting a timer']);


firebase.initializeApp(firebaseConfig);
class WelcomeScreen extends React.Component {
  constructor(props){
    super(props)

    this.state=({
      email:'',
      password:'',
        selected2: '',
        enroll:'',
        dob:'',
        loading:false,
    })

  }

  onValueChange2(value: string) {
      this.setState({
        selected2: value
      });
    }
  signUpUser=(email,password,enroll,dob,selected2)=> {

  if(this.state.enroll==''){
      alert('Enter Enrollment Number')
    }
    else if((this.state.enroll).length<8){
      alert('Enter Valid Enrollment Number')
    }
    else if(isNaN(this.state.enroll)){
      alert('Enter Valid Enrollment Number')

    }
    else if(this.state.dob==''){
      alert('Enter Date of Birth')
    }
    else if(this.state.selected2==''){
      alert('Select Institute')
    }
    else if((this.state.dob).length!=10){
      alert('Enter Valid Date of Birth')
    }
    else if(this.state.email==''){
      alert('Enter Email')
    }
     else if(this.state.password==''){
      alert('Enter Password')
    }

  else{

   firebase.auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(()=>
      {

        const userId = firebase.auth().currentUser.uid

     firebase.database().ref(`UsersList/${userId}`).set({
         email,
       password,
       enroll,
       dob,
     })
     alert("You can now Login. Tap the Login Button Below.");

      })
      .catch((error) =>
          {
                this.setState({
                  loading: false
                });

          alert('Sign Up Failed. Please try again.\n '+error);
      });
}
      }


  /*signUpUser1=(email,password)=> {


    firebase.auth().signInWithEmailAndPassword(email,password)
    .then((userData) =>
        {

        //  AsyncStorage.setItem('userData', JSON.stringify(userData));
           this.props.navigation.navigate(
             'Start'
           );

        }
      ).catch((error) =>
          {
                this.setState({
                  loading: false
                });
          alert('Login Failed. Please try again'+error);
      });
    }
*/

  loginUser=(email,password,enroll)=>{


    firebase.auth().signInWithEmailAndPassword(email,password)
    .then((userData) =>
        {

           AsyncStorage.setItem('userData', JSON.stringify(userData));
              firebase.auth().onAuthStateChanged(user => {
                this.props.navigation.navigate('Profile')
              })

        }
      ).catch((error) =>
          {
                this.setState({
                  loading: false
                });
          alert('Login Failed. Please try again'+error);
      });

    }

  render() {
    return (
      <View style={styles.container}>

      <StatusBar backgroundColor="#1c313a" barStyle="light-content"/>
        <Item picker style={styles.picker}>
             <Picker
             selectedValue={this.state.selected2}
onValueChange={this.onValueChange2.bind(this)}

             style={{color:'#ecf0f1'}}>
             <Picker.Item label="Select Institute" value="key0" />
               <Picker.Item label="JIIT128" value="key1" />
               <Picker.Item label="JIIT62" value="key2" />

             </Picker>
        </Item>

          <TextInput style={styles.inputBox}
          placeholder="Enrollment Number"
          autoCapitalize="none"
          placeholderTextColor="#ecf0f1"
          onChangeText={(enroll) => this.setState({enroll})}
          value={this.state.enroll}
          />
          <TextInput style={styles.inputBox}
          placeholder="DOB(DD-MM-YYYY)"
          autoCapitalize="none"
          placeholderTextColor="#ecf0f1"
          onChangeText={(dob) => this.setState({dob})}
          value={this.state.dob}
          />

        <TextInput style={styles.inputBox}
        secureTextEntry
        placeholder="Password"
        autoCapitalize="none"
        placeholderTextColor="#ecf0f1"
        onChangeText={(password) => this.setState({password})}
        value={this.state.password}
        />
        <TextInput style={styles.inputBox}
        placeholder="Email"
        autoCapitalize="none"
        placeholderTextColor="#ecf0f1"
        onChangeText={(email) => this.setState({email})}
        value={this.state.email}
        />
        <View >
        <Button buttonStyle={{
          backgroundColor: "#09282f",
          width:120,
          borderColor: "transparent",
          borderWidth: 0,
          borderRadius: 25,
          margin:10
          }}
          title="Sign Up"
        onPress={()=>this.signUpUser(this.state.email,this.state.password,this.state.enroll,this.state.dob,this.state.selected2)}
        />
        <Button buttonStyle={{
          backgroundColor: "#09282f",
          width:120,
          borderColor: "transparent",
          borderWidth: 0,
          borderRadius: 25,
          margin:10
          }}
          title="Login"
        onPress={()=>this.loginUser(this.state.email,this.state.password)}
        />
        </View>

      </View>
    );
  }
}
export default WelcomeScreen;
const styles=StyleSheet.create({
    container:
    {
      backgroundColor:'#455a64',
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
    inputBox:{
      width:'90%',
      backgroundColor:'rgba(255,255,255,0.3)',
      borderRadius:25,
      paddingHorizontal:16,
      fontSize:16,
      color:'#fff',
      marginVertical:10
    },
    picker:{
      width:'90%',
      backgroundColor:'rgba(255,255,255,0.3)',
      borderRadius:25,
      paddingHorizontal:16,
      marginVertical:10,
      color:'#fff',
    },
    button:{
      backgroundColor:'#1c313a',
      borderRadius:25,
      width:300,
      marginVertical:10,
      paddingVertical:12
    },
    textButton:{
      fontSize:16,
      fontWeight:'500',
      color:'#ffffff',
      textAlign:'center'
    }
});
