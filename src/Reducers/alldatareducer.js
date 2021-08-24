import ActionTypes from '../Actions/ActionTypes';

let INITIAL_STATE = {
    allData: [],
    allUsers: [],
    getCircleMembers: [],
    gameType: '',
    music: true,
    soundEffect: true,
    bfMusic: undefined,
    caMusic: undefined,
    waMusic: undefined,
    loading: true,
    currentUser: {},
    correctAnswer: 0,
    wrongAnswer: 0,
    answerSubmissionTime: [],
    numberOfOpponent: 0,
    submittedQuestionsList: [],
    flagSubmitTime: 0
}

const loadEveryThing = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.LOAD_EVERYTHING: {
            return state = {
                ...state,
                allData: action.payload,
                loading: false
            };
        }


        case ActionTypes.CURRENTUSER: {
            return state = {
                ...state,
                currentUser: action.payload,
            }
        }
        case ActionTypes.SELECTEDQUIZDATA: {
            return state = {
                ...state,
                selectedQuizArray: action.payload,
            }
        }

        case ActionTypes.GETALLUSERS: {
            return state = {
                ...state,
                allUsers: action.payload
            };
        }

        case ActionTypes.GETCIRCLEMEMBERS: {
            return state = {
                ...state,
                getCircleMembers: action.payload
            };
        }

        case ActionTypes.RECORDTIME: {
            console.log(state.answerSubmissionTime, 'inside reducer', action.payload);
            let answerSubmittedArr = state.answerSubmissionTime;
            console.log(action.payload !== undefined && isNaN(action.payload) === false, 'action.payload !== undefined && action.payload !== NaN')
            if (action.payload !== undefined && isNaN(action.payload) === false && (state.flagSubmitTime % 2 !== 0 || state.submittedQuestionsList && state.submittedQuestionsList.length > 0 && 'correctSequence' in state.submittedQuestionsList[0] === true)) {
                console.log(answerSubmittedArr, 'anssswerSUbmitted arr before', action.payload)
                answerSubmittedArr.push(action.payload);
                console.log(answerSubmittedArr, 'anssswerSUbmitted arr after', action.payload)
            }
            return state = {
                ...state,
                answerSubmissionTime: answerSubmittedArr,
                flagSubmitTime: state.flagSubmitTime + 1

            };
        }


        case ActionTypes.REINITIALIZESCORE: {

            return state = {
                ...state,
                answerSubmissionTime: [],
                numberOfOpponent: 0,
                submittedQuestionsList: [],
                flagSubmitTime: 0,
                correctAnswer: 0,
                wrongAnswer: 0,
                gameType: '',
                answerSubmissionTime: [],
                numberOfOpponent: 0,
                submittedQuestionsList: [],
                flagSubmitTime: 0
            };
        }
        case ActionTypes.CORRECTANSWERINCR: {
            let submittedQuestionsList = state.submittedQuestionsList;
            if (action.payload !== undefined) {
                submittedQuestionsList.push(action.payload);

            }

            return state = {
                ...state,
                correctAnswer: state.correctAnswer + 1,
                submittedQuestionsList: submittedQuestionsList
            };
        }
        case ActionTypes.SETNUMBEROFOPPONENT: {
            return state = {
                ...state,
                numberOfOpponent: action.payload
            };
        }
        case ActionTypes.WRONGANSWERINCR: {
            let submittedQuestionsList = state.submittedQuestionsList;
            if (action.payload !== undefined) {
                submittedQuestionsList.push(action.payload);

            }
            return state = {
                ...state,
                wrongAnswer: state.wrongAnswer + 1,
                submittedQuestionsList: submittedQuestionsList
            };
        }
        case ActionTypes.UPDATEGAMETYPE: {
            return state = {
                ...state,
                gameType: action.payload
            };
        }
        case ActionTypes.INITBFMUSIC: {
            return state = {
                ...state,
                bfMusic: action.payload,
                music: true
            };
        }
        case ActionTypes.INITCORRECTMUSIC: {
            return state = {
                ...state,
                caMusic: action.payload,
                soundEffect: true
            };
        }
        case ActionTypes.INITWRONGTMUSIC: {
            return state = {
                ...state,
                waMusic: action.payload,
                soundEffect: true
            };
        }
        case ActionTypes.SOUNDEFFECTFALSE: {
            return state = {
                ...state,
                soundEffect: false

            };
        }
        case ActionTypes.MUSICFALSE: {
            return state = {
                ...state,
                music: false
            };
        }
        case ActionTypes.INPROGRESSQUIZSTATUS: {
            console.log(action.payload, 'inside reducer');
            return state = {
                ...state,
                gameType: action.payload.gameType,
                wrongAnswer: action.payload.totalIncorrectAnswers,
                correctAnswer: action.payload.totalCorrectAnswers,
            };
        }
        case 'MUSICSOUNDEFFECTTRUE': {
            console.log(action.payload, 'inside reducer');
            return state = {
                ...state,
                music: true,
                soundEffect: true

            };
        }




        case ActionTypes.REINITIALIZEQUIZSTATUS: {
            return state = {
                ...state,
                correctAnswer: 0,
                wrongAnswer: 0,
                gameType: '',
                answerSubmissionTime: [],
                numberOfOpponent: 0,
                submittedQuestionsList: [],
                flagSubmitTime: 0
            };
        }


        default: { }
    }
    return state;
}
export default loadEveryThing;