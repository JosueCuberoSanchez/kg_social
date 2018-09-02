import * as a from '../../actions/types';

const INITIAL_STATE = {
    username: '',
    email: '',
    password: '',
    passwordConf: '',
    firstName: '',
    lastName:'',
    points:'',
    currentUser: {},
    badCredentials:false,
    redirectDash: false,
    redirectLogin: false,
    loggedOut: false,
    registered: false,
    verifyLoading: true,
    verified: false,
    resetSent: false,
    passwordReset: false,
    userLoading: true,
    error: false
};

const UserReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        // Requests
        case a.GET_LOGIN_REQUEST:
        case a.GET_LOGOUT_REQUEST:
        case a.GET_SIGNUP_REQUEST:
            return { ...state, badCredentials: false };
        case a.GET_FORGOT_PASSWORD_REQUEST:
        case a.GET_VERIFY_SIGNUP_CODE_REQUEST:
        case a.GET_VERIFY_FORGOT_PASSWORD_CODE_REQUEST:
        case a.GET_RESET_PASSWORD_REQUEST:
            return { ...state };
        case a.GET_USER_REQUEST:
            return { ...state, currentUser: {} };

        // Success
        case a.GET_LOGIN_SUCCESS:
            return { ...state, username: action.payload.username, password: action.payload.password,
                passwordConf: action.payload.passwordConf, firstName: action.payload.firstName,
                lastName: action.payload.lastName, points: action.payload.points, redirectDash:true, loggedOut: false};
        case a.GET_LOGOUT_SUCCESS:
            return { ...state, loggedOut: true, redirectDash: false, redirectLogin: true };
        case a.GET_SIGNUP_SUCCESS:
            return { ...state, badCredentials: false, registered: true };
        case a.GET_VERIFY_SIGNUP_CODE_SUCCESS:
        case a.GET_VERIFY_FORGOT_PASSWORD_CODE_SUCCESS:
            return { ...state, verifyLoading: false, verified: true };
        case a.GET_RESET_PASSWORD_SUCCESS:
            return { ...state, verifyLoading: false, verified: true, passwordReset: true };
        case a.GET_FORGOT_PASSWORD_SUCCESS:
            return { ...state, resetSent: true };
        case a.GET_USER_SUCCESS:
            return { ...state, currentUser: action.payload, userLoading: false };

        // Failures
        case a.GET_LOGOUT_FAILURE:
            return { ...state, badCredentials: false };
        case a.GET_FORGOT_PASSWORD_FAILURE:
            return { ...state, resetSent: true };
        case a.GET_LOGIN_FAILURE:
        case a.GET_SIGNUP_FAILURE:
            return { ...state, badCredentials: true };
        case a.GET_VERIFY_SIGNUP_CODE_FAILURE:
        case a.GET_VERIFY_FORGOT_PASSWORD_CODE_FAILURE:
            return { ...state, verifyLoading: false, verified: false };
        case a.GET_USER_FAILURE:
            return { ...state, error: true, userLoading: false };
        default:
            return state;
    }
};

export default UserReducer;
