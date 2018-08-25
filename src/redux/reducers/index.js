import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

// Reducers
import UserReducer from './user/';
import EventReducer from './event/';

export default combineReducers({
    user: UserReducer,
    events: EventReducer,
    form: formReducer,
    router: routerReducer
})
