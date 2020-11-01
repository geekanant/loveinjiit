import React from 'react'
import {  Text, TouchableOpacity, StyleSheet } from 'react-native'
import AwesomeAlert from 'react-native-awesome-alerts';
import Modal from "react-native-modal";

 class AlertM extends React.Component {

  render() {
    return (
         <Modal isVisible={true}>
           <View style={{ flex: 1 }}>
             <Text>I am the modal content!</Text>
           </View>
         </Modal>
    );
  }
}
export default AlertM;

const styles = StyleSheet.create ({
   button: {
      backgroundColor: '#4ba37b',
      width: 100,
      borderRadius: 50,
      alignItems: 'center',
      marginTop: 100
   }
})
