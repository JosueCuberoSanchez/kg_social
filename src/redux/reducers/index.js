import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Reducers
import UserReducer from './user/';
import EventReducer from './event/';
import CommentReducer from './comment/';
import LogReducer from './log/';
import AccountVerificationReducer from './accountVerification/';
import PasswordVerificationReducer from './passwordVerification/';
import ReduxFormReducer from './redux-form/';

export default combineReducers({
    user: UserReducer,
    events: EventReducer,
    comments: CommentReducer,
    logs: LogReducer,
    accountVerification: AccountVerificationReducer,
    passwordVerification: PasswordVerificationReducer,
    form: ReduxFormReducer,
    router: routerReducer
})
