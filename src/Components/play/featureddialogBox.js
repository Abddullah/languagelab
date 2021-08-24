import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Dialog } from "react-native-simple-dialogs";
import { Actions } from "react-native-router-flux";

export default class DialogFeaturedBox extends Component {
    home() {
        this.props.outsideTouch(false)
        // Actions.myhome({type: 'reset'})
        Linking.openURL('http://www.languagelab.sg/sets.html')
    }
    render() {
        return (
            <Dialog contentStyle={{ borderRadius: 5 }} visible={this.props.visible} onTouchOutside={() => this.props.outsideTouch(false)} >
                <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                    <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold', width: '90%' }} >You are not authorized to play this MAGE </Text>
                    <Text style={{ fontSize: 16, textAlign: 'center', color: '#42a5f5', marginVertical: 20 }} >Please click here to unlock the set</Text>
                </View>
                <TouchableOpacity onPress={() => this.home()} style={styles.feature} >
                    {/* <Text style={styles.featuretxt} >Back To Home</Text> */}
                    <Text style={styles.featuretxt} >Unlock The Set</Text>
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

