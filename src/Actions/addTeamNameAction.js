import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';

export function addTeamName(team) {
    return dispatch => {
        dispatch(gotTeamData())
        firebase.database().ref('/gameRom').child(team.pin).once("value", snap => {
            let updatedTeamData = snap.val();
            console.log(updatedTeamData,'bababa',team)
            let TeamData;
            if (snap.val().type === 'Team') {
                TeamData = {
                    teamName: team.teamName,
                    playerName: team.teamMembers
                }
            }
            else if (snap.val().type === 'solo1on1') {
                TeamData = {
                    teamName: team.teamName,
                    // playerName: team.teamMembers
                }
            }
            if ('players' in snap.val()) {
                updatedTeamData.players.push(TeamData)
                firebase.database().ref('/gameRom').child(team.pin).set(updatedTeamData).then(() => {
                    // dispatch(loading())
                    // dispatch(gotTeamData())                    
                    dispatch(loadingFalse())
                })

            } else {
                let playersArr = []
                // let TeamData = {
                //     teamName: team.teamName,
                //     playerName: team.teamMembers
                // }
                playersArr.push(TeamData)
                firebase.database().ref('/gameRom').child(team.pin).update({ players: playersArr })

                dispatch(loadingFalse())
            }
        })
    };
}

function clearEveryThing() {
    return {
        type: 'CLEAR_TEAMPIN',
    };
}

function loading() {
    return {
        type: 'LOADING_PIN',
    };
}
function loading() {
    return {
        type: 'LOADING_PIN',
    };
}
function loadingFalse() {
    return {
        type: 'LOADING_FALSE',
    };
}

function gotTeamData() {
    return {
        type: 'GOT_TEAM_DATA',
    }
}