import * as a from '../../actions/types';

const INITIAL_STATE = {
    username: '',
    email: '',
    password: '',
    passwordConf: '',
    firstName: '',
    lastName:'',
    points:'',
    badCredentials:false,
    redirectDash: false,
    redirectLogin: false,
    loggedOut: false
};

const UserReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case a.GET_LOGIN_REQUEST:
        case a.GET_LOGOUT_REQUEST:
        case a.GET_LOGOUT_FAILURE:
            return { ...state };
        case a.GET_LOGIN_SUCCESS:
            return { ...state, username: action.payload.username, password: action.payload.password,
                passwordConf: action.payload.passwordConf, firstName: action.payload.firstName,
                lastName: action.payload.lastName, points: action.payload.points, redirectDash:true, loggedOut: false};
        case a.GET_LOGIN_FAILURE:
            return { ...state, badCredentials: true };
        case a.GET_LOGOUT_SUCCESS:
            return { ...state, loggedOut: true, redirectDash: false, redirectLogin: true };
        default:
            return state;
    }
};

export default UserReducer;
