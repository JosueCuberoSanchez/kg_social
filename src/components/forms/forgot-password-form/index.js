/**
 * LoginForm component.
 * @author Josué David Cubero Sánchez.
 */

import React from 'react';

// Reactstrap
import { Label } from 'reactstrap';

//Redux
import { Field, reduxForm } from 'redux-form'

// Styles
import '../form.scss';

let ForgotPasswordForm = (props)  => {

    const { handleSubmit } = props;

    return (
        <form onSubmit={handleSubmit} className='mt-5 form'>
            <div>
                <Label htmlFor='email'>Enter email</Label>
                <Field name='email' id='email' component='input' type='email'
                       required={true} className='w-100 pl-2 form__field' placeholder='Enter email'/>
            </div>
            <button type='submit' className='form__button mt-4'>Submit</button>
        </form>
    );
};

ForgotPasswordForm = reduxForm({form: 'forgotPasswordForm'})(ForgotPasswordForm);
export default ForgotPasswordForm;