import React, { Component, useEffect, useContext, useState } from "react";
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
  ActivityIndicator
} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import MemeContext from "../context/MemeContext";
import { AntDesign, MaterialIcons, Entypo, FontAwesome } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system'; 
import EachTrendingPost from './components/trending/EachTrendingPost'

const { height, width } = Dimensions.get("window");

import {
  Card,
  Button,
  Icon,
  Badge,
  Tile,
  Overlay,
  Image
} from "react-native-elements";
import {
  AdMobBanner,AdMobInterstitial
} from 'expo-ads-admob';

const Trending = () => {
  const [visible, setVisible] = useState(false);
  const [modalValue, setmodalValue] = useState("");
  const memesOftheDay = [];

  const toggleOverlay = () => {
    setVisible(!visible);
  };

const setmodalValueImage =(image)=>{
  setmodalValue(image);
}
  const [ifFetching, SetifFetching] = useState(false);
  const memeContext = useContext(MemeContext);
  const { width: WIDTH } = Dimensions.get("window");

  const {
    trendMemeArray,
    GetTrendMemeArray,
    GetTrendSingle,
    trendMemeSingle,
    loading
  } = memeContext;

  useEffect(() => {
    GetTrendMemeArray();
    GetTrendSingle();
  }, []);

  const onRefresh = () => {
    SetifFetching(true);
    GetTrendMemeArray();
    GetTrendSingle();
    SetifFetching(false);
  };

  trendMemeSingle.map(one => {
    memesOftheDay.push(one.meme_image);
  });

  let openShareDialogAsync = async (meme_image) => {

    if (!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }
    const downloadPath = FileSystem.cacheDirectory + 'fileName.jpg';
    const { uri: localUrl } = await FileSystem.downloadAsync(meme_image, downloadPath);
    await Sharing.shareAsync(localUrl);
  };



  function Item({
    meme_image,
    meme_createdAt,
    meme_title,
    meme_type,
    meme_by,
    meme_description
  }) {
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
            PlaceholderContent={
              <Image
                source={require("../assets/loading.gif")}
                style={{ width: 100, height: 100 }}
              />
            }
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
            buttonStyle={{ width: width/6 }}
            onPress={() => {
              toggleOverlay();
              setmodalValue(meme_image);
            }}
            title="View"
          />

          
<Button
 buttonStyle={{ width: width/6 }}
  icon={
    <FontAwesome name="share-alt-square" style={{paddingRight:5}} size={20} color="white"/>      
  }
  onPress={()=>openShareDialogAsync(meme_image)}
  title="share"
/>
          
  </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
         <AdMobBanner
              style={styles.bottomBanner}
              bannerSize="smartBannerPortrait"
              adUnitID="ca-app-pub-3940256099942544/6300978111"
              // Test ID, Replace with your-admob-unit-id
              testDeviceID="EMULATOR"
            />
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{backgroundColor:'none'}}>
        <Image
          source={{ uri: modalValue }}
          style={{ width: width - 40, height: height - 80 }}
          resizeMode="contain"
          PlaceholderContent={<ActivityIndicator />}
        />
      </Overlay>
      <FlatList
        ListHeaderComponent={
          <View style={{ flex: 1, backgroundColor: "white", paddingTop: 5 }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
                alignSelf: "center"
              }}
            >
              {loading && (
                <View
                  style={{
                    justifyContent: "center",
                    alignContent: "center",
                    alignSelf: "center"
                  }}
                >
                  <Image
                    source={require("../assets/loading.gif")}
                    style={{ width: 30, height: 30 }}
                  />
                </View>
              )}
              {/* <Text style={{ fontSize: 24, fontWeight: "700" }}> */}
                {/* Trending */}
              {/* </Text> */}
            </View>

            <View style={{ marginTop: 5, paddingHorizontal: 20 }}>
              <Text style={{ fontWeight: 'bold', marginTop: 5 }}>
                Meme of the day
              </Text>

              <View
                horizontal={true}
                style={{
                  height: 350,
                  marginTop: 5,
                  justifyContent: "space-evenly",
                  flexDirection: "row"
                }}
              >
                <Image
                                style={{ height:undefined,aspectRatio: 4 / 3, width: '100%', resizeMode: 'contain', borderColor: '#dddddd' }}
                                source={{uri:memesOftheDay[0]}}
                                PlaceholderContent={<ActivityIndicator />}
                            />

                {/* <SliderBox
                  images={memesOftheDay}
                  sliderBoxHeight={350}
                  onCurrentImagePressed={(index) => {
                    toggleOverlay();
                    // setmodalValue(memesOftheDay[index]);
                    setmodalValueImage(memesOftheDay[index]);
                    
                  }}
                  style={{justifyContent:'center', width: width -20, height: height - 40, alignContent:'center', alignSelf:'center' }}
                  autoplay
                  dotColor="#00b894"
                  imageLoadingColor="#2196F3"
                  ImageComponentStyle={{ margin: 10 }}
                  //  resizeMode={'contain'}
                /> */}
              </View>
            </View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                paddingTop: 0,
                paddingHorizontal: 20
              }}
            >
              Don't miss this
            </Text>
          </View>
        }
        data={trendMemeArray}
        renderItem={({ item }) => (
          <EachTrendingPost
            toggleOverlay={toggleOverlay}
            setmodalValueImage={setmodalValueImage}
            meme_image={item.meme_image}
            meme_title={item.meme_title}
            meme_createdAt={item.meme_createdAt}
            meme_description={item.meme_description}
            meme_by={item.meme_by}
          />
        )}
        columnWrapperStyle={{ justifyContent: "center" }}
        numColumns={2}
        onRefresh={onRefresh}
        refreshing={ifFetching}
        keyExtractor={item => item._id}
        ListFooterComponent={
      <Text style={{height:100,alignItems:'center',alignSelf:'center'}}>"Lagta he iss app me aur memes ane wale he"</Text> 
        }
      />
    </View>
  );
};
export default Trending;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
    bottomBanner: {
    position: "absolute",
    zIndex:200,
    height:40,
    bottom: 0,
    
  }
});
