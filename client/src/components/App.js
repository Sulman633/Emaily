import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>

//App component can call an action creator thanks to connect method at bottom. Also * pulls all action creators.
class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    
    render() {
        return(
            <h1>Hello world</h1>
        )
    }
    
  
}

export default connect(null, actions)(App);
// first argument in connect is reserved for mapstatetoprops function, in this case null.