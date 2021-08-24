const InitialState = {
    Error: false,
    Loading: false, 
    timeError: false,
    gotTeamData: false
}

function PinTeam(state = InitialState, action) {
    switch (action.type) {
        case 'LOADING_PIN':
            return { ...state, Loading: true, Error: false, timeError: false, gotTeamData: false }
        case 'CLEAR_TEAMPIN':
            return { ...state, Loading: false, Error: false, timeError: false, gotTeamData: false }
        case 'PIN_ERROR':
            return { ...state, Error: true, Loading: false, timeError: false, gotTeamData: false }
        case 'TIME_ERROR':
            return { ...state, Error: false, Loading: false, timeError: true, gotTeamData: false }
        case 'GOT_TEAM_DATA':
            return { ...state, Error: false, Loading: true, timeError: false, gotTeamData: true}
            default:
        case 'LOADING_FALSE': 
            return { ...state, Loading: false }
            return state;
    }
}

export default PinTeam;