import React from 'react'
import {
  Text,
  View,Image
} from 'react-native'
import Swiper from 'react-native-swiper'
import { Button,StatusBar } from 'react-native';

var styles = {
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a1c45a'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1c550'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ea4c4c'
  },
  slide4: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ea4c4c'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    margin:15,
    textAlign:'center'
  }
}


export default class Intro extends React.Component{
constructor(props) {
 super(props)
}
render(){
  return(
<Swiper style={styles.wrapper} >
  <View style={styles.slide1}>
  <Image
       source={require('../assets/1.jpg')}
       style={{height:300,width:200,borderRadius:10,resizeMode:'cover',borderColor:'black',borderWidth:5}}
     />
    <Text style={styles.text}>Hello JIITian</Text>
    <Text style={{color:'white',margin:10}}>{"Welcome to \nLove In JIIT"}</Text>

  </View>
  <View style={styles.slide2}>
  <Image
       source={require('../assets/2.jpg')}
       style={{height:300,width:200,borderRadius:10,resizeMode:'cover',borderColor:'black',borderWidth:5}}
     />

    <Text style={styles.text}>{"Like Users\n Anonymously"}</Text>
    <Text style={{color:'white',margin:10,textAlign:'center'}}>{"Send a heart anonymously"}</Text>

  </View>
  <View style={styles.slide4}>
  <Image
       source={require('../assets/4.jpg')}
       style={{height:300,width:200,borderRadius:10,resizeMode:'cover',borderColor:'black',borderWidth:5}}
     />
    <Text style={styles.text}>{"It's a Match!"}</Text>
    <Text style={{color:'white',margin:10,textAlign:'center'}}>{"If you receive a heart back, \nyou will be matched!"}</Text>


  </View>
  <View style={styles.slide3}>
  <Image
       source={require('../assets/3.jpg')}
       style={{height:300,width:200,borderRadius:10,resizeMode:'cover',borderColor:'black',borderWidth:5}}
     />
    <Text style={styles.text}>Skip Users</Text>
    <Text style={{color:'white',margin:10,textAlign:'center'}}>{"Swipe Left/Right \nto skip"}</Text>
    <Button title="Start!" color="#09282f" onPress={()=>this.props.navigation.navigate('WelcomeScreen')} />

  </View>

</Swiper>
)
}
}
