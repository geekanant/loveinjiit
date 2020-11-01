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

export default class EditProfile extends React.Component {

   constructor(props) {
    super(props)
    this.state = {
      loading: false,
      dp: null,
      name:'',
      bio:'',
      year:'',
      gender:'',
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
     const uid = firebase.auth().currentUser.uid

     firebase.database().ref(`UsersList/${uid}`).update({

     })
      this.props.navigation.navigate('User');
   }





  render() {
    const dpr = this.state.dp ? (<TouchableOpacity onPress={ () => this.openPicker() }><Image
           style={{width: 100, height: 100, margin: 5}}
           source={{uri: this.state.dp}}
         /></TouchableOpacity>) : (<Button
        onPress={ () => this.openPicker() }
        title={ "Select Picture" } color="#09282f"
        />)

      const dps = this.state.loading ? <ActivityIndicator animating={this.state.loading} /> : (<View style={styles.container}>
        <View style={{flexDirection: "row"}}>

          { dpr }

        </View>
        <View style={{margin:20}}>
        <Button title="Upload!" color="#09282f" onPress={()=>this.loginUser()} />
        </View>
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
