import ActionTypes from '../Actions/ActionTypes';


const checkVideosReducers = (state = {
    IsPlayed: false,
}, action) => {
    switch (action.type) {

        case ActionTypes.VideosIsPlay: {
            return state = {
                ...state,
                IsPlayed: !state.IsPlayed,
            };
        }
        default: { }
    }
    return state;
}
export default checkVideosReducers;
