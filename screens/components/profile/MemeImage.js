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
import { Image, Button, Overlay } from "react-native-elements";

const { height, width } = Dimensions.get("window");

const memeImage = React.memo(({meme_image})=>{
    return(
        <View
        style={{
          alignContent: "center",
          width: "30%",
          backgroundColor: "white",
          justifyContent: "space-between",
          alignSelf: "center",
          margin: 2,
          display: "flex"
        }}
      >

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
          
          >
            <Image
              source={{ uri: meme_image }}
              style={{
                width: width * 0.3,
                aspectRatio: 1,
                borderColor: "grey",
                borderWidth: 0.2
              }}
              containerStyle={{ resizeMode: "contain" }}
              resizeMode="contain"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    )
});

export default memeImage;