import React, { Component, useEffect, useContext, useState } from "react";
import { View, StyleSheet, AsyncStorage,TextInput,Dimensions } from "react-native";
import {
    Avatar,
    ListItem,
    Divider,
    Badge,
    Button,
    Text,
    Image,
    Overlay
} from "react-native-elements";

const { height, width } = Dimensions.get("window");

import MemeContext from "../context/MemeContext";
const { width: WIDTH } = Dimensions.get("window");

const Profile = ({ navigation }) => {
    const memeContext = useContext(MemeContext);
    const [visible, setVisible] = useState(false);

    const { loading, userMemes, GetUserMemes } = memeContext;
    const [ifFetching, SetifFetching] = useState(false)
    const [user_avatar, setUser_avatar] = useState("");
    const [user_email, setUser_email] = useState("");
    const [user_name, setUser_name] = useState("");
    const toggleOverlay = () => {
        setVisible(!visible);
      };
    async function getUserDetails() {
        const userAvatar = await AsyncStorage.getItem("userAvatar");
        setUser_avatar(userAvatar);

        const userName = await AsyncStorage.getItem("username");
        setUser_name(userName);

        const userEmail = await AsyncStorage.getItem("userToken");
        setUser_email(userEmail);
    }


    const onRefresh=()=>{
        SetifFetching(true);
        GetUserMemes();
        SetifFetching(false);
    }
    

    useEffect(() => {
        getUserDetails();

        GetUserMemes();
    }, []);

    const _signOutAsync = async () => {
        await AsyncStorage.clear();
        navigation.navigate("Auth");
    };

    const _joinUs = async()=>{
        
    }


    return (
        <View style={styles.container}>
             <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
             <View style={{height:200}}>

          <TextInput
            style={styles.input}
           placeholder={'Enter your Name'}
            placeholderTextColor={"lightgray"}
            underlineColorAndroid="transparent"
            onChangeText={name => joinUs_setName(name)}
          />
          <TextInput
            style={styles.input}
            placeholder={'Why you want to join us'}
            placeholderTextColor={"lightgray"}
            underlineColorAndroid="transparent"
            onChangeText={message => joinUs_setMessage(message)}
          />
           <Button
                title="Join us"
                buttonStyle={{ margin: 4, backgroundColor: "tomato" }}
                onPress={_joinUs}
            />
          </View>
      </Overlay>
            
            <Image
                source={require(".././assets/cr-3.png")}
                style={{ width: 100, height: 50, marginBottom: 0, marginTop: 20 }}
                resizeMode="contain"   
            />

         

            <Divider style={{ backgroundColor: "blue", height: 2 }} />

            <Badge
                badgeStyle={{ padding: 20, margin: 4, backgroundColor: "#00b894" }}
                value={<Text style={{ color: "white" }}>{user_name}</Text>}
            />

            <Badge
                badgeStyle={{ padding: 20, margin: 4, backgroundColor: "#00b894" }}
                value={<Text style={{ color: "white" }}>{user_email}</Text>}
            />

            <Button
                title="Sign out"
                buttonStyle={{ margin: 4, backgroundColor: "tomato" }}
                onPress={_signOutAsync}
            />

            <View
                style={{
                    width: "100%",
                    flexDirection: "row",
                    margin: 10,
                    justifyContent: "center"
                }}
            >
                <Button
                    title="Help"
                    buttonStyle={{ margin: 4, width: 120 }}
                    type="outline"
                />
                <Button
                    onPress={()=>{
                       toggleOverlay();

                    }}
                    buttonStyle={{ margin: 4, width: 120 }}
                    title="Join us"
                    type="outline"
                />
            </View>
            {/* <Text style={{marginTop:10}}>From</Text> */}
            <Text style={{ marginTop: 2, fontWeight: "bold" }}>MEMES CLAN</Text>






        </View>
    );
};
export default Profile;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
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
