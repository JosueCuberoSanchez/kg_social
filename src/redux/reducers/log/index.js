import * as a from '../../actions/types';

const INITIAL_STATE = {
    logs: [],
    areLoading: true,
    error: false
};

const LogReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case a.GET_LOG_REQUEST:
            return { ...state };
        case a.GET_LOG_SUCCESS:
            return { ...state, logs: action.payload, areLoading: false};
        case a.GET_LOG_FAILURE:
            return { ...state, error: true };
        default:
            return { ...state };
    }
};

export default LogReducer;
