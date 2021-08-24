import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import AuthReducer from '../Reducers/authReducer';
import checkVideosReducers from '../Reducers/checkVideosReducers'
import loadEveryThing from '../Reducers/alldatareducer';
import userdata from '../Reducers/userdata';
import PinTeam from '../Reducers/pinTeamReducer';

export default createStore(
    combineReducers({
        AuthReducer,
        checkVideosReducers,
        loadEveryThing,
        userdata,
        PinTeam
    }),{},(applyMiddleware(thunk))
);