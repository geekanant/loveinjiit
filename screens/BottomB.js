import React from 'react';
import { StyleSheet, Text, View,Dimensions,Image,Animated,PanResponder } from 'react-native';
import { Button } from 'react-native';

 class BottomB extends React.Component {

  render() {
    return (
      <View style={styles.container}>
      <Text>Matched</Text>

      </View>
    );
  }
}

export default BottomB;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection :'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:0,
  },
});
