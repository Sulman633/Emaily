import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';


import App from './components/App';
import reducers from './reducers';
import axios from 'axios';
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    // hooked up to react side using provider, its like glue
    //provider informs all children components of state change.
<Provider store={store}><App /></Provider>, 
document.querySelector('#root')
);

//console.log('STRIPE KEY IS', process.env.REACT_APP_STRIPE_KEY);
