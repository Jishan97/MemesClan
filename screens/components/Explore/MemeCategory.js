import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";
// import { Container, Header, Content, Thumbnail } from 'native-base';
class MemeCategory extends Component {


    render() {
        return (
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate('MemeCategoryPage')}
            >
                <View style={{ flex: 2,paddingLeft: 10 }}>
                    <Thumbnail  large  source={this.props.imageUri}
                        style={{paddingLeft: 10}}
                    />
                </View>
                
                <View style={{ flex: 1,alignContent:'center',alignSelf:'center' }}>
                    <Text>{this.props.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
export default MemeCategory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});