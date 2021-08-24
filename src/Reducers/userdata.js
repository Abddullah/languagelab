import ActionTypes from '../Actions/ActionTypes';

const InitialState = {
    UserName: '',
    questionsPlayed: [],
    onlineUsers: [],
    correctquestions: 0,
    inprogressHistory: [],
    chat: []
}

function userdata(state = InitialState, action) {
    switch (action.type) {
        case ActionTypes.NAME:
            return { ...state, UserName: action.data.UserName, questionsPlayed: action.data.questionsPlayed };
        case ActionTypes.AddQuestions:
            return { ...state, questionsPlayed: action.data };
        case ActionTypes.ONLINEUSERS:
            return { ...state, onlineUsers: action.payload };
        case ActionTypes.ADD_HISTORY:
            return {...state, inprogressHistory: action.data}
        case ActionTypes.UPDATECHAT:
            return { ...state, chat: action.payload };
        case 'CLEAN_ONLINE_REDUCER':
            return { ...state, onlineUsers: [] , chat: [] }
        default:
            return state;
    }
}

export default userdata;