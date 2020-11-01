import React from 'react';
import { StyleSheet, Text, View,Dimensions,Image,Animated,PanResponder,TextInput,Button } from 'react-native';
import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'

const firebaseConfig={
  apiKey: "AIzaSyAaZ9lw6idLAstPCxGVduQBh_oV1GJTFec",
     authDomain: "loveinjiit.firebaseapp.com",
     databaseURL: "https://loveinjiit.firebaseio.com",
     projectId: "loveinjiit",
     storageBucket: "loveinjiit.appspot.com"

};
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Setting a timer']);


firebase.initializeApp(firebaseConfig);
const database = firebase.database();

 class WelcomeScreen extends React.Component {
constructor(props){
  super(props)

  this.state=({
    email:'',
    password:''
  })

}

signUpUser=(email,password)=> {
 firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(()=>
    {
      const userId = firebase.auth().currentUser.uid

   firebase.database().ref(`UsersList/${userId}`).set({
       email,
     password
   })
    })
}


signUpUser1=(email,password)=> {
  firebase.auth().signInWithEmailAndPassword(email,password)
  .then((userData) =>
      {

            this.props.navigation.navigate('User');

      }
    ).catch((error) =>
        {
              this.setState({
                loading: false
              });
        alert('Login Failed. Please try again'+error);
    });
  }




loginUser=(email,password)=>{
  firebase.auth().signInWithEmailAndPassword(email,password)
  .then((userData) =>
      {

            this.props.navigation.navigate('Profile');

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
            <Text>Sign Up</Text>
            {this.state.errorMessage &&
              <Text style={{ color: 'red' }}>
                {this.state.errorMessage}
              </Text>}
            <TextInput
              placeholder="Email"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={(email) => this.setState({email})}
               value={this.state.email}
            />
            <TextInput
              secureTextEntry
              placeholder="Password"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
            />
            <Button title="Sign Up" onPress={()=>this.signUpUser(this.state.email,this.state.password)} />
            <Button
              title="Already have an account? Login"
            onPress={()=>this.loginUser(this.state.email,this.state.password)}
            />
            <Button title="Sign Up" onPress={()=>this.signUpUser1(this.state.email,this.state.password)} />

          </View>
    );
  }
}


export default WelcomeScreen;
const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    textInput: {
      height: 40,
      width: '90%',
      borderColor: 'gray',
      borderWidth: 1,
      marginTop: 8
    }
});
