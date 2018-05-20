//SurveyField contains logic to render a single

import React from 'react';
//meta contains lots of fields including error field. 2 levels deep destructuring on meta.
export default ({ input, label, meta: {error, touched} }) => {
    return (
        <div>
            <label>{ label }</label>
            <input {...input} style={{ marginBottom: '20px' }} />
            <div className="red-text" style={{ marginBottom: '20px'}}>
                {touched && error}
            </div> 
        </div>
    )
}
