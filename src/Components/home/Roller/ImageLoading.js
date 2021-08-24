import React, { Component } from "react";
import { View, Text, StatusBar, Image, TouchableOpacity, StyleSheet } from "react-native";
import FastImage from 'react-native-fast-image'
import AsyncImageAnimated from 'react-native-async-image-animated'
import Thumbnail from 'react-native-thumbnail-video';


const styles = {
    cardImageView: { height: 140, width: "180%", overflow: "hidden" },
}
export default class ImageLoadingComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageShowFlag: false,
            imageSrc: this.props.sourceProp

        }
    }
    _onLoad() {
        console.log('onload fired')
        // this.setState({
        //     imageShowFlag: true
        // })
    }
    componentWillReceiveProps(nextProps) {
        console.log('receiving props', nextProps.sourceProp)
        this.setState({
            imageSrc: nextProps.sourceProp

        })
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.sourceProp !== this.state.imageSrc) {
            return true;
        }
        else {
            return false;
        }
    }

    render() {
        sourceObj = { uri: this.props.sourceProp }
        console.log(sourceObj, 'rendered sourceProp', this.props.sourceProp)
        return (
            // <View>
            //     {

            //         (this.state.imageShowFlag === false) ?
            //             <View style={styles.cardImageView} ></View> :
            //             <Image style={this.props.styleProp} source={{ uri: this.props.sourceProp }} onLoad={this._onLoad.bind(this)} />
            //     }
            // </View>
            // <View>
            // <View style={this.props.styleProp}>
            //     <AsyncImageAnimated
            //         source={{
            //             uri: this.props.sourceProp
            //         }}
            //         placeholderColor={'#ffffff'}
            //         style={{ width: '100%', height: '100%'}}
            //     />
            // </View>
            // <Image source={sourceObj} style={this.props.styleProp} onLoad={this._onLoad.bind(this)} />
            // <TouchableOpacity style={this.props.styleProp}>
            <Thumbnail url={this.props.sourceProp} containerStyle={this.props.styleProp} imageWidth={'100%'} imageHeight={'100%'} iconStyle={{ opacity: 0 }} onPress={this._onLoad.bind(this)} />
            // </TouchableOpacity>
            // {/* {!this.state.imageShowFlag && <View style={styles.cardImageView} />} */}
            // </View>


        )
    }

}