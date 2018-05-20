//SurveyFormReview shows users their form inputs for review.
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import formFields from './formFields';
import * as actions from '../../actions';


//submitSurvey is a action from ./actions, used connect to access it. History object is from withRouter.
const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {

    const reviewFields = _.map(formFields, ({name, label}) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>
                {formValues[name]}
                </div>
            </div>
        )
    })

    return(
        //arrow func for submit survey there so that it doesnt invoke immediately but awaits user click.
        <div>
            <h5>Please confirm your entries</h5>
            { reviewFields }
            <button
                className="yellow darken-3 white-text btn-flat"
                onClick={onCancel}
            > Back </button>
            <button 
            onClick={() => submitSurvey(formValues, history)} 
            className="green btn-flat right white-text">
                Send Survey
                <i className="material-icons right white-text">email</i>
            </button>
        </div>
    )

}

function mapStateToProps(state) {
    return {
        formValues: state.form.surveyForm.values
    }
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));