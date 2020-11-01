import React from 'react';
import { StyleSheet,  View,Dimensions,Animated,PanResponder,Alert,AsyncStorage ,StatusBar,ActivityIndicator } from 'react-native';
import {createStackNavigator} from 'react-navigation'
import Profile from '../screens/Profile';
import BottomB from '../screens/BottomB';
import PropTypes from 'prop-types';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import { Button } from 'react-native';
import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'
import '@firebase/storage'
import { YellowBox, Linking } from 'react-native';
YellowBox.ignoreWarnings(['Setting a timer']);
import { Container, Header, Content, Card, CardItem, Thumbnail,Text, Left, Body, Right,Toast } from 'native-base';
import AwesomeAlert from 'react-native-awesome-alerts';
import Modal from "react-native-modal";
import { Icon } from 'react-native-elements'
const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height
const tasks = [];
var Users=[
];
var Matches=[
];

export default class User extends React.Component {

  constructor(props){

    super(props)
    this.position=new Animated.ValueXY()
    this.state={
      currentIndex:0,
      authenticating:false,
    }

    this.rotate=this.position.x.interpolate({
      inputRange:[-SCREEN_WIDTH/2,0,SCREEN_WIDTH/2],
      outputRange:['-10deg','0deg','10deg'],
      extrapolate:'clamp'
    })

    this.rotateAndTranslate={
      transform:[{
        rotate:this.rotate
      },
      ...this.position.getTranslateTransform()
      ]
    }

    this.likeOpacity=this.position.x.interpolate({
      inputRange:[-SCREEN_WIDTH/2,0,SCREEN_WIDTH/2],
      outputRange:[0,0,1],
      extrapolate:'clamp'
    })

    this.dislikeOpacity=this.position.x.interpolate({
      inputRange:[-SCREEN_WIDTH/2,0,SCREEN_WIDTH/2],
      outputRange:[1,0,0],
      extrapolate:'clamp'
    })

    this.nextCardOpacity=this.position.x.interpolate({
      inputRange:[-SCREEN_WIDTH/2,0,SCREEN_WIDTH/2],
      outputRange:[1,0,1],
      extrapolate:'clamp'
    })

    this.nextCardScale=this.position.x.interpolate({
      inputRange:[-SCREEN_WIDTH/2,0,SCREEN_WIDTH/2],
      outputRange:[1,0.8,1],
      extrapolate:'clamp'
    })
  }


  componentWillMount(){

    this.PanResponder=PanResponder.create({
      onStartShouldSetPanResponder:(evt,gestureState)=>true,

      onPanResponderMove:(evt,gestureState)=>{
        this.position.setValue({x:gestureState.dx,y:gestureState.dy})
      },
      onPanResponderRelease:(evt,gestureState)=>{

        if(gestureState.dx>120){
          Animated.spring(this.position,{
            toValue:{x:SCREEN_WIDTH+100,y:gestureState.dy}
          }).start(()=>{
            this.setState({currentIndex:this.state.currentIndex+1},
              ()=>{
              this.position.setValue({x:0,y:0})
              firebase.auth().onAuthStateChanged(function(user) {
              if (user) {
                const { currentUser } = firebase.auth();
                const current = firebase.auth().currentUser.uid
              firebase.database().ref(`UsersList/${current}`).once('value',function(snapshot){
                 childData = snapshot.val().scannedUsers;
                console.log(childData)
              firebase.database().ref(`UsersList/${current}`).update({
                 scannedUsers:childData+1
              })
              });
              }
              }
              )
            }
          )
        })
      }

        else if (gestureState.dx<-120){
          Animated.spring(this.position,{
            toValue:{x:-SCREEN_WIDTH-100,y:gestureState.dy}
          }).start(()=>{
            this.setState({currentIndex:this.state.currentIndex+1},
              ()=>{
              this.position.setValue({x:0,y:0})
            firebase.auth().onAuthStateChanged(function(user) {
              if (user) {
              const { currentUser } = firebase.auth();
              const current = firebase.auth().currentUser.uid
              firebase.database().ref(`UsersList/${current}`).once('value',function(snapshot){
                 childData = snapshot.val().scannedUsers;
                console.log(childData)

              firebase.database().ref(`UsersList/${current}`).update({
                 scannedUsers:childData+1
               })
             });
             }
           })
          }
          )
          })

        }

        else{
          Animated.spring(this.position,{
            toValue:{x:0,y:0},
            friction:4
          }).start()
        }}
        })

  }


  logout() {
     AsyncStorage.removeItem('userData').then(() => {
       firebase.auth().signOut().then(() => {
         this.props.navigation.navigate('Intro');
       });
     });
  }


  sendRequest=(id,currentUser)=>{

      firebase.database().ref(`NumberOfUsers/`).once('value',function(snapshot){
         childData = snapshot.val().index;
        console.log("index"+childData)
        firebase.database().ref(`UsersList/${currentUser}`).once('value',function(snapshot){
          childData1=snapshot.val().scannedUsers;
          console.log("index"+childData1)
          if(childData1>childData){
          firebase.database().ref(`UsersList/${currentUser}`).update({
          scannedUsers:childData
        })
       }
     })
     });
     firebase.database().ref(`UsersList/${currentUser}`).once('value',function(snapshot){
        userGender=snapshot.val().gender;
        if(userGender=="F"){
          firebase.database().ref(`NumberOfUsers/`).once('value',function(snapshot){
             childData = snapshot.val().male;
            console.log("index"+childData)
            firebase.database().ref(`UsersList/${currentUser}`).once('value',function(snapshot){
              childData1=snapshot.val().scannedUsers;
              console.log("index"+childData1)
              if(childData1>childData){
              firebase.database().ref(`UsersList/${currentUser}`).update({
              scannedUsers:childData
            })
           }
         })
         });

        }
        else if(userGender=="M"){
          firebase.database().ref(`NumberOfUsers/`).once('value',function(snapshot){
             childData = snapshot.val().female;
            console.log("index"+childData)
            firebase.database().ref(`UsersList/${currentUser}`).once('value',function(snapshot){
              childData1=snapshot.val().scannedUsers;
              console.log("index"+childData1)
              if(childData1>childData){
              firebase.database().ref(`UsersList/${currentUser}`).update({
              scannedUsers:childData
            })
           }
         })
         });
        }

     })
    firebase.database().ref(`Request/${currentUser}/${id}`).once('value', function(snapshot) {
        var key = snapshot.key;
        var type = snapshot.child("type").val();
        console.log(key);
        console.log(type);

        if(type=='received')
          {
            firebase.database().ref(`UsersList/${id}`).once('value', (snapshot) => {
              var phone=snapshot.child("phone").val();
              var name = snapshot.child("name").val();
              var url=`https://api.whatsapp.com/send?phone=91${phone}`;
              console.log(url);
              console.log(phone);

              Alert.alert(
              'It\'s a Match!',
              `Wohoo! You have been matched with ${name}! Go Ahead and start a WhatsApp conversation\nNote: You/the other person will not be able to do it later`,
              [
                {text: 'Start A Conversation!', onPress: () =>  Linking.openURL(url)},
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              ],
              { cancelable: true }
              )

            Matches.push({name:name,url:url});

            firebase.database().ref(`UsersList/${currentUser}`).once('value',function(snapshot){
                childData = snapshot.val().matches;
                console.log(childData)
               firebase.database().ref(`UsersList/${id}`).update({
                  matches:childData+1
                })
              firebase.database().ref(`UsersList/${currentUser}`).update({
                   matches:childData+1
                })
            });

            firebase.database().ref(`Friends/${currentUser}/${id}`).set({
                name:name,
                url:url
            })

            firebase.database().ref(`Friends/${id}/${currentUser}`).set({
                name:name,
                url:url
            })
          })
        }

        else{

              firebase.database().ref(`Request/${currentUser}/${id}`).set({
                  type:"sent",
              })
              firebase.database().ref(`Request/${id}/${currentUser}`).set({
                  type:"received",
              })
              firebase.database().ref(`UsersList/${id}`).once('value', (snapshot) => {
                 var name = snapshot.child("name").val();
                    Alert.alert(
                     'Love Sent!',
                     `You have liked ${name} anonymously.`,
                        [
                         {text: 'Okay', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        ],
                         { cancelable: true }
                   )
              })
          }
  });

  var indexID;
  firebase.database().ref(`UsersList/${id}`).once('value',function(snapshot){
     indexID=snapshot.val().userIndex;

 firebase.database().ref(`UsersList/${currentUser}`).once('value',function(snapshot){
    childData = snapshot.val().scannedUsers;
    console.log(childData)

    firebase.database().ref(`UsersList/${currentUser}`).update({
    scannedUsers:indexID+1
   })
 })
 });

  this.setState({currentIndex:this.state.currentIndex+1},
    ()=>{
      this.position.setValue({x:0,y:0})
        }
      )

      console.log(Matches);
}

disliked=(id,currentUser)=>{

    firebase.database().ref(`NumberOfUsers/`).once('value',function(snapshot){
       childData = snapshot.val().index;
      console.log("index"+childData)
      firebase.database().ref(`UsersList/${currentUser}`).once('value',function(snapshot){
        childData1=snapshot.val().scannedUsers;
        console.log("index"+childData1)
        if(childData1>childData){
        firebase.database().ref(`UsersList/${currentUser}`).update({
        scannedUsers:childData
      })
     }
   })
   });
/*   firebase.database().ref(`UsersList/${currentUser}`).once('value',function(snapshot){
      userGender=snapshot.val().gender;
      if(userGender=="F"){
        firebase.database().ref(`NumberOfUsers/`).once('value',function(snapshot){
           childData = snapshot.val().male;
          console.log("index"+childData)
          firebase.database().ref(`UsersList/${currentUser}`).once('value',function(snapshot){
            childData1=snapshot.val().scannedUsers;
            console.log("index"+childData1)
            if(childData1>childData){
            firebase.database().ref(`UsersList/${currentUser}`).update({
            scannedUsers:childData
          })
         }
       })
       });

      }
      else if(userGender=="M"){
        firebase.database().ref(`NumberOfUsers/`).once('value',function(snapshot){
           childData = snapshot.val().female;
          console.log("index"+childData)
          firebase.database().ref(`UsersList/${currentUser}`).once('value',function(snapshot){
            childData1=snapshot.val().scannedUsers;
            console.log("index"+childData1)
            if(childData1>childData){
            firebase.database().ref(`UsersList/${currentUser}`).update({
            scannedUsers:childData
          })
         }
       })
       });
      }

   })*/
   var indexID;
   firebase.database().ref(`UsersList/${id}`).once('value',function(snapshot){
      indexID=snapshot.val().userIndex;

  firebase.database().ref(`UsersList/${currentUser}`).once('value',function(snapshot){
     childData = snapshot.val().scannedUsers;
     console.log(childData)

     firebase.database().ref(`UsersList/${currentUser}`).update({
     scannedUsers:indexID+1
    })
  })
  });


  this.setState({currentIndex:this.state.currentIndex+1},
    ()=>{
    this.position.setValue({x:0,y:0})
        }
      )
}


editprof(){
  this.props.navigation.navigate('EditProfile');
}


matches(){
  this.props.navigation.navigate('Matches');
}


reload(){
    var childData;
    var gender;
    var userGender;

    firebase.auth().onAuthStateChanged(function(user) {

    if (user) {
      const user = firebase.auth().currentUser.uid
      firebase.database().ref(`NumberOfUsers/`).once('value',function(snapshot){
         childData = snapshot.val().index;
        console.log("index"+childData)
        firebase.database().ref(`UsersList/${user}`).once('value',function(snapshot){
          childData1=snapshot.val().scannedUsers;
          console.log("index"+childData1)
          if(childData1>childData){
          firebase.database().ref(`UsersList/${user}`).update({
          scannedUsers:childData
        })
       }
     })
     });



      console.log(user)
      firebase.database().ref(`UsersList/${user}`).once('value',function(snapshot){
      Users=[];
      childData = snapshot.val().scannedUsers;
      gender=snapshot.val().gender;

      console.log(childData)
      console.log("Outer"+childData)
      firebase.database().ref('UsersList/').orderByChild('userIndex').startAt(childData+1).endAt(childData+20).once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val().image;
      var userIndex = childSnapshot.val().userIndex;
      console.log(userIndex);
      var name = childSnapshot.val().name;
      var year = childSnapshot.val().year;
      var matches=childSnapshot.val().matches;
      var genderUserList=childSnapshot.val().gender;

      console.log(Users.length)
      if(key!=  firebase.auth().currentUser.uid&& Users.length<=20&&genderUserList!=gender){
        Users.push({id:key,uri:childData,name:name,year:year,matches:matches});
      }
      });
      });
      });
    }
  });
  {this.renderUsers()}
  this.setState({currentIndex:0},
    ()=>{
    this.position.setValue({x:0,y:0})
        }
  )
}
  renderUsers=()=>{
    const { currentUser } = firebase.auth();
    return Users.map((item,i)=>{
      this.state.item=item.id
  //this.state.cUser=firebase.auth().currentUser.uid
      if(i<this.state.currentIndex){
        return null
      }

      else if(i==this.state.currentIndex){
      return(
        <Animated.View
        {...this.PanResponder.panHandlers}
        key={item.id} style={[this.rotateAndTranslate,
          {height:SCREEN_HEIGHT-100,width:SCREEN_WIDTH,padding:10,position:'absolute'}]}>

          <Animated.View style={{opacity:this.likeOpacity,transform:[{rotate:'-30deg'}],position:'absolute',top:50,left:40,
          zIndex:1000
          }}>
          <Text style ={{borderWidth:1,borderColor:'black',color:'black',fontSize:32,
          fontWeight:'800',padding:10
          }}>SKIP</Text>
          </Animated.View>

          <Animated.View style={{opacity:this.dislikeOpacity,transform:[{rotate:'30deg'}],position:'absolute',top:50,right:40,
          zIndex:1000
          }}>
          <Text style ={{borderWidth:1,borderColor:'black',color:'black',fontSize:32,
          fontWeight:'800',padding:10
          }}>SKIP</Text>
          </Animated.View>

          <Container style={{backgroundColor:'#f1f2f6'}}>
          <Content style={{backgroundColor:'#f1f2f6'}}>
          <Card style={{flex: 0}}>
          <CardItem>
          <Body>
          <Image indicator={ProgressBar} source={{uri:item.uri}} style={{height: SCREEN_HEIGHT-350, width: SCREEN_WIDTH-58,flex: 1,borderRadius:10}}/>
          </Body>
          </CardItem>
          <CardItem>
               <Body>
               <Text style={{marginLeft:10,fontWeight:'bold',fontSize:20,color:'#2f3542'}}>{item.name+", "+item.year+" year"}</Text>
               </Body>
               <Right>

               <Icon
               size={25}
               name='account-heart'
               type='material-community'
                 color='#ff6b81'
               />

               <Text style={{marginLeft:10,fontSize:15,color:'#2f3542'}}>{item.matches}</Text>
               </Right>
          </CardItem>
          <CardItem style={{alignItems:'center',justifyContent: 'center'}}>

              <Icon
                raised
                reverse
                name='heartbeat'
                type='font-awesome'
                color='#ff6b81'
                onPress={() => this.sendRequest(item.id,currentUser.uid)}
              />

            <Icon
                raised
                reverse
                name='refresh'
                size={40}
                type='font-awesome'
                color='#70a1ff'
                onPress={() =>this.reload()}
            />

            <Icon
                raised
                reverse
                name='close'
                type='font-awesome'
                color='#ff4757'
                onPress={() => this.disliked(item.id,currentUser.uid)}
            />

            </CardItem>
          </Card>
        </Content>
      </Container>
    </Animated.View>

      )
    }

      else{
        return(
          <Animated.View
      //    {...this.PanResponder.panHandlers}
          key={item.id} style={[
            {opacity:this.nextCardOpacity,transform:[{scale:this.nextCardScale}],
            height:SCREEN_HEIGHT-100,width:SCREEN_WIDTH,padding:10,position:'absolute'}]}>
            <Container style={{backgroundColor:'#f1f2f6'}}>
            <Content style={{backgroundColor:'#f1f2f6'}}>
            <Card style={{flex: 0}}>
            <CardItem>
            <Body>
            <Image indicator={ProgressBar} source={{uri:item.uri}} style={{height: SCREEN_HEIGHT-350, width: SCREEN_WIDTH-58,resizeMode:'cover',borderRadius:10 ,flex: 1}}/>

            </Body>
            </CardItem>
            <CardItem style={{marginBottom:0}}>
                 <Body>
                 <Text style={{marginLeft:10,fontWeight:'bold',fontSize:20,color:'#2f3542'}}>{item.name+", "+item.year+" year"}</Text>
                 </Body>
                 <Right>

                 <Icon
                   size={25}
                   name='account-heart'
                   type='material-community'
                   color='#ff6b81'
                />

                 <Text style={{marginLeft:10,fontSize:15,color:'#2f3542'}}>{item.matches}</Text>
                 </Right>
             </CardItem>
            <CardItem style={{alignItems:'center',justifyContent: 'center'}} >

                  <Icon
                    raised
                    name='heartbeat'
                    type='font-awesome'
                    color='#ff6b81'
                    reverse
                    onPress={() => this.sendRequest(item.id,currentUser.uid)}
                  />

                <Icon
                    raised
                    name='refresh'
                    reverse
                    type='font-awesome'
                    color='#70a1ff'
                    size={40}
                    onPress={() =>this.reload()}
                  />

                  <Icon
                      raised
                      reverse
                      name='close'
                      type='font-awesome'
                      color='#ff4757'
                      onPress={() => this.disliked(item.id,currentUser.uid)}
                    />

                </CardItem>
            </Card>
          </Content>
        </Container>
      </Animated.View>
        )
      }
    }).reverse()
}

  render() {

    const { currentUser } = this.state
    return (

      <View style={{backgroundColor: '#f1f2f6',flex:1}}>
      <StatusBar backgroundColor="#f1f2f6" barStyle="dark-content"/>
      <Card style={styles.card}>
      <CardItem style={styles.card}>
      <Left style={{marginTop:10}}>
      <Icon
      size={55}
      type='foundation'
      name='info'
      color='#70a1ff'
      onPress={() =>this.matches()}
      />
      </Left>

      <Body>
      <Text style={{fontFamily:'cheri',textAlign:'center',color:'#2f3542',fontSize:20}}>Love in JIIT</Text>

      </Body>

      <Right>

      <Icon
      size={45}
      type='font-awesome'
      name='user'
      color='#ff4757'
      onPress={() =>this.editprof()}
      />

      </Right>
      </CardItem>
      </Card>

      <View style={{height:10}}>
      </View>
      <View  style={{flex:1,height:100}}>
      <View style={{marginTop:SCREEN_HEIGHT-(120+SCREEN_HEIGHT/2)}}>
      <Icon
        size={100}
        type='material-community'
        name='reload'
        color='#2ed573'
        onPress={() =>this.reload()}
      />

      <Text style={{fontFamily:'Avenir-Medium',textAlign:'center',justifyContent:'center',alignItems:'center'}}> {"Tap till Users load\n Or wait for more users to Sign Up"}</Text>
      </View>
          {this.renderUsers()}
    </View>
  </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#455a64',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container1: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    buttonContainer: {
        flex: 1,
    },
    card: {
      height: 55,
        backgroundColor:'#f1f2f6',
        width: undefined,
        borderWidth:0,
        marginTop: 5,
        marginLeft: 0,
        marginRight: 0,
        borderColor:'#f1f2f6',
        elevation: 0
    },
    cardItem: {

    }
});
