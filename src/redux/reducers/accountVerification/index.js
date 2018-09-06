import * as a from '../../actions/types';

const INITIAL_STATE = { verifyLoading: true, verified: false, error: false };

const AccountVerificationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case a.GET_VERIFY_SIGNUP_CODE_REQUEST:
            return { ...state, verifyLoading: true };
        case a.GET_VERIFY_SIGNUP_CODE_SUCCESS:
            return { ...state, verifyLoading: false, verified: true };
        case a.GET_VERIFY_SIGNUP_CODE_FAILURE:
            return { ...state, verifyLoading: false, verified: false, error: true };
        default:
            return state;
    }
};

export default AccountVerificationReducer;
