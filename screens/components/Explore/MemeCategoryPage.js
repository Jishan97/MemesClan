import React, { Component,useContext,useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image
} from "react-native";
// import { Container, Header, Left,Button, Body, Right, Icon, Title,Card, CardItem,Content,Spinner  } from 'native-base';

import MemeContext from '../../../context/MemeContext'


const MemeCategoryPage=(props)=> {


    const memeContext = useContext(MemeContext);

    const {GetindianMemes,indianMemes, loading} = memeContext

    useEffect(()=>{
        GetindianMemes();

        // eslint-disable-next-line
        
       
 
    },[]);

    if(loading) {
        return   <Spinner />
    }

    
   return(

    //     indianMemes.map((one)=>{
    //         return(
    //             <ScrollView
    //             scrollEventThrottle={16}
    //         >
    //   <View style={{margin:10}}>
    //   <Card>
    //   <CardItem>
    //   <Left>
    //   {/* <Thumbnail source={{uri: 'Image URL'}} /> */}
    //   <Body>
    //   <Text>{one.meme_by}</Text>
    //   <Text note>{one.meme_title}</Text>
    //   </Body>
    //   </Left>
    //   </CardItem>
    //   <CardItem cardBody>
    //   <Image source={{uri:one.meme_image}} style={{height: 200, width: null, flex: 1}}/>
    //   </CardItem> 
      
    //   <CardItem>
    //       <Text>{one.meme_description}</Text>
    //   </CardItem>
      
      
      
    //   <CardItem>
    //   <Left>
    //   <Button transparent>
    //   <Icon active name="thumbs-up" />
    //   <Text>{one.meme_type}</Text>
    //   </Button>
    //   </Left>
    //   <Body>
    //   {/* <Button transparent>
    //   <Icon active name="chatbubbles" />
    //   <Text>4 Comments</Text>
    //   </Button> */}
    //   </Body>
    //   <Right>
    //   <Text>{one.meme_createdAt}</Text>
    //   </Right>
    //   </CardItem>
    //   </Card>
      
    //   </View>
    //   </ScrollView>
    //         )
    //     })
      
    <View></View>

      
      
        
   )  
    
}


export default MemeCategoryPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});