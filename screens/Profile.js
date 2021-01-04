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
import MemeContext from "../context/MemeContext";
import MemeImage from './components/profile/MemeImage'

const { height, width } = Dimensions.get("window");


const Inbox = React.memo(
({navigation}) => {
  const memeContext = useContext(MemeContext);
  const [user_avatar, setUser_avatar] = useState("");
  const [user_email, setUser_email] = useState("");
  const [user_name, setUser_name] = useState("");

  const [visible, setVisible] = useState(false);
  const [modalValue, setmodalValue] = useState("");
  const [ifFetching, SetifFetching] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const onRefresh = () => {
    SetifFetching(true);
    GetUserMemes();
    SetifFetching(false);
  };


  const { userMemes, GetUserMemes, loading } = memeContext;
  async function getUserDetails() {
    const userAvatar = await AsyncStorage.getItem("userAvatar");
    setUser_avatar(userAvatar);

    const userName = await AsyncStorage.getItem("username");
    setUser_name(userName);

    const userEmail = await AsyncStorage.getItem("userToken");
    setUser_email(userEmail);
  }


  useEffect(() => {
    getUserDetails();
    GetUserMemes();
    const navFocusListener = navigation.addListener('didFocus', () => {
                        
      // getUserDetails();
      GetUserMemes();
     
  });
  return () => {
    navFocusListener.remove();
  };
  }, []);

 


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
            onPress={() => {
              toggleOverlay();
              setmodalValue(meme_image);
            }}
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
    );
  }

  return (
    <View>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Image
          source={{ uri: modalValue }}
          style={{ width: width - 40, height: height - 80 }}
          resizeMode="contain"
          PlaceholderContent={<ActivityIndicator />}
        />
      </Overlay>
      <FlatList
        ListHeaderComponent={
          <View>
            {/* {loading && (
              <View
                style={{
                  justifyContent: "center",
                  alignContent: "center",
                  alignSelf: "center"
                }}
              >
                <Image
                  source={require("../assets/loading.gif")}
                  style={{ width: 100, height: 100 }}
                />
                <Text>Hold on!</Text>
              </View>
            )} */}

            <View style={styles.container}>
              <Image
                source={require(".././assets/badge-3.png")}
                style={{ width: 150, height: 150 }}
              />
              <View style={{ flexDirection: "row", margin: 4 }}>
                <View
                  style={{
                    width: "40%",
                    alignItems: "center",
                    backgroundColor: "#00b894",
                    margin: 2
                  }}
                >
                  <Text style={{ fontSize: 16, color: "white" }}>Upload</Text>
                  <Text style={{ fontSize: 16, color: "white" }}>
                    {userMemes.length}
                  </Text>
                </View>

                <View
                  style={{
                    width: "40%",
                    alignItems: "center",
                    backgroundColor: "#00b894",
                    margin: 2
                  }}
                >
                  <Text style={{ fontSize: 16, color: "white" }}>Badge</Text>
                  <Text style={{ fontSize: 16, color: "white" }}>
                    Meme Star
                  </Text>
                </View>
              </View>
            </View>
          </View>
        }
        data={userMemes}
        renderItem={({ item }) => (
          <MemeImage
            meme_image={item.meme_image}
            meme_title={item.meme_title}
            meme_createdAt={item.meme_createdAt}
            meme_description={item.meme_description}
            meme_by={item.meme_by}
          />
        )}
        columnWrapperStyle={{ justifyContent: "center" }}
        numColumns={3}
        maxToRenderPerBatch={4}
        onRefresh={onRefresh}
        refreshing={ifFetching}
        keyExtractor={item => item._id}
      />
    </View>
  );

});

export default Inbox;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
