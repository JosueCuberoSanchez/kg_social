import * as a from '../../actions/types';

const INITIAL_STATE = {

    // user info
    id: '',
    username: '',
    email: '',
    firstName: '',
    lastName:'',
    phone:'',
    image:'',
    points:'',
    facebook:'',
    twitter: '',
    instagram: '',

    badCredentials:false, // incorrect login credentials
    redirectDash: false, // correct login redirect flag
    registered: false, // sign up form success flag
    userLoading: true, // user profile loading
    error: false
};

const UserReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        // Requests
        case a.GET_LOGIN_REQUEST:
        case a.GET_LOGOUT_REQUEST:
        case a.GET_CREATE_USER_REQUEST:
        case a.GET_UPDATE_USER_REQUEST:
        case a.GET_USER_REQUEST:
            return { ...state, error: false };

        // Success
        case a.GET_CREATE_USER_SUCCESS:
            return { ...state, registered: true };
        case a.GET_LOGIN_SUCCESS:
            return { ...state, username: action.payload.username, firstName: action.payload.firstName, lastName: action.payload.lastName,
                points: action.payload.points, phone: action.payload.image, image: action.payload.image, facebook: action.payload.facebook,
                twitter: action.payload.twitter, instagram: action.payload.instagram, id: action.payload.id, redirectDash:true};
        case a.GET_LOGOUT_SUCCESS:
            return { ...state, redirectDash: false};
        case a.GET_USER_SUCCESS:
        case a.GET_UPDATE_USER_SUCCESS:
            return { ...state, username: action.payload.username, firstName: action.payload.firstName, lastName: action.payload.lastName,
                points: action.payload.points, phone: action.payload.phone, image: action.payload.image, facebook: action.payload.facebook,
                twitter: action.payload.twitter, instagram: action.payload.instagram, email: action.payload.email, id: action.payload.id,
                userLoading: false };

        // Failures
        case a.GET_CREATE_USER_FAILURE:
        case a.GET_LOGIN_FAILURE:
            return { ...state, badCredentials: true };
        case a.GET_LOGOUT_FAILURE:
        case a.GET_USER_FAILURE:
        case a.GET_UPDATE_USER_FAILURE:
            return { ...state, error: true, userLoading: false };
        default:
            return { ...state };
    }
};

export default UserReducer;
