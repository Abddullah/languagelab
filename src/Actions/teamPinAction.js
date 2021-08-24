import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';

export function teamPin(pin) {
    return dispatch => {
        dispatch(loading())
        firebase.database().ref().child("gameRom").once("value", snapshot => {
            if (pin in snapshot.val()) {
                firebase.database().ref('/gameRom').child(pin).once("value", snap => {
                    console.log(snap.val().type, snap.val().type.toLowerCase() === 'team', 'aaaaaaaaaaa')
                    let pinData = snap.val();
                    if (snap.val().type.toLowerCase() === 'team') {
                        console.log('quizStart' in pinData === false || pinData.quizStart  === true,'--------------' )
                        if (Date.now() - snap.val().time > 3600000 || ('quizStart' in pinData === true || pinData.quizStart === true)) {
                            dispatch(timeerror())
                        } else {
                            dispatch(clearEveryThing())
                            Actions.pinteamname({ pin })
                        }
                    }
                    else if (snap.val().type.toLowerCase() === 'solo1on1') {
                        console.log('quizStart' in pinData === false || pinData.quizStart  === true,'--------------' )

                        if (Date.now() - snap.val().time > 3600000 || ('quizStart' in pinData === true || pinData.quizStart === true)) {
                            dispatch(timeerror())
                        } else {
                            dispatch(clearEveryThing())
                            Actions.PinSolo1on1Name({ pin })
                        }
                    }
                })
            } else {
                dispatch(error())
            }

        })
    };
}
export function clearEveryThing() {
    return {
        type: 'CLEAR_TEAMPIN',
    };
}

function error() {
    return {
        type: 'PIN_ERROR',
    };
}
function loading() {
    return {
        type: 'LOADING_PIN',
    };
}
function timeerror() {
    return {
        type: 'TIME_ERROR',
    };
}
