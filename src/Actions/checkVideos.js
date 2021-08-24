
import ActionTypes from './ActionTypes';
// import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export function CheckPlayer() {
    return dispatch => {
       dispatch(Checkaction());
       Actions.playVideos();
    }
}

function Checkaction(){
    return {
        type: ActionTypes.VideosIsPlay,
    }
}





