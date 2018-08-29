import * as a from '../../actions/types';

const INITIAL_STATE = {
    events: {},
    eventsLoading: true,
    filter: '',
    error: false,
    currentEvent: {},
    eventLoading: true,
    isOwner: false
};

const EventReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        // Requests
        case a.GET_EVENTS_REQUEST:
            return { ...state, eventsLoading: true };
        case a.GET_EVENT_REQUEST:
            return { ...state, eventLoading: true };
        case a.GET_EVENT_IMAGE_REQUEST:
        case a.GET_CREATE_REQUEST:
        case a.GET_ENROLL_REQUEST:
        case a.GET_UNENROLL_REQUEST:
            return { ...state };

        // Successful events
        case a.GET_CREATE_SUCCESS:
        case a.GET_EVENT_IMAGE_SUCCESS:
        case a.GET_ENROLL_SUCCESS:
        case a.GET_UNENROLL_SUCCESS:
            return { ...state, currentEvent: action.payload};
        case a.GET_EVENTS_SUCCESS:
            return { ...state, events: action.payload, eventsLoading: false};
        case a.GET_EVENT_SUCCESS:
            return { ...state, currentEvent: action.payload, isOwner: action.payload.isOwner, eventLoading: false};
        case a.GET_LOGOUT_SUCCESS:
            return { ...state, eventLoading: true};

        // Errors
        case a.GET_EVENTS_FAILURE:
        case a.GET_CREATE_FAILURE:
        case a.GET_ENROLL_FAILURE:
        case a.GET_UNENROLL_FAILURE:
        case a.GET_EVENT_IMAGE_FAILURE:
            return { ...state, error: true};

        // Default
        default:
            return state;
    }
};

export default EventReducer;
