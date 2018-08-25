import * as a from '../../actions/types';

const INITIAL_STATE = {
    events: {},
    filter: '',
    error: false,
    isLoading: true,
    newEvent: {}
};

const UserReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case a.GET_EVENTS_REQUEST:
        case a.GET_CREATE_REQUEST:
            return { ...state };
        case a.GET_EVENTS_SUCCESS:
            return { ...state, events: action.payload, isLoading: false};
        case a.GET_CREATE_SUCCESS:
            return { ...state, newEvent: action.payload};
        case a.GET_EVENTS_FAILURE:
        case a.GET_CREATE_FAILURE:
            return { ...state, error: true};
        default:
            return state;
    }
};

export default UserReducer;
