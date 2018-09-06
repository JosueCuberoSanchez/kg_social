import * as a from '../../actions/types';

const INITIAL_STATE = { verifyLoading: true, verified: false, passwordReset: false, resetSent: false, error: false };

const PasswordVerificationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case a.GET_FORGOT_PASSWORD_REQUEST:
        case a.GET_VERIFY_FORGOT_PASSWORD_CODE_REQUEST:
        case a.GET_RESET_PASSWORD_REQUEST:
            return { ...state };

        case a.GET_FORGOT_PASSWORD_SUCCESS:
            return { ...state, resetSent: true };
        case a.GET_VERIFY_FORGOT_PASSWORD_CODE_SUCCESS:
            return { ...state, verifyLoading: false, verified: true };
        case a.GET_RESET_PASSWORD_SUCCESS:
            return { ...state, passwordReset: true };

        case a.GET_FORGOT_PASSWORD_FAILURE:
        case a.GET_RESET_PASSWORD_FAILURE:
        case a.GET_VERIFY_FORGOT_PASSWORD_CODE_FAILURE:
            return { ...state, verifyLoading: false, error: true };
        default:
            return state;
    }
};

export default PasswordVerificationReducer;
