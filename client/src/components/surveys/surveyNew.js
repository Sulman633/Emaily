//SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
    // both do the samething, the latter is a shortcut only in create react app using a babel plugin.
//    constructor(props) {
//        super(props);

//        this.state = { new: true}
//    }
   state = { showFormReview: false }

   renderContent () {
       if(this.state.showFormReview) {
           return <SurveyFormReview
           onCancel={() => this.setState({showFormReview: false})}
           />
       }
       return <SurveyForm onSurveySubmit={ () => this.setState({ showFormReview: true })} />
   }

   render() {
        return(
            <div>
                {this.renderContent()}
            </div>
        );
   }  
}

//when navigating away from surveyNew then this code will clear all the fields.
export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);