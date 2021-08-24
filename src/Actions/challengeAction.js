import ActionTypes from "./ActionTypes";
import * as firebase from "firebase";
import { ToastAndroid } from "react-native";
import { Actions } from 'react-native-router-flux';
import Toast from 'react-native-simple-toast';


export function selectedQuizData(quizData) {
    return dispatch => {
        // console.log(quizData, 'quizData Action000000')
        dispatch(selectedQuizDispatch(quizData))
    }
}

function selectedQuizDispatch(payload) {
    return {
        type: ActionTypes.SELECTEDQUIZDATA,
        payload
    }
}

function challengeKey(challengeObj, msgObjs) {
    return dispatch => {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        // let userUid = firebase.auth().currentUser.uid;
        for (var i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        var keyObj = {
            quizTitle: challengeObj.titles,
            key: text,
            time: firebase.database.ServerValue.TIMESTAMP,
            type: 'Challenge',
            challengeAccept: false,
            players: [
                challengeObj.senderID,
                msgObjs.receiverUid
            ]
        }
        let msgSend = {
            senderID: msgObjs.senderID,
            receiverUid: msgObjs.receiverUid,
            msg: msgObjs.msg,
            timeStamp: firebase.database.ServerValue.TIMESTAMP,
            type: 'challenge',
            quizTitle: keyObj.quizTitle,
            key: keyObj.key,
            challengeAccept: false,
            challenger: challengeObj.senderID,
            quizToChallenge: msgObjs.quizToChellange,
            challengedDone: true
        }
        console.log("msgSend-----", msgSend, msgObjs)
        firebase.database().ref('gameRom/' + keyObj.key + '/').once("value", (obj) => {
            let keyData = obj.val();
            if (keyData === null) {
                // console.log(keyObj, 'Data not found')
                dispatch(savePin(keyObj, msgSend))
            }
            else {
                let checkTime = firebase.database.ServerValue.TIMESTAMP
                if (checkTime - keyData.time > 3600000) {
                    // console.log(keyObj, 'Data found')
                    dispatch(savePin(keyObj, msgSend))
                }
                else {
                    dispatch(challengeKey(action, msgObjs))
                }
            }
        })
    }
}

export function challengeAction(challengeObj, msgObjs) {
    return dispatch => {
        dispatch(challengeKey(challengeObj, msgObjs))
    }
}

function savePin(gameRom, msgSend) {
    return dispatch => {
        firebase.database().ref('gameRom/' + gameRom.key + '/').set(gameRom)
            .then(() => {
                firebase.database().ref('chat/').push(msgSend)
                    .then(() => {
                        Toast.show('Challenge has been sent, waiting for response.');
                    })
                    .catch((error) => {
                        Toast.show(error.message);
                    })
            })
            .catch((error) => {
                Toast.show(error.message);
            })
    }
}


export function challengeAcceptAction(acceptObj, selectedQuiz) {
    return dispatch => {
        // console.log(selectedQuiz, 'selectedQuizselectedQuiz')
        // console.log(action, 'actionaction')
        firebase.database().ref('gameRom/' + acceptObj.key + '/').once('value', (obj) => {
            let keyData = obj.val();
            // console.log(keyData.players, 'keyDatakeyData players')
            // keyData.players.push(acceptObj.senderID)

            let updatedData = {
                challengeAccept: acceptObj.challengeAccept,
                key: keyData.key,
                players: keyData.players,
                quizTitle: keyData.quizTitle,
                time: keyData.time,
                type: keyData.type
            }
            // let currentUser = firebase.auth().currentUser.uid;
            // for (var i = 0; i < updatedData.players.length; i++) {
            //     for (var j = 0; j < updatedData.players.length; j++) {
            //         if (updatedData.players[i] !== updatedData.players[j]) {
            //             let keyName = updatedData.players[j];
            //             firebase.database().ref('user/' + updatedData.players[i] + '/playedWith/').set({ [keyName]: keyName })
            //                 .then(() => {
            //                     console.log('saved ************')
            //                 })
            //         }

            //     }
            // }

            firebase.database().ref('gameRom/' + acceptObj.key + '/').set(updatedData)
                .then(() => {
                    firebase.database().ref('chat/').push(acceptObj)
                        .then(() => {
                            Toast.show('Your challenge has been accepted');
                        })
                        .catch(() => {
                            Toast.show('Your challenge has been Declined');
                        })
                })


        })

    }
}

updateChat = (msgs) => {
    return {
        type: ActionTypes.UPDATECHAT,
        payload: msgs
    }
}