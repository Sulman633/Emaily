import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';


export const fetchUser = () => async dispatch => {

        const res = await axios.get('/api/current_user');

        dispatch({type: FETCH_USER, payload: res.data });
}
// post request to backend server route, updates user model with token data. Called in payments.js file.
export const handleToken = (token) => async dispatch => {
        //passes token to route
        const res = await axios.post('/api/stripe', token);
        
        dispatch({type: FETCH_USER, payload: res.data });
}

export const submitSurvey = (values, history) => async dispatch => {
        const res = await axios.post('/api/surveys', values);

        history.push('/surveys');
        //this gets back user model updated with the subtracted credit.
        dispatch({type: FETCH_USER, payload: res.data });
        
};

export const fetchSurvey = () => async dispatch => {
        const res = await axios.get('/api/surveys');

        dispatch({ type: FETCH_SURVEYS, payload: res.data })
}


// redux thunk allows dispatch func, so you can wait for axios request to finish first.
