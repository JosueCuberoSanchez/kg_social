import * as a from '../../actions/types';

const INITIAL_STATE = {
    currentEventComments: [],
    commentsLoading: false,
    commentsError: false
};

const CommentReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        // Requests
        case a.GET_COMMENT_REQUEST:
            return { ...state, commentsLoading: true };
        case a.GET_CREATE_COMMENT_REQUEST:
            return { ...state };

        // Success
        case a.GET_COMMENT_SUCCESS:
            return { ...state, commentsLoading: false, currentEventComments: action.payload};
        case a.GET_CREATE_COMMENT_SUCCESS:
            return { ...state };

        // Failures
        case a.GET_COMMENT_FAILURE:
        case a.GET_CREATE_COMMENT_FAILURE:
            return { ...state, commentsError: true };
        // Default
        default:
            return state;
    }
};

export default CommentReducer;
