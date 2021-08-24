
import ActionTypes from './ActionTypes';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export function addname(data) {
    return {
        type: ActionTypes.NAME,
        data
    }
}
export function addquestions(data) {
    return {
        type: ActionTypes.AddQuestions,
        data
    }
}
export function historyAction(data) {
    return {
        type: ActionTypes.ADD_HISTORY,
        data
    }
}






