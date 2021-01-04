import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  ScrollView,
  AsyncStorage,
  Alert
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import axios from "axios";
import MemeContext from "../context/MemeContext";
import { Picker } from "@react-native-community/picker";

import { Button, Text, Header, Badge } from "react-native-elements";
import { func } from "prop-types";

const { width: WIDTH } = Dimensions.get("window");
const { height: HEIGHT } = Dimensions.get("window");



const Trips = ({ navigation }) => {
  const [placeholderMemeTitle, setPlaceholderMemeTitle] = useState(
    "Meme title"
  );
  const [placeholderMemeDescription, setPlaceholderMemeDescription] = useState(
    "Meme description"
  );
  const [image, setImage] = useState(null);
  const [showBox, setShowBox] = useState(true);
  const [selectTag, setselectTag] = useState(undefined);
  const [selectTrend, setselectTrend] = useState(undefined);
  const [imageUploaded,setImageUploaded] = useState(false)
  const [whileImageUpload,setWhileImageUpload] = useState(true)
  
  const [showImageUploadButton, setShowImageUploadButton] = useState(true);
  const [pickMemeTitile, setpickMemeTitile] = useState(
    "Pick a meme from your gallery"
  );
  const [memeTitle, setMemeTitle] = useState("");
  const [memeDescription, setMemeDescription] = useState("");

  const memeContext = useContext(MemeContext);

  const { GetmemeTags,memesTrend,GetmemeTrend, memesTag, loading } = memeContext;
  useEffect(() => {
    getPermissionAsync();
    GetmemeTags();
    GetmemeTrend()
    

    //    const navFocusListener = navigation.addListener('didFocus', () => {

    //     GetmemeTags();

    // });

    // return () => {
    //   navFocusListener.remove();
    // };
  }, []);

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  const _pickImage = async () => {
    try {

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [8,10 ],
        quality: 1
      });

      setShowBox(true);
      setpickMemeTitile("Change meme");
      // setShowImageUploadButton(false);

      // this.setState({
      //   showBox:true,
      //   showImageUploadButton:false
      // })

      if (!result.cancelled) {
        setImage(result.uri);

        // this.setState({ image: result.uri });

        //  const data = new FormData();
        // let apiUrl = 'http://192.168.0.24:3000/imageUploadTrial';
      }
    } catch (E) {}
  };

  const uploadMeme = async () => {
    setShowBox(false)
    let uriParts = image.split(".");
    let fileType = uriParts[uriParts.length - 1];
    const userToken = await AsyncStorage.getItem("userToken");
    const userAvatar = await AsyncStorage.getItem("userAvatar");
    const username = await AsyncStorage.getItem("username");

    let formData = new FormData();

    formData.append("imageData", {
      uri: image,
      name: `photo.${fileType}`,
      title: memeTitle,
      description: memeDescription,
      type: `image/${fileType}`
    });
    formData.append("title", memeTitle);
    formData.append("description", memeDescription);
    formData.append("type", selectTag);
    formData.append("trend",selectTrend)
    formData.append("email", userToken);
    formData.append("userImage",userAvatar)
    formData.append("username",username)

    let options = {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
      }
    };
    // Alert.alert('Your meme will be uploaded soon')
  // const imageRes =  await axios.post("https://quiet-journey-66288.herokuapp.com/imageUploadTrial", formData);
  setImageUploaded(true)

   const imageRes =  await axios.post("https://quiet-journey-66288.herokuapp.com/imageUploadTrial", formData);

  // const imageRes =  await axios.post("http://192.168.0.24:3000/imageUploadTrial", formData);


    

    if(imageRes.data == 'success'){
      setImageUploaded(false)
      setShowBox(true)
    }

      navigation.navigate("Explore");
       setImage(null); 
        setpickMemeTitile("Pick a meme from your gallery");

  
   


    
      // let i=0;
      // while(i=0){
      //   console.log('nonono')    
      // {  <Image
      //   source={require("../assets/loading.gif")}
      //   style={{ width: 30, height: 30 }}
      // />}
    
      //                       if(imageRes.data === 'success'){
      //                         i=1
      //                         navigation.navigate("Explore");
      //                         setImage(null);
      //                         setpickMemeTitile("Pick a meme from your gallery");
      //                       }
      //                       else{
      //                         i=0
      //                       }
      // }


    
     

  

    // setShowImageUploadButton(false)
  };

  // }
  const onValueChange2 = value => {
    setSelected2(value);

    // this.setState({
    //   selected2: value
    // });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
    

      <View
        style={{ alignItems: "center", justifyContent: "center", margin: 10 }}
      >
    
        {
          imageUploaded && (
           <View style={{width:WIDTH,height:HEIGHT,backgroundColor:'white',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
            <Image
                    source={require("../assets/loading.gif")}
                    style={{ width: 100, height: 100 }}
                  />
                <Text>Lagta he meme upload hone wala he!</Text>

            </View>
          )
        }
        {/* {showImageUploadButton && <Button style={{margin:10}} title="Pick an image from camera roll" onPress={_pickImage} /> } */}
        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: WIDTH - 40,
              height: HEIGHT/2,
              margin: 5,
              borderWidth: 0.4,
              borderColor: "black"
            }}
          />
        )}
      </View>

      {showBox && (
        <View>
          <TextInput
            style={styles.input}
            placeholder={placeholderMemeTitle}
            placeholderTextColor={"black"}
            underlineColorAndroid="transparent"
            onChangeText={title => setMemeTitle(title)}
          />
          <TextInput
            style={styles.input}
            placeholder={placeholderMemeDescription}
            placeholderTextColor={"black"}
            underlineColorAndroid="transparent"
            onChangeText={description => setMemeDescription(description)}
          />

          <View
            style={{
              justifyContent: "center",
              alignContent: "center",
              alignSelf: "center",
              alignItems: "center"
            }}
          >
            <Text>Select tag for your meme</Text>
            <Picker
              style={{ backgroundColor: "lightblue" }}
              prompt="Select tag for your meme"
              itemStyle={{ color: "red" }}
              selectedValue={selectTag}
              style={{ height: 50, width: WIDTH - 90 }}
              onValueChange={(itemValue, itemIndex) => setselectTag(itemValue)}
            >
              {memesTag.map(eachMemeTag => (
                <Picker.Item
                  style={{ color: "lightblue" }}
                  itemStyle={{ color: "red" }}
                  key={eachMemeTag._id}
                  label={eachMemeTag.memeTitle}
                  value={eachMemeTag.memeTitle}
                />
              ))}
            </Picker>


            <View
            style={{
              justifyContent: "center",
              alignContent: "center",
              alignSelf: "center",
              alignItems: "center"
            }}
          >
             <Text>What the meme is about</Text>
            <Picker
              style={{ backgroundColor: "lightblue" }}
              prompt="Select tag for your meme"
              itemStyle={{ color: "red" }}
              selectedValue={selectTrend}
              style={{ height: 50, width: WIDTH - 90 }}
              onValueChange={(itemValue, itemIndex) => setselectTrend(itemValue)}
            >
              {memesTrend.map(eachMemeTrend => (
                <Picker.Item
                  style={{ color: "lightblue" }}
                  itemStyle={{ color: "red" }}
                  key={eachMemeTrend._id}
                  label={eachMemeTrend.memeTitle}
                  value={eachMemeTrend.memeTitle}
                />
              ))}
            </Picker>
          </View>
            






            {showImageUploadButton && (
              <Button
                buttonStyle={{
                  margin: 10,
                  width: WIDTH - 100,
                  backgroundColor: "#00b894"
                }}
                title={pickMemeTitile}
                onPress={_pickImage}
              />
            )}

              
            {image && (
              <Button
                buttonStyle={{
                  margin: 10,
                  width: WIDTH - 100,
                  backgroundColor: "#27ae60"
                }}
                title="Upload meme"
                onPress={uploadMeme}
              />
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    alignSelf: "center",
    width: WIDTH - 90,
    height: 45,
    // borderRadius: 10,
    fontSize: 16,
    paddingLeft: 15,
    backgroundColor: "white",
    // color:'#0A0A68',
    color: "black",
    borderColor: "#27ae60",
    borderWidth: 1,
    margin: 5
  }
});

export default Trips;
