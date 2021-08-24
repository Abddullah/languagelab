import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'native-base'
import { Actions } from 'react-native-router-flux';

export default class Header extends Component {
    Setting() {
        Actions.settings();
    }
    ArrowBack(){
        Actions.myhome();
    }
    render() {
        return (
            <View style={{ backgroundColor: '#2196f3', flexDirection: 'row', paddingHorizontal: '4%',paddingBottom:'3%', paddingTop: '3%' }} >
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <TouchableOpacity onPress={this.ArrowBack.bind(this)} >
                        <Icon style={{ color: 'white' }} name="ios-arrow-back" />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                    <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }} >{this.props.name}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} >
                    <TouchableOpacity onPress={this.Setting.bind(this)}>
                        <Image source={require('../images/Setting_BTN.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
} 