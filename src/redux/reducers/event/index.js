import * as a from '../../actions/types';

const INITIAL_STATE = {
    events: {},
    eventsLoading: true,
    filter: '',
    error: false,
    currentEvent: {},
    eventLoading: true,
    isOwner: false,
    attendees: [],
    canceled: false
};

const EventReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        // Requests
        case a.GET_EVENTS_REQUEST:
            return { ...state, eventsLoading: true, error: false };
        case a.GET_EVENT_REQUEST:
        case a.GET_EVENT_IMAGE_REQUEST:
        case a.GET_UPDATE_EVENT_PICS_REQUEST:
            return { ...state, eventLoading: true, canceled: false, error: false };
        case a.GET_CREATE_EVENT_REQUEST:
        case a.GET_DELETE_EVENT_REQUEST:
        case a.GET_UPDATE_EVENT_REQUEST:
        case a.GET_ENROLL_REQUEST:
        case a.GET_UNENROLL_REQUEST:
        case a.GET_VOTE_REQUEST:
        case a.GET_INVITE_REQUEST:
            return { ...state, error: false };

        // Successful events
        case a.GET_CREATE_EVENT_SUCCESS:
            return { ...state, currentEvent: action.payload.event, attendees: action.payload.attendees};
        case a.GET_UPDATE_EVENT_SUCCESS:
            return { ...state, currentEvent: action.payload};
        case a.GET_VOTE_SUCCESS:
            return { ...state, currentEvent: action.payload};
        case a.GET_EVENT_IMAGE_SUCCESS:
        case a.GET_UPDATE_EVENT_PICS_SUCCESS:
            return { ...state, eventLoading: false, currentEvent: action.payload};
        case a.GET_EVENTS_SUCCESS:
            return { ...state, events: action.payload, eventsLoading: false};
        case a.GET_EVENT_SUCCESS:
            return { ...state, currentEvent: action.payload.event, attendees: action.payload.attendees, isOwner: action.payload.isOwner, eventLoading: false};
        case a.GET_LOGOUT_SUCCESS:
            return { ...state, eventLoading: true};
        case a.GET_ENROLL_SUCCESS:
        case a.GET_UNENROLL_SUCCESS:
        case a.GET_INVITE_SUCCESS:
            return { ...state, attendees: action.payload};
        case a.GET_DELETE_EVENT_SUCCESS:
            return { ... state, currentEvent: {}, canceled: true};

        // Errors
        case a.GET_EVENTS_FAILURE:
        case a.GET_CREATE_EVENT_FAILURE:
        case a.GET_DELETE_EVENT_FAILURE:
        case a.GET_UPDATE_EVENT_FAILURE:
        case a.GET_ENROLL_FAILURE:
        case a.GET_UNENROLL_FAILURE:
        case a.GET_EVENT_IMAGE_FAILURE:
        case a.GET_UPDATE_EVENT_PICS_FAILURE:
        case a.GET_VOTE_FAILURE:
        case a.GET_INVITE_FAILURE:
            return { ...state, error: true};

        // Default
        default:
            return state;
    }
};

export default EventReducer;
