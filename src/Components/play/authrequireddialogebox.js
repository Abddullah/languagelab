import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Dialog } from "react-native-simple-dialogs";
import { Actions } from "react-native-router-flux";

export default class AuthRequiredDialogeBox extends Component {
    home() {
        this.props.outsideTouch(false)
        Actions.login()
    }
    render() {
        return (
            <Dialog contentStyle={{ borderRadius: 5 }} visible={this.props.visible} onTouchOutside={() => this.props.outsideTouch(false)} >
                <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                    <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold', width: '90%' }} >You are not logged in to play this MAGE </Text>
                    <Text style={{ fontSize: 16, textAlign: 'center', color: '#42a5f5', marginVertical: 20 }} >Please sign in</Text>
                </View>
                <TouchableOpacity onPress={() => this.home()} style={styles.feature} >
                    <Text style={styles.featuretxt} >Sign in</Text>
                </TouchableOpacity>
            </Dialog>
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
        backgroundColor: '#fcdb00',
        paddingTop: '5%',
        paddingBottom: '5%',
        paddingRight: '12%',
        paddingLeft: '12%',
        margin: '5%',
    },
})

