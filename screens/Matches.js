import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Body,Left,Thumbnail,Right } from "native-base";
import {  Linking,TouchableHighlight } from 'react-native';

export default class CardItemBordered extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content padder>
          <Card>
            <CardItem header bordered>
              <Text >Love in JIIT v1.0.1</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text style={{fontFamily:'Avenir-Medium'}}>
                  {"Love in JIIT is a dating app made exclusively for JIITians.\nFor any queries/suggestions contact me on my e-mail id - anantpatni1@gmail.com"}
                </Text>
              </Body>
            </CardItem>
            <CardItem footer bordered >
            <TouchableHighlight onPress={ () => Linking.openURL('https://www.linkedin.com/in/anant-patni-660594130/') }>
              <Text>{"Developed with love by- \n"+'Anant Patni'}</Text>
              </TouchableHighlight>

              <Right>
                <TouchableHighlight onPress={ () => Linking.openURL('https://www.linkedin.com/in/anant-patni-660594130/') }>
              <Thumbnail  source={require('../assets/anant.jpg')} />
              </TouchableHighlight>

              </Right>

            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
