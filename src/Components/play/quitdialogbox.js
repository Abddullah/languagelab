import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions, StatusBar, TouchableOpacity, AsyncStorage } from 'react-native';
import { Container, Content, Header, Body, ListItem, List, Button, Right, Left, Title, Drawer, Fab, Footer, FooterTab, Spinner, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as firebase from 'firebase';
import { Dialog } from "react-native-simple-dialogs";

export default class QuitDialogBox extends Component {

    home() {
        this.props.outsideTouch(false)
        firebase.database().ref('/gameRom/').off();
        Actions.myhome({ type: "reset" })
    }
    render() {
        return (
            <Dialog contentStyle={{ borderRadius: 5 }} visible={this.props.visible} onTouchOutside={() => this.props.outsideTouch(false, 'retrive')} >
                <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                    <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold', width: '90%' }} >Are you sure?</Text>
                    {/* <Text style={{ fontSize: 16, textAlign: 'center', color: '#42a5f5', marginVertical: 20 }} >Please sign in</Text> */}
                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: '5%', marginVertical: 10 }} >
                    <TouchableOpacity onPress={() => this.home()} style={{ flex: 1, marginHorizontal: '2%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#4caaf4', paddingVertical: 15, borderRadius: 10 }} >
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 19 }} >Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.outsideTouch(false, 'retrive')} style={{ marginHorizontal: '2%', flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fbe924', paddingVertical: 15, borderRadius: 10 }} >
                        <Text style={{ color: '#4caaf4', fontWeight: 'bold', fontSize: 19 }} >No</Text>
                    </TouchableOpacity>
                </View>
            </Dialog >
        )
    }
}

const styles = StyleSheet.create({
    feature: {
        alignSelf: 'center',
        margin: '3%'
    },
    featuretxt: {
        color: 'black',
        borderRadius: 14,
        backgroundColor: '#4096f3',
        paddingTop: '5%',
        paddingBottom: '5%',
        paddingRight: '12%',
        paddingLeft: '12%',
        margin: '5%',
    },
})