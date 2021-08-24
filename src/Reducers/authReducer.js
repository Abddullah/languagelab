import ActionTypes from '../Actions/ActionTypes';

const initialState = {
    user: [],
    isRegister: false,
    isLoading: false,
    isLoggedIn: false,
    error: {},
    isError: false,
    sendMailError: false,
    loadingSendMail: false,
    sendMailErrorMassege: {},
    connectionStatus: undefined
}
export const AuthReducer = (state = initialState, action) => {
    let newState = state
    switch (action.type) {
        case ActionTypes.REGISTER:
            return Object.assign({}, state, { isLoading: true, isError: false });

        case ActionTypes.REGISTER_SUCCESS:
            // newState = state;
            newState['isLoading'] = false;
            newState['isRegister'] = true;
            return Object.assign({}, state, newState)

        case ActionTypes.REGISTER_FAIL:
            // newState = state;
            newState['error'] = action.payload
            newState['isLoading'] = false;
            newState['isError'] = true;
            return Object.assign({}, state, newState);

        // LOGIN Action handlers
        case 'LOGIN':
            return Object.assign({}, state, { isLoading: true, isError: false });

        case 'LOGIN_SUCCESS':
            newState['isLoading'] = false;
            newState['isLoggedIn'] = true;
            newState['user'] = action.payload;
            return Object.assign({}, state, newState)

        case 'USERLOGGEDIN':
            newState['isLoggedIn'] = true;
            return Object.assign({}, state, newState)

            
        case 'ALREADY_LOGGEDIN':
            return Object.assign({}, state, { isLoading: false });

        case 'LOGIN_FAIL':
            newState['error'] = action.payload
            newState['isError'] = true;
            newState['isLoading'] = false;
            return Object.assign({}, state, newState);


        // Forget password
        case ActionTypes.SENDEMAIL:
            return Object.assign({}, state, { loadingSendMail: true, sendMailError: false });

        case ActionTypes.SENDEMAIL_SUCCESS:
            // newState = state;
            newState['loadingSendMail'] = false;
            // newState['isRegister'] = true;
            return Object.assign({}, state, newState)

        case ActionTypes.SENDEMAIL_FAIL:
            // newState = state;
            newState['sendMailErrorMassege'] = action.payload
            newState['loadingSendMail'] = false;
            newState['sendMailError'] = true;
            return Object.assign({}, state, newState);



        //logout 
        case 'LOGOUT':
            return Object.assign({}, state);

        case 'LOGOUT_SUCCESS':
            newState['isLoggedIn'] = false;
            newState['user'] = {};
            return Object.assign({}, state, newState);

        case 'LOGOUT_FAIL':
            return Object.assign({}, state)
        case 'CLEAN_AUTH_REDUCER':
            return {
                ...state,
                user: {},
                isRegister: false,
                isLoading: false,
                isLoggedIn: false,
                error: {},
                isError: false,
                sendMailError: false,
                loadingSendMail: false,
                sendMailErrorMassege: {}
            }

        case 'CONNECTIONSTATUS':
            return {
                ...state,
                connectionStatus: action.payload
            }

        //default state return
        default:
            return state;
    }
}

export default AuthReducer;
