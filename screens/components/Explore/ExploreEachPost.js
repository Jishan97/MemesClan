import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  ActivityIndicator,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import { Image, Button, Overlay, Avatar } from "react-native-elements";
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system'; 
const { height, width } = Dimensions.get("window");


let openShareDialogAsync = async (meme_image) => {

    if (!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }
    const downloadPath = FileSystem.cacheDirectory + 'fileName.jpg';
    const { uri: localUrl } = await FileSystem.downloadAsync(meme_image, downloadPath);
    await Sharing.shareAsync(localUrl);
  };


const ExploreEachPost = React.memo(({meme_image,meme_title,meme_trend,meme_type,meme_description,meme_by_avatar,navigation,meme_by,
                                        meme_by_username})=>{
    return (
      
        <View style={{alignContent:'center',width:width-5,backgroundColor:'white',justifyContent:'space-between',alignSelf:'center',margin:5,borderColor:'grey',display:'flex'}}>
            <View style={{padding:10,backgroundColor:'',borderBottomColor:'black',
                    alignItems:'flex-start',zIndex:2,display:'flex',flexDirection:'row',alignContent:'center'}}>
    
     {/* <Text style={{display:'flex',alignSelf:'center'}}>{meme_title}</Text> */}
     <Avatar
      onPress={()=> navigation.navigate('UserMemes',{
        email:meme_by,
        userAvatar:meme_by_avatar,
        username:meme_by_username
    })}
                size='medium'
                rounded
                source={{
                    uri: meme_by_avatar
                }}
                containerStyle={{ marginTop: 0,elevation:1 }}
            />
            <Text style={{alignSelf:'center',marginLeft:5,fontWeight:'bold'}} 
              onPress={()=> navigation.navigate('UserMemes',{
                email:meme_by,
                userAvatar:meme_by_avatar,
                username:meme_by_username
            })}
            >{meme_by_username}</Text>
     </View>
     <View style={{alignItems:'center'}}>
     
<Image
  source={{ uri: meme_image }}
  style={{ width: width - 5, height:width -5}}
  containerStyle={{resizeMode:'contain'}}
  resizeMode='contain'
//   PlaceholderContent={<ActivityIndicator />}

/>
       </View>


            <View style={{padding:10}}>
                <Text>{meme_description}</Text>
                <Text>{meme_type}</Text>
                <Text>{meme_trend}</Text>
                
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
});

export default ExploreEachPost;