import React, { Component,useEffect,useContext, useState,useRef } from "react";
import {
    FlatList,
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar,
    ScrollView,
    
    Dimensions,
    Animated,
    TouchableOpacity,
    ActivityIndicator,
     Vibration
} from "react-native";
import {
    AdMobBanner,AdMobInterstitial
  } from 'expo-ads-admob';
  import { Notifications } from 'expo';

import ExploreEachPost from './components/Explore/ExploreEachPost'
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system'; 
import {Card,Button,Icon,Badge,Tile, Overlay ,Image,Avatar  } from 'react-native-elements'
//@refresh reset 
// import Icon from 'react-native-vector-icons/Ionicons'
import MemeCategory from './components/Explore/MemeCategory'
import Home from './components/Explore/Home'
import MemeContext from '../context/MemeContext'

import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { useIsFocused } from '@react-navigation/native';




import Tag from './components/Explore/Tag'
const { height, width } = Dimensions.get('window')




//@refresh reset 
const Explore = React.memo( ({navigation})=>  {
    const [visible, setVisible] = useState(false);
    const [modalValue, setmodalValue]= useState('');
    const [expoPushToken, setexpoPushToken]= useState('');
    const [notification, setnotification]= useState({});
    const [mobile, setmobile]= useState(null);



    const toggleOverlay = () => {
        setVisible(!visible);
      };

const [ifFetching, SetifFetching] = useState(false)

const memeContext = useContext(MemeContext);

const {getAllMemes,allMemes, loading,GetAllUsers,allUsers } = memeContext



const onRefresh=()=>{
    SetifFetching(true);
    getAllMemes();
    GetAllUsers();
    SetifFetching(false);
}


const registerForPushNotificationsAsync = async () => {
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync();
    /// post expo id to node js

  //POST request to send expo client id for push notification
                  

  fetch('https://quiet-journey-66288.herokuapp.com/expoPush', {
    method: 'POST', // or 'PUT'
    headers: {
      'Accept': 'application/json',
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      expoID:token
    }), 
    })
  
    setexpoPushToken(token)
    // this.setState({ expoPushToken: token });
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.createChannelAndroidAsync('default', {
      name: 'default',
      sound: true,
      priority: 'max',
      vibrate: [0, 250, 250, 250],
    });
  }
};


const  _handleNotification = noti => {
  Vibration.vibrate();
  setnotification(noti)
  // this.setState({ notification: notification });
};

             
                  useEffect(()=>{

                    getAllMemes();
                    GetAllUsers();
   
                    const navFocusListener = navigation.addListener('didFocus', () => {
                         
                        getAllMemes();
                        GetAllUsers();
                       
                    });
                    
                    registerForPushNotificationsAsync();
                  Notifications.addListener(_handleNotification);

                    return () => {
                        navFocusListener.remove();
                      };

                },[]);
                

                
                
                // navigation.addListener('didFocus', () => {
                //     getAllMemes(); 
                //     });





let openShareDialogAsync = async (meme_image) => {

    if (!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }
    const downloadPath = FileSystem.cacheDirectory + 'fileName.jpg';
    const { uri: localUrl } = await FileSystem.downloadAsync(meme_image, downloadPath);
    await Sharing.shareAsync(localUrl);
  };

    function Item({meme_image,meme_createdAt,meme_title,meme_type,meme_by, meme_description,meme_trend}) {
        return (
      
        <View style={{alignContent:'center',width:width-16,backgroundColor:'white',justifyContent:'space-between',alignSelf:'center',margin:5,borderColor:'grey',borderWidth:0.2,display:'flex'}}>
            <View style={{justifyContent:'flex-start',padding:10,flexDirection:'row',backgroundColor:'',borderBottomColor:'black'}}>
    
     <Text style={{display:'flex',alignSelf:'center'}}>{meme_title}</Text>
     </View>
     <View style={{alignItems:'center'}}>
     
<Image
  source={{ uri: meme_image }}
  style={{ width: width - 50, height:width - 100 }}
  containerStyle={{resizeMode:'contain'}}
  resizeMode='contain'
//   PlaceholderContent={<ActivityIndicator />}
PlaceholderContent={<Image 
    source={require('../assets/loading.gif')}  
    style={{width: 100, height: 100 }}
    
/>}
/>
       </View>


            <View style={{padding:10}}>
                <Text>{meme_description}</Text>
                <Text>#{meme_type}</Text>
                <Text>#{meme_trend}</Text>
                
            </View>

       <View style={{justifyContent:'center',width:'100%',flexDirection:'row',backgroundColor:'',marginBottom:10}}>
       <Button style={{alignSelf:'center'}} buttonStyle={{width:'100%'}} 
    //    onPress={()=> {toggleOverlay()
    //     setmodalValue(meme_image)            
    // }}
    onPress={()=>openShareDialogAsync(meme_image)}
        title="Share" />
        
     </View>
     
            </View>
        );
      }

        return (
            
            <SafeAreaView style={{ flex: 1 }}>
          
                <View style={{ flex: 1 }}>


                <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                  <Text>New Event on the way</Text>
                <Image
  source={{ uri: modalValue }}
  style={{ width: width-40, height: height-480 }}
resizeMode='contain'
PlaceholderContent={<Image 
    source={require('../assets/loading.gif')}  
    style={{width: 100, height: 100 }}
    
/>}
/>
      </Overlay>
                        {/* <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>

                        <Button style={{width:'40%',margin:2,justifyContent:'center'}} primary><Text> Primary </Text></Button>
                        <Button style={{width:'40%',margin:2,justifyContent:'center'}} primary><Text> Primary </Text></Button>
                        
                        </View> */}
                      




                        {/* { loading &&
                         <Spinner />
    } */}




     <FlatList  ListHeaderComponent={
                 
                <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 5 }}>

                   <AdMobBanner
              style={styles.bottomBanner}
              bannerSize="smartBannerPortrait"
              adUnitID="ca-app-pub-3940256099942544/6300978111"
              // Test ID, Replace with your-admob-unit-id
              testDeviceID="EMULATOR"
            />

       
                                        <View style={{width:'100%' ,flexDirection:'row',margin:5}}>
                                        {loading &&
                        //  <Text>Hold tight! Memes are comming</Text>
                        <View style={{justifyContent:'center',alignContent:'center',alignSelf:'center'}}> 
                         
                         
                         <Image 
                         source={require('../assets/loading.gif')}  
                         style={{width: 30, height: 30 }
                        }
                     />
                     
                     
                     </View>
                     
                         }
                                       {/* <Badge onPress={()=>   navigation.navigate('IndianMemes')} badgeStyle={{padding:15,margin:4,backgroundColor:'#00b894'}} value={<Text style={{color:'white'}}>Indian</Text>} />
                                       <Badge onPress={()=>   navigation.navigate('DankMemes')} badgeStyle={{padding:15,margin:4,backgroundColor:'#00b894'}} value={<Text style={{color:'white'}}>Dank</Text>} />
                                       <Badge onPress={()=>   navigation.navigate('FunnyMemes')} badgeStyle={{padding:15,margin:4,backgroundColor:'#00b894'}} value={<Text style={{color:'white'}}>Funny</Text>} />
                                       <Badge onPress={()=>   navigation.navigate('AdultMemes')} badgeStyle={{padding:15,margin:4,backgroundColor:'#00b894'}} value={<Text style={{color:'white'}}>Adult </Text>} /> */}
                                       </View>
                            <View style={{ marginTop: 5, paddingHorizontal: 20 }}>
                            {/* <Text style={{ fontSize: 24, fontWeight: '700' }}>
                                    Introducing Memes Clan
                                </Text>
                                <Text style={{ fontWeight: '100', marginTop: 2 }}>
                                    A platfrom where memers are appriciated and awared

                                </Text> */}
                            <Text style={{ fontSize: 24, fontWeight: '700' }}>
                                    Meme Star on rise
                                </Text>
                                <View style={{width:width-'30',display:'flex',flexDirection:'row'}}>
                               

                                {
                                  allUsers.map((one)=>{
                                        if(one.user_tag === 'memeStar') {
                                            return (
                                                
                                                <View key={one.id} style={{display:'flex',justifyContent:'center',alignContent:'center',alignItems:'center'}}> 
                                               
                                            <Avatar
                                            onPress={()=> navigation.navigate('UserMemes',{
                                                email:one.email,
                                                userAvatar:one.user_avatar,
                                                username:one.username
                                            })}
                                            size="large"
                                            rounded
                                            containerStyle={{margin: 5}}
                                            source={{
                                              uri:one.user_avatar
                                            }}
                                          />
                                          <Text>{one.username}</Text>
                                          </View>
                                          )
                                        }
                                    })
                                }

                                </View>
                           
                          
{/*                                 
                                <View style={{ width: width - 40, height: 200, marginTop: 20,justifyContent:'space-evenly',flexDirection:'row' }}>
                                    <Image
                                        style={{height: 150, width: 150, resizeMode: 'cover', borderRadius: 5, borderWidth: 1, borderColor: '#dddddd' }}
                                        source={require('../assets/home.jpg')}
                                        PlaceholderContent={<ActivityIndicator />}
                                    />
                                      <Image
                                        style={{height: 150, width: 150, resizeMode: 'cover', borderRadius: 5, borderWidth: 1, borderColor: '#dddddd' }}
                                        source={require('../assets/home.jpg')}
                                        PlaceholderContent={<ActivityIndicator />}
                                    />

                                </View > */}
 
                            </View>
                            <Text style={{ fontSize: 20, fontWeight: '700', paddingTop: 0,paddingHorizontal:20 }}>
                              Don't miss this
                            </Text>

                      
                        </View>}
        data={allMemes}
        renderItem={({ item }) => <ExploreEachPost meme_image={item.meme_image} meme_title={item.meme_title}
                                        meme_createdAt={item.meme_createdAt}  meme_description={item.meme_description}
                                        meme_by={item.meme_by} meme_trend={item.meme_trend} meme_type={item.meme_type}
                                        meme_by_avatar={item.meme_by_avatar} meme_by={item.meme_by} navigation={navigation}
                                        meme_by_username={item.meme_by_username}
            
        />}
        // columnWrapperStyle={{justifyContent:'center'}}
        // numColumns={2}
        onRefresh={onRefresh}
          refreshing={ifFetching}
        keyExtractor={item => item._id}
      />







                     

                </View>
            </SafeAreaView>
        );
    
})
export default   Explore;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});