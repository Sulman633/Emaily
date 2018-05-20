import {combineReducers} from 'redux';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';
import { reducer as reduxForm } from 'redux-form';

// combines all reducers together.
export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    surveys: surveysReducer
});