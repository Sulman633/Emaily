import {combineReducers} from 'redux';
import authReducer from './authReducer';

// combines all reducers together.
export default combineReducers({
    auth: authReducer
});