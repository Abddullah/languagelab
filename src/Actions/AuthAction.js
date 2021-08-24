
import ActionTypes from './ActionTypes';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { Keyboard } from 'react-native'
import { AsyncStorage } from 'react-native';
import { onlineUserQuestionsPlayed, addQuestionsLengthDb } from './playUpdateDbAction';


export function SignUpAction(userObj) {
    return dispatch => {
        dispatch(register())
        // console.log("user Action---", userObj);
        firebase.database().ref('/user/').once('value', (snap) => {
            let allUsers = snap.val();
            let userNameExist = false;
            console.log(allUsers, userObj, '---------aaaaaaa');
            for (var key in allUsers) {
                if (allUsers[key].userName === userObj.userName) {
                    console.log('exist');
                    userNameExist = true;
                }
            }
            if (userNameExist === true) {
                alert('Username already exist. Choose another one.')
                dispatch(registrationFailed(''))

            }
            else {
                firebase.auth()
                    .createUserWithEmailAndPassword(userObj.email, userObj.password)
                    .then((user) => {
                        userObj.uid = user.uid;
                        delete userObj.password
                        delete userObj.confirmEmail

                        firebase.database().ref('/').child(`user/${user.uid}`).set(userObj)
                            .then(() => {
                                dispatch(getTheSignedInUserData(user, true, ));
                                dispatch(callBackForSigninAndGettingNotification(user, {}, true));
                                // firebase.auth()
                                //     .signInWithEmailAndPassword(userObj.email, userObj.password)
                                //     .then((user) => {
                                //         dispatch(registerSuccessfully())
                                //         // console.log("loginnnnnnnnnnnnnnnnnnnnn")
                                //         firebase.database().ref('/').child(`user/${user.uid}`).once('value', (snap) => {
                                //             dispatch(loginSuccessfully(snap.val()))
                                //             // console.log("Login success", snap.val())
                                //             Actions.profile();
                                //         })
                                //     })
                                //     .catch((error) => {
                                //         // console.log("error", error.message)
                                //         let message = error.message;
                                //         alert(error.message)
                                //         dispatch(registrationFailed(message))
                                //     });
                                // console.log("heelo0000000000")
                            })
                    })
                    .catch((error) => {
                        // console.log("error", error.message)
                        let message = error.message;
                        alert(error.message)
                        dispatch(registrationFailed(message))
                    });
            }

        })


    }
}


export function linkAccount(info, allQuizsData) {
    return dispatch => {
        dispatch(register())
        // console.log("user Action---", userObj);
        firebase.database().ref('/user/').once('value', (snap) => {
            let allUsers = snap.val();
            let userNameExist = false;
            // console.log(allUsers, userObj, '---------aaaaaaa');
            for (var key in allUsers) {
                if (allUsers[key].userName === info.userName) {
                    console.log('exist');
                    userNameExist = true;
                }
            }
            if (userNameExist === true) {
                alert('Username already exist. Choose another one.')
                dispatch(registrationFailed(''))

            }
            else {
                console.log(info)
                var credential = firebase.auth.EmailAuthProvider.credential(info.email, info.password);
                firebase.auth().currentUser.linkWithCredential(credential)
                    .then((user) => {
                        // console.log("Account linking success", user.uid);
                        delete info.password
                        if (user.uid !== null) {
                            firebase.database().ref('user/' + user.uid + '/').set(info)
                            dispatch(loginSuccessfully(user));
                            dispatch(getTheSignedInUserData(user, true, ));
                            dispatch(callBackForSigninAndGettingNotification(user, allQuizsData, true));
                            // console.log("Login success", snap.val())
                            // Actions.myhome();

                        }

                    })
            }
        })
    }
}

export function authWithFBorGoogle(credential, allQuizsData, quizDetails) {
    return dispatch => {
        // console.log(credential, 'credential');

        // console.log(allQuizsData, 'quizSelectedData======');
        dispatch(login())
        dispatch(register())
        dispatch(updateChat())
        firebase.auth().signInWithCredential(credential)
            .then((user) => {
                // console.log(user, '+++++++++++');
                firebase.database().ref('/').child(`user/${user.uid}/`).once('value', (snap) => {
                    if (snap.val() === null) {
                        let userObj = {
                            email: user.email,
                            roll: 'learner',
                            uid: user.uid,
                            // userName: user.displayName

                        }
                        Actions.linkaccount({ userCredentials: userObj })

                        // firebase.database().ref(`/user/${user.uid}/`).set(userObj)
                        //     .then(() => {
                        //         // dispatch(registerSuccessfully())
                        //         // dispatch(loginSuccessfully(userObj));
                        //         // dispatch(getTheSignedInUserData(user));
                        //         // dispatch(callBackForSigninAndGettingNotification(user, allQuizsData));
                        //     })

                    }
                    else {
                        // if (quizDetails !== undefined) {
                        //     Actions.play({ data: quizDetails });

                        // }
                        // else {

                        //     // Actions.myhome();
                        // }
                        // dispatch(loginSuccessfully(snap.val()));
                        dispatch(getTheSignedInUserData(user, true, quizDetails));
                        dispatch(callBackForSigninAndGettingNotification(user, allQuizsData, true));
                        // console.log("Login success", snap.val())
                        // Actions.myhome();
                    }
                })

            }, (error) => {
                let message = error.message;
                alert(error.message)
                dispatch(registrationFailed(message))
            })
    }
}
var onlineUsersArr = []

export function SignInAction(userLogin, allQuizsData, quizDetails) {
    return dispatch => {
        dispatch(login())
        // console.log(allQuizsData, 'quizSelectedData======');

        // console.log("user Action---", userLogin);
        firebase.auth()
            .signInWithEmailAndPassword(userLogin.email, userLogin.password)
            .then((user) => {
                console.log(quizDetails, 'quizdetails')
                // if (quizDetails !== undefined) {
                //     Actions.play({ data: quizDetails });

                // }
                // else {

                //     // Actions.myhome();
                // }

                // console.log("loginnnnnnnnnnnnnnnnnnnnn", user)
                dispatch(getTheSignedInUserData(user, true, quizDetails));
                dispatch(callBackForSigninAndGettingNotification(user, allQuizsData, true));
            })
            .catch((error) => {
                // console.log("error", error.message)
                let message = error.message;
                // alert(error.message)
                dispatch(loginFailed(message))
            });
    }
}

export function getOnlineUsers() {
    return dispatch => {
        let onlineUsersArr = [];
        firebase.database().ref('activeUsers/').once('value', (snap) => {
            // console.log(snap.val(), 'online users=============================');
            let allOnlineUser = snap.val()
            for (var key in allOnlineUser) {
                onlineUsersArr.push(allOnlineUser[key])
            }
            dispatch(onlineUsers(onlineUsersArr))
        })
    }

}
let getTheSignedInUserDataflagCount = 0;
export function getTheSignedInUserData(user, goDirectly, quizDetails) {
    return dispatch => {
        // dispatch(loginSuccessfully({}))

        if (getTheSignedInUserDataflagCount === 0 || goDirectly === true) {
            console.log('babababa', user, getTheSignedInUserDataflagCount)
            getTheSignedInUserDataflagCount = getTheSignedInUserDataflagCount + 1;

            firebase.database().ref('/').child(`user/${user.uid}`).once('value', (snap) => {
                let userData = snap.val();
                AsyncStorage.setItem('userData', JSON.stringify(userData))

                dispatch(updateOnlineUserStatus(user, snap.val()));
                dispatch(loginSuccessfully(snap.val()))
                dispatch(currentUserData(snap.val()))

                if (goDirectly === true) {
                    if (quizDetails !== undefined) {
                        Actions.play({ data: quizDetails });
                    }
                    else {
                        Actions.myhome();
                    }
                }


                // console.log("Login success", snap.val())
                // firebase.database().ref('activeUsers/' + user.uid + '/').onDisconnect().set({})

                firebase.database().ref(".info/connected").on("value", function (connectedStatus) {
                    if (connectedStatus.val() === true) {
                        console.log("connected", snap.val());
                        firebase.database().ref('activeUsers/' + snap.val().uid + '/').set(snap.val())
                        dispatch(updateOnlineUserStatus(user, snap.val()));
                    } else {
                        firebase.database().ref('activeUsers/' + snap.val().uid + '/').remove()

                        console.log("not connected *****", snap.val().uid);

                    }
                });

                // console.log(snap.val(), '555555555', userData.settings, 'music' in userData.settings, userData.settings.music !== true);
                if ('settings' in userData && 'music' in userData.settings && userData.settings.music !== true) {
                    dispatch(musicFlag());
                }
                if ('settings' in userData && 'soundEffect' in userData.settings && userData.settings.soundEffect !== true) {
                    dispatch(soundEffectFlag());
                }
            })
        }


    }
}
export function soundEffectFlag() {
    return dispatch => {
        dispatch({ type: ActionTypes.SOUNDEFFECTFALSE })
    }
}
export function musicFlag() {
    return dispatch => {
        dispatch({ type: ActionTypes.MUSICFALSE })
    }
}
let callBackForSigninAndGettingNotificationflagCount = 0;
export function callBackForSigninAndGettingNotification(user, allQuizsData, goDirectly) {
    return dispatch => {
        if (callBackForSigninAndGettingNotificationflagCount === 0 || goDirectly === true) {
            callBackForSigninAndGettingNotificationflagCount = callBackForSigninAndGettingNotificationflagCount + 1;
            AsyncStorage.setItem('@OnlineUser:onlineUser', JSON.stringify(firebase.auth().currentUser.uid))

            let messages = [];
            let dbRef = firebase.database().ref('chat/');
            let flag = true;
            dbRef.on('child_added', (snap) => {
                // console.log(snap.val(), '--------');
                let chatObj = snap.val();
                chatObj.id = snap.id;
                messages.push(chatObj);
                dispatch(updateChat(messages))

            })
            dbRef.limitToLast(1).on('child_added', function (snapshot) {
                if (flag === true) {
                    flag = false;
                }
                else {
                    let chatObj = snapshot.val();
                    chatObj.id = snapshot.key;
                    // console.log(snapshot.val(), 'newwwwww', 'challengeAccept' in chatObj, chatObj.challengeAccept === true,chatObj);
                    // if (firebase.auth().currentUser.uid === chatObj.receiverUid) {
                    if ((chatObj.receiverUid === firebase.auth().currentUser.uid || chatObj.senderID === firebase.auth().currentUser.uid) && 'challengeAccept' in chatObj && chatObj.challengeAccept === true) {
                        console.log(chatObj, 'inside if statement');
                        // let requiredQuizIndex;
                        // let allQuizes = allQuizsData.allData;
                        // for (var i = 0; i < allQuizes.length; i++) {
                        //     // console.log(allQuizes[i].name.titles === chatObj.quizTitle, "data check")
                        //     if (allQuizes[i].name.titles === chatObj.quizTitle) {
                        //         requiredQuizIndex = i;
                        //     }
                        // }
                        // Keyboard.dismiss();
                        // console.log(allQuizsData.allData[requiredQuizIndex], 'allQuizsData.allData[requiredQuizIndex]',allQuizsData);
                        dispatch(onlineUserQuestionsPlayed(firebase.auth().currentUser, chatObj.quizToChellange, 'challenge'));
                        dispatch(addQuestionsLengthDb(firebase.auth().currentUser, chatObj.quizToChellange));
                        Actions.test({
                            data: chatObj.quizToChellange,
                            historyStatus: false,
                            currentQuestionIndex: 0,
                            gameType: 'challenge',
                            chatObj: chatObj
                        });
                        // if(chatObj.quizToChallenge === undefined){
                        //     Actions.test({
                        //         data: {},
                        //         chatObject:chatObj,
                        //         historyStatus: false,
                        //         currentQuestionIndex: 0,
                        //         gameType: 'challenge'
                        //     });
                        // }
                        // else{

                        //     Actions.test({
                        //         data: chatObj.quizToChallenge,
                        //         historyStatus: false,
                        //         currentQuestionIndex: 0,
                        //         gameType: 'challenge'
                        //     });
                        // }
                    }
                    else if ((firebase.auth().currentUser.uid === chatObj.receiverUid && Actions.currentScene !== 'allmessage' && chatObj.receiverUid === firebase.auth().currentUser.uid) && 'type' in chatObj && chatObj.type === 'challenge') {
                        console.log(chatObj, 'inside challenged if statement');
                        Actions.allmessage({ data: chatObj });
                    }
                    else if (firebase.auth().currentUser.uid === chatObj.receiverUid && Actions.currentScene !== 'message' && Actions.currentScene !== 'allmessage' && chatObj.receiverUid === firebase.auth().currentUser.uid) {
                        // console.log(chatObj, 'inside else if statement');
                        Actions.allmessage({ data: chatObj });
                    }

                }
                // }
            });
        }
    }
}

export function updateOnlineUserStatus(user, userData) {
    return dispatch => {
        // console.log(user, userData, 'abbbbbbbbbbb');
        // firebase.database().ref('activeUsers/' + user.uid + '/').set(userData)
        //     .then((successs) => {
        // console.log('successs', successs);
        firebase.database().ref('activeUsers/').on('child_added', (snap) => {
            // console.log(snap.val(), 'online users=============================');
            let allOnlineUser = snap.val()
            allOnlineUser.id = snap.id;
            let flagExist = false;
            for (var i = 0; i < onlineUsersArr.length; i++) {
                if (onlineUsersArr[i].uid === allOnlineUser.uid) {
                    flagExist = true;
                    break;
                }
            }
            if (flagExist === false) {
                onlineUsersArr.push(allOnlineUser)
            }
            dispatch(onlineUsers(onlineUsersArr));
        })
        // })
        // .catch((err) => {
        //     console.log('err', err)
        // })
        // firebase.database().ref('activeUsers/').on('child_removed', (removedData) => {
        //     let allOnlineUser = removedData.val()
        //     allOnlineUser.id = removedData.id;
        //     let existIndex = false;
        //     for (var i = 0; i < onlineUsersArr.length; i++) {
        //         if (onlineUsersArr[i].uid === allOnlineUser.uid) {
        //             existIndex = i;
        //             break;
        //         }
        //     }
        //     console.log(allOnlineUser, onlineUsersArr[existIndex], '*****************')
        //     onlineUsersArr.splice(i, 1);
        //     // onlineUsersArr.push(allOnlineUser)

        //     dispatch(onlineUsers(onlineUsersArr));
        // })



    }
}


export function sendForgotPasswordEmail(email) {
    return dispatch => {
        // console.log("haider-------------------",email)
        dispatch(login())

        dispatch(forgetPassword())
        firebase.auth().sendPasswordResetEmail(email)
            .then((sent) => {
                dispatch(forgetPasswordSuccessfully());
                dispatch(loginFailed('Reset password link sent successfully.'))

                // console.log(sent, 'sent');
            })
            .catch((error) => {
                // console.log("error", error.message)
                let message = error.message;
                // alert(error.message)
                dispatch(forgetPasswordSuccessfully());
                dispatch(loginFailed(message))
                // dispatch(forgetPasswordFailed(message))
            });
    }
}

// export function LogOutAction() {
//     return dispatch => {
//         dispatch(LoaderDispatch())
//         firebase.auth().signOut()
//             .then(() => {
//                 dispatch(LoaderDispatch())
//                 dispatch(userSignInUpdate())
//                 console.log('success');
//             }).catch((error) => {
//                 dispatch(LoaderDispatch())
//                 console.log(error.message);
//             });
//     }
// }


export function connectionStatus(connectionStatus) {
    return dispatch => {
        dispatch(connecitonStatus(connectionStatus));
    }
}

connecitonStatus = (bool) => {
    return {
        type: ActionTypes.CONNECTIONSTATUS,
        payload: bool
    }
}


export function currentUserData(obj) {
    return {
        type: ActionTypes.CURRENTUSER,
        payload: obj
    }
}


register = () => {
    return {
        type: ActionTypes.REGISTER
    }
}

registerSuccessfully = (obj) => {
    return {
        type: ActionTypes.REGISTER_SUCCESS,
        payload: obj
    }
}

registrationFailed = (payload) => {
    return {
        type: ActionTypes.REGISTER_FAIL,
        payload: payload
    }
}

login = () => {
    return {
        type: ActionTypes.LOGIN
    }
}

export function loginSuccessfully(obj) {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        payload: obj
    }
}


export function loggedinUserUpdate(connectionStatus) {
    return dispatch => {
        dispatch({ type: ActionTypes.USERLOGGEDIN });
    }
}

export function loginFailed(payload) {
    return {
        type: ActionTypes.LOGIN_FAIL,
        payload: payload
    }
}

forgetPassword = () => {
    return {
        type: ActionTypes.SENDEMAIL
    }
}

forgetPasswordSuccessfully = (obj) => {
    return {
        type: ActionTypes.SENDEMAIL_SUCCESS,
        payload: obj
    }
}

forgetPasswordFailed = (payload) => {
    return {
        type: ActionTypes.SENDEMAIL_FAIL,
        payload: payload
    }
}


onlineUsers = (allOnlineUsers) => {
    return {
        type: ActionTypes.ONLINEUSERS,
        payload: allOnlineUsers
    }
}


updateChat = (msgs) => {
    return {
        type: ActionTypes.UPDATECHAT,
        payload: msgs
    }
}
