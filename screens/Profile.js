import React from 'react';
import { StyleSheet, Text, View,Dimensions,Image,Animated,PanResponder,ActivityIndicator,TouchableOpacity,TextInput } from 'react-native';
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

export default class Profile extends React.Component {

   constructor(props) {
    super(props)
    this.state = {
      loading: false,
      dp: null,
      name:'',
      NumberOfUsers:'',
      year:'',
      gender:'',
      index:'',
      phone:'',
      userIndexM:'',
      userIndexF:'',
     }
     console.ignoredYellowBox = [
    'Setting a timer'
     ]
   }


   openPicker(){

     this.setState({ loading: true })
     const Blob = RNFetchBlob.polyfill.Blob
     const fs = RNFetchBlob.fs
     window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
     window.Blob = Blob
     const uid = firebase.auth().currentUser.uid
     ImagePicker.openPicker({
       width: 300,
       height: 300,
       cropping: true,
       mediaType: 'photo'
     }).then(image => {

       const imagePath = image.path
       let uploadBlob = null

       const imageRef = firebase.storage().ref(uid).child("dp.jpg")
       let mime = 'image/jpg'

       fs.readFile(imagePath, 'base64')
         .then((data) => {
           return Blob.build(data, { type: `${mime};BASE64` })
       })
       .then((blob) => {
           uploadBlob = blob
           return imageRef.put(blob, { contentType: mime })
         })
         .then(() => {
           uploadBlob.close()
           return imageRef.getDownloadURL()
         })
         .then((url) => {

           let userData = {}
           firebase.database().ref(`UsersList/${uid}`).update({
               image:url

           })
           let obj = {}
           obj["loading"] = false
           obj["dp"] = url
           this.setState(obj)

         })
         .catch((error) => {
           console.log(error)
         })
     })
     .catch((error) => {
       console.log(error)
     })

   }

   loginUser(){
     let genderM='M';
     let genderF='F';

     const uid = firebase.auth().currentUser.uid
    if(this.state.dp==null){
       alert('Upload Profile Picture to continue')
     }
     else if(this.state.phone==''){
       alert('Enter Phone Number to continue')
     }
     else if(this.state.name==''){
       alert('Enter Name to continue')
     }
     else if(isNaN(this.state.phone)){
       alert('Enter Valid Phone Number')
     }
     else if((this.state.phone).length!=10){
       alert('Enter Valid Phone Number')
     }
     else if(isNaN(this.state.year)){
       alert('Enter Valid Enrollment Number')
     }
     else if(this.state.year==''){
       alert('Enter year to continue')
     }
     else if(this.state.gender==''){
       alert('Enter gender to continue')
     }
     else if(this.state.gender!==genderF&&this.state.gender!==genderM){
       alert("Enter only M/F")
     }
     else{

       firebase.database().ref(`NumberOfUsers/`).once('value',function(snapshot){
            childData = snapshot.val().index;
            firebase.database().ref(`UsersList/${uid}`).update({
              userIndex:childData+1,
       })
     })

firebase.database().ref(`NumberOfUsers/`).once('value',function(snapshot){
        childData = snapshot.val().index;
     firebase.database().ref(`NumberOfUsers/`).update({

         index:childData+1,
     })
   }
 )

if(this.state.gender=="M"){

  firebase.database().ref(`NumberOfUsers/`).once('value',function(snapshot){
          childData = snapshot.val().male;
       firebase.database().ref(`NumberOfUsers/`).update({
           male:childData+1,

       })
     }
   )

   firebase.database().ref(`NumberOfUsers/`).once('value',function(snapshot){
        childData = snapshot.val().male;
        firebase.database().ref(`UsersList/${uid}`).update({
          userIndexM:childData+1,
   })
 })

}

else if(this.state.gender=="F"){

  firebase.database().ref(`NumberOfUsers/`).once('value',function(snapshot){
          childData = snapshot.val().female;
       firebase.database().ref(`NumberOfUsers/`).update({
           female:childData+1,
       })
     }
   )
   firebase.database().ref(`NumberOfUsers/`).once('value',function(snapshot){
        childData = snapshot.val().female;
        firebase.database().ref(`UsersList/${uid}`).update({
          userIndexF:childData+1,
   })
 })
}


     firebase.database().ref(`UsersList/${uid}`).update({
         name:this.state.name,
         year:this.state.year,
         phone:this.state.phone,
         scannedUsers:0,
         matches:0,
         gender:this.state.gender,

     })



     alert("Avoid swipe if it lags on your phone. Instead, use love or dislike button\nIf you are matched, make sure you start a conversation.");
     this.props.navigation.navigate('User');

  }

}

/* For Male Female
loginUser(){
  const uid = firebase.auth().currentUser.uid
  const kgender=this.state.gender

  if(kgender=='M'){
  firebase.database().ref(`UsersList/Male/${uid}`).update({
      name:this.state.name,
      bio:this.state.bio,
      year:this.state.year,
      gender:this.state.gender,
      time:new Date(),
      phone:this.state.phone
  })
}

  else{
  firebase.database().ref(`UsersList/FeMale/${uid}`).update({
      name:this.state.name,
      bio:this.state.bio,
      year:this.state.year,
      gender:this.state.gender,
      time:new Date(),
      phone:this.state.phone
  })
}
*/


  render() {
    const dpr = this.state.dp ? (<TouchableOpacity onPress={ () => this.openPicker() }><Image
           style={{width: 100, height: 100, margin: 5}}
           source={{uri: this.state.dp}}
         /></TouchableOpacity>) : (<Button
        onPress={ () => this.openPicker() }
        title={ "Upload Picture" } color="#09282f"
        />)

      const dps = this.state.loading ? <ActivityIndicator animating={this.state.loading} /> : (<View style={styles.container}>
        <View style={{flexDirection: "row"}}>
          { dpr }

        </View>
        <TextInput style={styles.inputBox}
          placeholder="Name"
          placeholderTextColor="#fff"
          onChangeText={(name) => this.setState({name})}
           value={this.state.name}
        />

        <TextInput style={styles.inputBox}
          placeholder="Gender (M/F)"
          placeholderTextColor="#fff"
          onChangeText={(gender) => this.setState({gender})}
           value={this.state.gender}
        />

        <TextInput style={styles.inputBox}
          placeholder="Year E.g. 3"
          autoCapitalize="none"
          placeholderTextColor="#fff"
          onChangeText={(year) => this.setState({year})}
           value={this.state.year}
        />

        <TextInput style={styles.inputBox}
          placeholder="WhatsApp Number without +91"
          autoCapitalize="none"
          placeholderTextColor="#fff"
          onChangeText={(phone) => this.setState({phone})}
           value={this.state.phone}
        />
        <Text style={{color:'#fff',textAlign:'center',justifyContent:'center',alignItems:'center',margin:20}}>
          {"Note: WhatsApp Number, Gender, Year, Name cannot be changed afterwards.\n Also, if you are matched with someone, he/she will be allowed to start a conversation with you on WhatsApp."}

        </Text>
        <Button title="Start!" color="#09282f" onPress={()=>this.loginUser()} />

      </View>)


      return(
        <View style={styles.container}>
              { dps }
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
