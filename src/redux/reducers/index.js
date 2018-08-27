import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Reducers
import UserReducer from './user/';
import EventReducer from './event/';
import CommentReducer from './comment/';
import ReduxFormReducer from './redux-form/';

export default combineReducers({
    user: UserReducer,
    events: EventReducer,
    comments: CommentReducer,
    form: ReduxFormReducer,
    router: routerReducer
})
