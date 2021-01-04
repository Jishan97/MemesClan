import React, { Component,useContext,useEffect } from "react";
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
// import { Container, Header, Left,Button, Body, Right, Icon, Title,Card, CardItem,Content,Spinner  } from 'native-base';
import {Card,Button,Icon,Badge,Tile, Overlay ,Image } from 'react-native-elements'
import MemeContext from '../../../context/MemeContext'

const { height, width } = Dimensions.get('window')

const MemeCategoryPage=(props)=> {


    const memeContext = useContext(MemeContext);

    const {GetfunnyMemes,funnyMemes, loading} = memeContext

    useEffect(()=>{
        GetfunnyMemes();
    
        // console.log('from EXPLORE', allMemes)
        // console.log(products)
        // eslint-disable-next-line
        
       
 
    },[]);
    function Item({meme_image,meme_createdAt,meme_title,meme_type,meme_by, meme_description}) {
        return (
        
        
        
        <View style={{alignContent:'center',width:width-16,backgroundColor:'white',justifyContent:'space-between',alignSelf:'center',margin:5,borderColor:'grey',borderWidth:0.2,borderStyle:'dotted',display:'flex'}}>
            <View style={{justifyContent:'center',flexDirection:'row',backgroundColor:'',height:50,borderBottomWidth: 0.2,borderBottomColor:'black'}}>
     <Text style={{display:'flex',alignSelf:'center'}}>Hello</Text>
     </View>
     <View style={{alignItems:'center'}}>
     
<Image
  source={{ uri: meme_image }}
  style={{ width: 300, height: 300 }}
  containerStyle={{resizeMode:'contain'}}
  resizeMode='contain'
  PlaceholderContent={<ActivityIndicator />}
/>
       </View>


            <View style={{padding:10}}>
                <Text>loading loadingloadingloadingloadingloading  loading loading</Text>
                <Text>{meme_type}</Text>
            </View>

       <View style={{justifyContent:'center',width:'100%',flexDirection:'row',backgroundColor:'',marginBottom:10}}>
       <Button style={{alignSelf:'center'}} buttonStyle={{width:'100%'}} 
    //    onPress={()=> {toggleOverlay()
    //     setmodalValue(meme_image)            
    // }}
        title="Share" />
        
     </View>
     
            </View>
        );
      }

    // if(loading) {
    //     return   <Spinner />
    // }

    
   return(
<View>
        {/* {loading && <Spinner/>} */}
        
     <FlatList
     data={funnyMemes}
     renderItem={({ item }) => <Item meme_image={item.meme_image} meme_title={item.meme_title}
     meme_createdAt={item.meme_createdAt}  meme_description={item.meme_description}
     meme_by={item.meme_by}
     />}
     keyExtractor={item => item._id}
   />

</View>
      
        
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