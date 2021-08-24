import React, { Component } from 'react';
import { Text, Image, Platform, NetInfo } from 'react-native';
import * as firebase from 'firebase';
import { connect } from "react-redux";

import { Router, Scene, Actions } from 'react-native-router-flux';
import LoginForm from './Components/Auth/loginForm'
import SignupForm from './Components/Auth/siginupForm'
import LinkAccount from './Components/Auth/LinkAccount'

import myHome from './Components/home/myHome'
import Splesh from './Components/splesh/splesh';

import MageCircle from './Components/mageCircle/magecircle'
import VideosThumbnail from './Components/play/play'
import PlayVideos from './Components/youTube/youPlay'
import Profile from './Components/Profile/profile'
import Settings from './Components/settings/settings'
import Test from './Components/play/Test'
import ScoreBoard from './Components/scoreBoard/scoreBoard';
import Messages from './Components/message';
import AllMessages from "./Components/allmessages"
import Pin from "./Components/pin"
import PinTeamName from "./Components/pinTeamName"
import PinSolo1on1Name from "./Components/solo1on1name"
import { connectionStatus } from './Actions/AuthAction';
import Toast from 'react-native-simple-toast';

import ShowAllUsers from "./Components/myComponents/showallusers";


class Routers extends Component {
    componentWillMount() {
        // alert('inside index .js')
        const config = {
            development: {
                apiKey: "AIzaSyCGPVCwF7LZJqdLWWwomdRLTfmRh0J94bY",
                authDomain: "mage-user.firebaseapp.com",
                databaseURL: "https://mage-user.firebaseio.com",
                projectId: "mage-user",
                storageBucket: "mage-user.appspot.com",
                messagingSenderId: "560340236455"
            },
            production: {
                apiKey: "AIzaSyDGUWXktyrlaagqf-ro1wqfu8ApyrNn7wc",
                authDomain: "mageproject-beadb.firebaseapp.com",
                databaseURL: "https://mageproject-beadb.firebaseio.com",
                projectId: "mageproject-beadb",
                storageBucket: "mageproject-beadb.appspot.com",
                messagingSenderId: "781554659331"

            }
        };

        let envoirnment = config.production;
        if (!firebase.apps.length) {
            firebase.initializeApp(envoirnment);
        }
        let that = this
        NetInfo.getConnectionInfo().then((connectionInfo) => {
            console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType, connectionInfo);
            if (connectionInfo.type === 'none') {
                // alert('connection gone. 1 ' + connectionInfo.type + '  ' + connectionInfo.connectionInfo);
                that.props.connectionStatus(false)
                // Toast.show('Please check internet connection".');

            }
            else {
                // alert('connection stable. 2 ' + connectionInfo.type + '  ' + connectionInfo.connectionInfo);
                that.props.connectionStatus(true)

            }
        });
        flagTost = false;
        function handleFirstConnectivityChange(connectionInfo) {
            console.log('First change, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
            if (connectionInfo.type === 'none') {
                // alert('connection gone. 3 ' + connectionInfo.type + '  ' + connectionInfo.connectionInfo);
                that.props.connectionStatus(false)
                if (that.flagTost === true) {
                    Toast.show('Please check internet connection.');
                }

            }
            else {
                // alert('connection stable. 4 ' + connectionInfo.type + '  ' + connectionInfo.connectionInfo);
                that.props.connectionStatus(true)
                if (that.flagTost === true) {
                    Toast.show('Internet connected.');;
                }
            }
            that.flagTost = true
            // NetInfo.removeEventListener(
            //     'connectionChange',
            //     handleFirstConnectivityChange
            // );
        }
        NetInfo.addEventListener(
            'connectionChange',
            handleFirstConnectivityChange
        );

    }
    state = {
        hideNavBar: Platform.select({
            ios: true,
            android: true
        })
    }
    onBackPress() {
        if (Actions.currentScene === 'myhome') {
            return false
        }
        else if (Actions.currentScene !== 'test' && Actions.currentScene !== 'login' && Actions.currentScene !== 'profile') {
            Actions.pop()
            return true
        }
        else if (Actions.currentScene === 'login') {
            Actions.myhome()
            return true
        }
        // else if (Actions.currentScene === 'test') {
        //     return true
        // }
        else if (Actions.currentScene === 'profile') {
            Actions.myhome()
            return true
        }
    }
    render() {
        return (
            <Router backAndroidHandler={this.onBackPress}>
                <Scene key='main'>

                    <Scene
                        key="splesh"
                        component={Splesh}
                        hideNavBar={true}
                    />
                    <Scene
                        key="myhome"
                        component={myHome}
                        hideNavBar={true}
                    />
                    <Scene
                        key="pin"
                        component={Pin}
                        hideNavBar={true}
                    />
                    <Scene
                        key="pinteamname"
                        component={PinTeamName}
                        hideNavBar={true}
                    />
                    <Scene
                        key="PinSolo1on1Name"
                        component={PinSolo1on1Name}
                        hideNavBar={true}
                    />
                    <Scene
                        key="signup"
                        component={SignupForm}
                        hideNavBar={true}
                    />
                    <Scene
                        key="login"
                        component={LoginForm}
                        hideNavBar={true}
                    />
                    <Scene
                        key="linkaccount"
                        component={LinkAccount}
                        hideNavBar={true}
                    />


                    <Scene
                        key="mageCircle"
                        component={MageCircle}
                        hideNavBar={true}
                    />
                    <Scene
                        key="allmessage"
                        component={AllMessages}
                        hideNavBar={true}
                    />
                    <Scene
                        key="message"
                        component={Messages}
                        hideNavBar={true}
                    />
                    <Scene
                        key="play"
                        component={VideosThumbnail}
                        hideNavBar={true}
                    />
                    <Scene
                        key="playVideos"
                        component={PlayVideos}
                        hideNavBar={true}
                    />
                    <Scene
                        key="profile"
                        component={Profile}
                        hideNavBar={true}
                    />
                    <Scene
                        key="settings"
                        component={Settings}
                        hideNavBar={true}
                    />
                    <Scene
                        key="test"
                        component={Test}
                        hideNavBar={true}
                    />
                    <Scene
                        key="scoreboard"
                        component={ScoreBoard}
                        hideNavBar={true}
                    />
                    <Scene
                        key="showAllUsers"
                        component={ShowAllUsers}
                        hideNavBar={true}
                    />
                </Scene>
            </Router>
        );
    }
}

// export default Routers;
const mapStateToProps = state => {
    // console.log(state);
    return {
        // auth: state.AuthReducer.isLoggedIn,
        // allData: state.loadEveryThing,
        // userDatas: state.userdata,
        // currentUser: state.loadEveryThing,
        // // user: state.loadEveryThing.user,
        // user: state.AuthReducer.user,
        isNetAvailable: state.AuthReducer.connectionStatus


    };
};
const mapDispatchToProps = (dispatch) => {
    return {

        connectionStatus: (connectionState) => {
            dispatch(connectionStatus(connectionState));
        },
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Routers);