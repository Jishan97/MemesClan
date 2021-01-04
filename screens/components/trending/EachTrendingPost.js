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
import { AntDesign, MaterialIcons, Entypo, FontAwesome } from '@expo/vector-icons';

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




const EachTrendingPost = React.memo(({meme_image,meme_title,meme_trend,meme_type,meme_description,meme_by_avatar,toggleOverlay,
    setmodalValueImage})=>{
    return (
        <View
          style={{
            alignContent: "center",
            width: width - 220,
            backgroundColor: "white",
            justifyContent: "space-between",
            alignSelf: "center",
            margin: 5,
            borderColor: "grey",
            borderWidth: 0.2,
            display: "flex"
          }}
        >
          <View
            style={{
              justifyContent: "center",
              flexDirection: "row",
              backgroundColor: "",
              height: 20,
              // borderBottomWidth: 0.2,
              borderBottomColor: "black"
            }}
          >
            <Text style={{ display: "flex", alignSelf: "center" }}>
              {/* {meme_title} */}
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Image
              source={{ uri: meme_image }}
              style={{ width: width * 0.4, aspectRatio: 1 }}
              containerStyle={{ resizeMode: "contain" }}
              resizeMode="contain"
              placeholderStyle={{ height: 100, alignSelf: "center" }}

              resizeMode="contain"
            />
          </View>
  
          {/* <View style={{ padding: 10 }}>
            <Text>{meme_description}</Text>
            <Text>{meme_type}</Text>
          </View> */}
  
          <View
            style={{
              justifyContent: 'space-evenly',
              // width: "100%",
              flexDirection: "row",
              backgroundColor: "",
              marginBottom: 10,
              marginTop:10
            }}
          >
            
            <Button
              style={{ alignSelf: "center" }}
              buttonStyle={{ width: width/5.2,padding:5 }}
              onPress={() => {
                toggleOverlay();
                setmodalValueImage(meme_image);
              }}
              title="View"
            />
  
            
  <Button
   buttonStyle={{ width: width/5.2,padding:5 }}
    icon={
      <FontAwesome name="share-alt-square" style={{paddingRight:5}} size={20} color="white"/>      
    }
    onPress={()=>openShareDialogAsync(meme_image)}
    title="share"
  />
            
    </View>
        </View>
      );
});

export default EachTrendingPost;