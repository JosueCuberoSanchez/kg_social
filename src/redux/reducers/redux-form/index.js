import {reducer as formReducer} from 'redux-form';
import * as a from '../../actions/types';

const ReduxFormReducer = formReducer.plugin({
        commentForm: (state, action) => { // <------ 'account' is name of form given to reduxForm()
            switch(action.type) {
                case a.GET_CREATE_COMMENT_SUCCESS:
                    return undefined;       // <--- blow away form data
                default:
                    return { ...state };
            }
        }});


export default ReduxFormReducer;