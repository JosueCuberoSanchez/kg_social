import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Reducers
import UserReducer from './user/';
import EventReducer from './event/';
import CommentReducer from './comment/';
import LogReducer from './log/';
import ReduxFormReducer from './redux-form/';

export default combineReducers({
    user: UserReducer,
    events: EventReducer,
    comments: CommentReducer,
    logs: LogReducer,
    form: ReduxFormReducer,
    router: routerReducer
})
