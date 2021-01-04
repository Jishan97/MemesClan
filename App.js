import React from 'react';
import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings(['Warning: ReactNative.createElement']);

import { StyleSheet, Text, View, Image } from 'react-native';
import { createAppContainer, createSwitchNavigator  } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack';
// import Icon from 'react-native-vector-icons/Ionicons'
import { AntDesign, MaterialIcons, Entypo } from '@expo/vector-icons';
//@refresh reset 
import Explore from './screens/Explore'
import Trending from './screens/Trending'

import Profile from './screens/Profile'

import UploadMeme from './screens/UploadMeme'
import Setting from './screens/Setting'


import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Login from './screens/components/Authentication/Login'
import AuthLoadingScreen from './AuthLoadingScreen'
import MemeState from './context/MemeState'

import IndianMemes from './screens/components/memeCategory/IndianMemes'
import AdultMemes from './screens/components/memeCategory/AdultMemes'
import FunnyMemes from './screens/components/memeCategory/FunnyMemes'
import DankMemes from './screens/components/memeCategory/DankMemes'

import UserMemes from './screens/UserMemes'


import { enableScreens } from 'react-native-screens';


export default function App() {

  console.disableYellowBox = true; 
  enableScreens();
  return (
    
    <MemeState>
    <AppContainer />
    </MemeState>
  );
}



const MemeHomePage = createStackNavigator({
  Explore:{
    screen:Explore,
    navigationOptions:{
      header:null
    }
  },
  IndianMemes:{
    screen:IndianMemes,
    navigationOptions:{
      header:null
    }
  },
  AdultMemes:{
    screen:AdultMemes,
    navigationOptions:{
      header:null
    }
  },
  FunnyMemes:{
    screen:FunnyMemes,
    navigationOptions:{
      header:null
    }
  },
  DankMemes:{
    screen:DankMemes,
    navigationOptions:{
      header:null
    }
  },
  UserMemes:{
    screen:UserMemes,
    navigationOptions:{
      header:null
    }
  }
  
},{
  navigationOptions:{
    header:null
  }
});


  const TabNavigator = createMaterialTopTabNavigator({
    Explore: {
      screen: MemeHomePage,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <AntDesign name="home" size={24} color={tintColor} />     )
      }
    },
    Trending: {
      screen: Trending,
      navigationOptions: {
        tabBarLabel: 'Trending',
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcons name="trending-up" size={24}  color={tintColor} />
        )
      }
    },
    UploadMeme: {
      screen: UploadMeme,
      navigationOptions: {
        tabBarLabel: 'UPLOAD',
        tabBarIcon: ({ tintColor }) => (
          <AntDesign name="pluscircleo" size={24}  color={tintColor} />
        )
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: 'Notification',
        tabBarIcon: ({ tintColor }) => (
        //  <Image source={require('./assets/airbnb.png')} style={{ height: 24, width: 24, tintColor: tintColor }} />
        <Entypo name="notification" size={24}  color={tintColor} />
        )
      }
    },
    Setting: {
      screen: Setting,
      navigationOptions: {

        tabBarLabel: 'PROFILE',
        tabBarIcon: ({ tintColor }) => (
          <AntDesign name="profile" size={24}  color={tintColor} />
        ),
      }
    }
  }, {
      tabBarOptions: {
        indicatorStyle: { backgroundColor: "#00b894",height:2 },
        showIcon:true,
        pressColor:'#00b894',
        showLabel:false,
        labelStyle:{
          fontSize:8,
          borderBottomColor:'black'
        },
        tabStyle:{
         elevation:10
        },
    tabBarIcon:{
      tintColor:'blue'
    },
        activeTintColor: '#00b894',
        inactiveTintColor: 'grey',
        style: {
          backgroundColor: '#f1f2f6',
          borderTopWidth: 0,
          shadowOffset: { width: 5, height: 3 },
          shadowColor: 'black',
          shadowOpacity: 0.5,
          elevation: 5,
      
          
        }
      },
      
      tabBarPosition:'top',
    
      
  
  },{
    navigationOptions:{
      header:null
    }
  });



  const AppContainer =createAppContainer(
    createSwitchNavigator(
      {
        AuthLoading: AuthLoadingScreen,
        App: TabNavigator,
        Auth: Login,
      },
      {
        initialRouteName: 'AuthLoading',
      }
    )
  );



  // export default createAppContainer(TabNavigator);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});