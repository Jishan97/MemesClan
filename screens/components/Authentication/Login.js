import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    AsyncStorage
} from "react-native";
import * as Google from 'expo-google-app-auth';
import axios from 'axios';
import { SocialIcon,Image } from 'react-native-elements'
console.disableYellowBox = true;
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
          signedIn: false,
          name: "",
          photoUrl: "",
          loading:false
        }
      }
      
      signIn = async () => {

      

        try {   


            const result = await Google.logInAsync({
        androidStandaloneAppClientId:"452697598621-h9l8trs3u5cptkc8tve1giblr03itn5l.apps.googleusercontent.com",   
        behavior:'web',
              androidClientId: '452697598621-t213ttpk4mn3jcokl4up2stqrcrplig1.apps.googleusercontent.com',
              scopes: ['profile', 'email'],
            });
        



            if (result.type === 'success') {
              

                  await AsyncStorage.setItem('userToken',result.user.email);
                  await AsyncStorage.setItem('username',result.user.name);
                  await AsyncStorage.setItem('userAvatar',result.user.photoUrl);

                    const googleData = {
                      username:result.user.givenName,
                      email:result.user.email,
                      userAvatar:result.user.photoUrl

                    }
                  try {
                    // await axios.post('https://quiet-journey-66288.herokuapp.com/registerGoogle',googleData);

                   const Gettoken = await axios.post("http://192.168.0.24:4000/api/auth/registerGoogle", googleData);
                   console.log(Gettoken.data);
                   await AsyncStorage.setItem('token',Gettoken);

                   this.setState({
                    signedIn: true,
                    name: result.user.givenName,
                    photoUrl: result.user.photoUrl
                  })
                    //save the token in local storage

                  }
                  catch(e){
                  
                    console.log(e)
                  
                  }
                  



                  this.props.navigation.navigate('App');
           
                } else {
              return { cancelled: true };
            }
          } catch (e) {
            return { error: true };
          }


       

      }
    render() {
        return (
            <View style={styles.container}>
        {this.state.signedIn ? (
          <LoggedInPage name={this.state.name} photoUrl={this.state.photoUrl}   />
        ) : (
          <LoginPage signIn={this.signIn} />
        )}
      </View>
        );
    }
}
export default Login;

const LoginPage = props => {
    return (
      <View style={{alignItems:'center'}}>
        <Text style={{fontSize:40}}>Welcome</Text>
         <Image
                source={require("../../../assets/logo.png")}
                style={{ width: 300, height: 300 }}
              />
        <SocialIcon  onPress={
          ()=> {props.signIn()}
        }
  title='Sign In With Google'
  button
  style={{width:200}}
  type='google'
/>

        {/* <Text style={styles.header}>Sign In With Google</Text>
        <Button title="Sign in with Google" onPress={() => props.signIn()} /> */}
      </View>
    )
  }
const LoggedInPage = props => {
    return (
      <View style={styles.container}>
        
        <Text style={styles.header}>Welcome {props.name}</Text>
        <Image style={styles.image} source={{ uri: props.photoUrl }} />
     
        {/* <Image 
                         source={require('../../../assets/loading.gif')}  
                         style={{width: 100, height: 100 }
                        }
                     /> */}
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center"
    },
    header: {
      fontSize: 25
    },
    image: {
      marginTop: 15,
      width: 150,
      height: 150,
      borderColor: "rgba(0,0,0,0.2)",
      borderWidth: 3,
      borderRadius: 150
    }
  })