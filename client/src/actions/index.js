import axios from 'axios';
import { FETCH_USER } from './types';

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

// redux thunk allows dispatch func, so you can wait for axios request to finish first.
