import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

export function LogOut() {
    return dispatch => {
        console.log('logout action')
        Actions.myhome();
        GoogleSignin.signOut();
        LoginManager.logOut();
        let loggedOutUser;
        if (firebase.auth().currentUser && firebase.auth().currentUser !== null && firebase.auth().currentUser.uid) {
            loggedOutUser = firebase.auth().currentUser.uid;
            firebase.auth().signOut();
            firebase.database().ref('activeUsers/' + loggedOutUser + '/').set({})

        }
        console.log(loggedOutUser, 'loggedOutUser');
        AsyncStorage.getItem('@OnlineUser:onlineUser', (err, snap) => {
            console.log(err, snap, '----********')
            var onlineUsername = JSON.parse(snap);
            console.log(onlineUsername, 'onlineUsername ******');
            if (loggedOutUser !== undefined && loggedOutUser !== null) {

                firebase.database().ref('activeUsers/' + snap + '/').remove();
            }
            if (onlineUsername !== null) {
                AsyncStorage.removeItem('@OnlineUser:onlineUser', (err) => console.log('userId', err))
            }
            dispatch(cleanOnlineUserReducer())
            dispatch(cleanAuthReducer())
            dispatch(musicSoundEffectTrue());
        }, function (error) {
            // An error happened.
        });
    };

}



export function LogOutFunc() {
    return dispatch => {
        // Actions.myhome();
        GoogleSignin.signOut();
        LoginManager.logOut();
        let loggedOutUser;
        if (firebase.auth().currentUser && firebase.auth().currentUser !== null && firebase.auth().currentUser.uid && firebase.auth().currentUser.uid !== null) {
            loggedOutUser = firebase.auth().currentUser.uid;
        }
        console.log('logout action', loggedOutUser)
        // let loggedOutUser = firebase.auth().currentUser.uid;
        console.log(loggedOutUser, 'loggedOutUser');
        firebase.auth().signOut().then(function () {
            // console.log('Sign-out successful.')
            AsyncStorage.getItem('@OnlineUser:onlineUser', (err, snap) => {
                console.log(err, snap, '----********')
                var onlineUsername = JSON.parse(snap);
                console.log(onlineUsername, 'onlineUsername ******');
                if (loggedOutUser !== undefined && loggedOutUser !== null) {

                    firebase.database().ref('activeUsers/' + snap + '/').remove();
                }
                if (onlineUsername !== null) {
                    AsyncStorage.removeItem('@OnlineUser:onlineUser', (err) => console.log('userId', err))
                }
            })
            dispatch(musicSoundEffectTrue());
        }, function (error) {
            // An error happened.
        });
    }

}
musicSoundEffectTrue = () => {
    return {
        type: 'MUSICSOUNDEFFECTTRUE',
    }
}



cleanOnlineUserReducer = () => {
    return {
        type: 'CLEAN_ONLINE_REDUCER',
    }
}

cleanAuthReducer = () => {
    return {
        type: 'CLEAN_AUTH_REDUCER'
    }
}