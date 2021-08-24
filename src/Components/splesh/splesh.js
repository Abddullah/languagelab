import React, { Component } from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity, ScrollView, Dimensions, ProgressBarAndroid, NetInfo, AsyncStorage } from 'react-native';
import { CardSection, Input, Spinner, EndCardSection } from '../Common';
import { Header, Body, Left, Right, Button, Card, Thumbnail, CardItem, Icon, Content, Footer } from 'native-base'
import { connect } from 'react-redux';
import * as Progress from 'react-native-progress';
import { Actions } from 'react-native-router-flux';
import * as firebase from 'firebase';
import { getTheSignedInUserData, callBackForSigninAndGettingNotification, connectionStatus, loggedinUserUpdate, loginSuccessfully, currentUserData } from '../../Actions/AuthAction';
import Toast from 'react-native-simple-toast';
// import { alldata } from '../../Actions/alldata';
import { alldata, getdata, fectchDataFromFirebase } from '../../Actions/alldata';

const window = Dimensions.get('window');

class Splesh extends Component {
    constructor(props) {
        super(props);
        console.log('splesh run times')
        this.state = {
            progress: 0,
            indeterminate: true,
        };
        // this.props.alldata(this.props.auth);

        // this.animate()
    }
    componentWillMount() {
        let that = this;
        let flagLocalSignedIn = true;
        let flagCount = 0;
        firebase.auth().onAuthStateChanged((user) => {
            // console.log(flagLocalSignedIn, 'flagLocalSignedIn', flagCount)
            // flagCount = flagCount + 1;
            console.log(flagCount, 'flagCount', user)
            if (user && flagLocalSignedIn === true && this.props.isNetAvailable === true && flagCount === 0) {
                flagLocalSignedIn = false;
                console.log(user, 'user found', firebase.auth().currentUser.uid);
                this.props.loggedinUserUpdate();
                AsyncStorage.getItem('userData')
                    .then((userData) => {
                        console.log('userData', JSON.parse(userData));
                        that.props.currentUserData(JSON.parse(userData))
                        that.props.loginSuccessfully(JSON.parse(userData))

                    })
                // this.props.getTheSignedInUserData(user);
                this.props.callBackForSigninAndGettingNotification(user, {})


            } else {
                console.log(user, 'user found not')
            }
            flagLocalSignedIn = false;
        });
    }
    componentDidMount() {
        this.animate();
        // this.props.alldata();
        this.props.alldata(this.props.auth);

    }

    animate() {
        let progress = 0;
        // this.setState({ progress });
        setTimeout(() => {
            console.log('set time out run')
            // this.setState({ indeterminate: false });
            var loaderBar = setInterval(() => {
                progress += Math.random() / 5;
                console.log(progress, 'set interval')
                if (progress > 1) {
                    progress = 1;
                    clearInterval(loaderBar);
                    if (Actions.currentScene === 'splesh') {
                        console.log('going to home');
                        Actions.myhome({ type: 'reset' });
                    }
                }
                this.setState({ progress, indeterminate: false });
            }, 500);
        }, 1700);

    }
    render() {

        return (
            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor='#2196f3' />
                <Image style={{ width: 500, height: 950, marginLeft: -100, position: 'absolute', opacity: 0.3 }} source={require('../images/Illustration_splash.png')} />
                <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(255,255,255,0.9)' }}>
                    <View >
                        <Image style={{ width: 208, height: 100.5, alignSelf: 'center', marginTop: '20%', marginBottom: '0%', resizeMode: 'contain' }} source={require('../images/mage_splash_logo.png')} />
                    </View>
                    <View style={{ height: '2%', marginTop: '5%', alignItems: 'center' }}>
                        <Progress.Bar unfilledColor={'#cccccc'} progress={this.state.progress} width={210} color='#2196f3' height={8.5} animated={true} borderWidth={0} />
                    </View>
                    <View style={{ height: '94%', alignItems: 'center', marginTop: '5%' }}>
                        <Image style={{ width: '100%', height: '75%', resizeMode: 'contain' }} source={require('../images/Illustration_splash.png')} />
                    </View>
                </View>
            </View>
        );
    }
}
const mapStateToProps = state => {
    // console.log(state);
    return {
        auth: state.AuthReducer.isLoggedIn,
        isNetAvailable: state.AuthReducer.connectionStatus


    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        alldata: (authStatus) => {
            dispatch(alldata(authStatus));
        },
        connectionStatus: (connectionState) => {
            dispatch(connectionStatus(connectionState));
        },
        getTheSignedInUserData: (user) => {
            dispatch(getTheSignedInUserData(user));
        },
        callBackForSigninAndGettingNotification: (user, allQuizsData) => {
            dispatch(callBackForSigninAndGettingNotification(user, allQuizsData));
        },
        loggedinUserUpdate: () => {
            dispatch(loggedinUserUpdate());
        },

        loginSuccessfully: (userData) => {
            dispatch(loginSuccessfully(userData));
        },
        currentUserData: (userData) => {
            dispatch(currentUserData(userData));
        },


    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Splesh);
