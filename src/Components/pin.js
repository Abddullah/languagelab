import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import * as nb from "native-base";
import MyStatusBar from './statusbar';
import { Actions } from "react-native-router-flux";
import { teamPin, clearEveryThing } from '../Actions/teamPinAction'
import Toast from 'react-native-simple-toast';

class Pin extends Component {
    constructor() {
        super();
        this.state = {
            pin: ''
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (Actions.currentScene === 'pin') {
            return true;
        }
        else {
            return false;
        }
    }
    onSubmit() {
        const { pin } = this.state;
        if (pin.length === 4) {
            if (this.props.isNetAvailable === true) {
                this.props.teamPin(pin)
            }
            else {
                Toast.show('Please check internet connection.');

            }

        } else if (pin.length < 4) {
            alert('Your Pin is 4 digits Please type it correctly')
        }
    }

    componentWillMount() {
        this.props.clearEveryThing()
    }

    render() {
        // console.log(this.props.loading)
        return (
            <View style={{ backgroundColor: 'white', flex: 1 }} >
                <MyStatusBar backgroundColor="#07b3fd" barStyle="light-content" />
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => Actions.pop()} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                        <Text style={{ fontSize: 15 }} >Back</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }} >
                        <Image style={styles.logo} source={require("./images/mage_splash_logo.png")} />
                    </View>
                    <View style={{ flex: 1 }} />
                </View>
                <View>
                    <Image style={styles.mainLogo} source={require('./images/mage_splash_logo.png')} />
                    <nb.Item rounded style={{ width: '60%', alignSelf: 'center', marginVertical: 10 }} >
                        <nb.Input keyboardType={'numeric'} maxLength={4} onChangeText={pin => this.setState({ pin })} style={{ textAlign: 'center' }} placeholder='Game Pin' autoFocus placeholderTextColor='#909090' />
                    </nb.Item>
                    {this.props.loading ?
                        <ActivityIndicator style={{ alignSelf: 'center', marginVertical: 10 }} size='large' color='#07b3fd' /> :
                        <nb.Button onPress={this.onSubmit.bind(this)} style={{ backgroundColor: '#4caaf4', width: '40%', alignSelf: 'center', marginVertical: 10, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }} >
                            <nb.Text>Enter</nb.Text>
                        </nb.Button>
                    }
                    <Text style={styles.error} >{this.props.error ? 'You type a wrong pin. Please ty again' : this.props.timeerror ? 'Your pin is Invalid or Expire' : null}</Text>
                    <View style={{ alignItems: 'center', marginTop: 50 }} >
                        <Text>Enter PIN now for</Text>
                        <View style={{ flexDirection: 'row' }} >
                            {/* <Text style={{ fontWeight: '500', marginRight: 5 }} >FREE</Text> */}
                            <Text>a MAGE duel.</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

function mapStateToProps(state) {
    // console.log(state)
    return {
        loading: state.PinTeam.Loading,
        error: state.PinTeam.Error,
        timeerror: state.PinTeam.timeError,
        isNetAvailable: state.AuthReducer.connectionStatus

    }
}

export default connect(mapStateToProps, { teamPin, clearEveryThing })(Pin)

const styles = StyleSheet.create({
    header: { backgroundColor: "white", flexDirection: 'row', borderBottomColor: '#cbcacf', borderBottomWidth: 1, shadowRadius: 1.2, shadowOpacity: 0.2, height: 56, shadowOffset: { width: 0, height: 2 }, elevation: 3 },
    logo: { width: 72, height: 35, resizeMode: 'contain' },
    mainLogo: { width: 202, height: 97.5, alignSelf: 'center', marginTop: 70, marginBottom: 20, resizeMode: 'contain' },
    error: { color: 'red', alignSelf: 'center', width: '70%', marginTop: 10, textAlign: 'center' }
})
