import React, {useEffect,useContext, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    FlatList,
    ActivityIndicator,
    AsyncStorage
  } from "react-native";
  import { Image, Button,Avatar } from "react-native-elements";
  const { height, width } = Dimensions.get("window");

import MemeContext from '../context/MemeContext'


 const UserMemes = ({navigation}) => {
    const memeContext = useContext(MemeContext);
    const {GetSingleUser,loading,singleUser } = memeContext
    const email = navigation.getParam('email')
    const userAvatar = navigation.getParam('userAvatar')
    const username = navigation.getParam('username')
    useEffect(()=>{
        GetSingleUser(email);
    },[]);
    const [ifFetching, SetifFetching] = useState(false);

    const onRefresh = () => {
      SetifFetching(true);
      GetSingleUser(email);
      SetifFetching(false);
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
              width: "30%",
              backgroundColor: "white",
              justifyContent: "space-between",
              alignSelf: "center",
              margin: 4,
              //   borderColor: "grey",
              //   borderWidth: 0.2,
              //   borderStyle: "dotted",
              display: "flex"
            }}
          >
            {/* <View
              style={{
                justifyContent: "center",
                flexDirection: "row",
                backgroundColor: "",
                height: 50,
                borderBottomWidth: 0.2,
                borderBottomColor: "black"
              }}
            >
              <Text style={{ display: "flex", alignSelf: "center" }}>
                {meme_title}
              </Text>
            </View> */}
            <View style={{ alignItems: "center" }}>
              <Image
                source={{ uri: meme_image }}
                style={{
                  width: width * 0.3,
                  aspectRatio: 1,
                  borderColor: "grey",
                  borderWidth: 0.2,
                  borderStyle: "dotted"
                }}
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
    
            {/* <View
              style={{
                justifyContent: "center",
                width: "100%",
                flexDirection: "row",
                backgroundColor: "",
                marginBottom: 10
              }}
            >
              <Button
                style={{ alignSelf: "center" }}
                buttonStyle={{ width: "100%" }}
                onPress={() => {
                  toggleOverlay();
                  setmodalValue(meme_image);
                }}
                title="View"
              />
            </View> */}
          </View>
        );
      }
    
    return (
     <View style={styles.container}>
           <FlatList
      ListHeaderComponent={

        <View>

            {/* <View style={{margin:5}}>
            <Text style={{fontSize:16}}>Hello {user_name} </Text>
            </View>
             */}
       {loading &&
                        //  <Text>Hold tight! Memes are comming</Text>
                        <View style={{justifyContent:'center',alignContent:'center',alignSelf:'center'}}> 
                         
                         
                         <Image 
                         source={require('../assets/loading.gif')}  
                         style={{width: 100, height: 100 }
                        }
                     />
                     <Text>
                        Hold on!
                     </Text>
                     </View>
                         }


        <View style={styles.container}>
         
          <Avatar
           size="large"
           rounded
            source={{uri:userAvatar}}
            style={{ width: 150, height: 150 }}
          />
          <Text style={{fontSize:20}}>Memes by: {username}</Text>
          <View style={{ flexDirection: "row",margin:4 }}>

            <View
              style={{
                width: "40%",
                alignItems: "center",
                backgroundColor: "#00b894",
                margin: 2
              }}
            >
              <Text style={{ fontSize: 16,color:'white' }}>Upload</Text>
              <Text style={{ fontSize: 16,color:'white' }}>{singleUser.length}</Text>
            
            </View>


         
          <View
            style={{
              width: "40%",
              alignItems: "center",
              backgroundColor: '#00b894',
              margin: 2
            }}
          >
            <Text style={{ fontSize: 16,color:'white' }}>Badge</Text>
            <Text style={{ fontSize: 16,color:'white' }}>Meme Star</Text>
          </View>
          </View>

          </View>

        </View>
      }
      data={singleUser}
      renderItem={({ item }) => (
        <Item
          meme_image={item.meme_image}
          meme_title={item.meme_title}
          meme_createdAt={item.meme_createdAt}
          meme_description={item.meme_description}
          meme_by={item.meme_by}
        />
      )}
      columnWrapperStyle={{ justifyContent: "center" }}
      numColumns={3}
      onRefresh={onRefresh}
      refreshing={ifFetching}
      keyExtractor={item => item._id}
    />
     </View>
    )
}

export default UserMemes;


const styles = StyleSheet.create({
    container: {
        marginTop:10,
    //   flex: 1,
      alignItems: "center",
      justifyContent: "center"
    }
  });
  