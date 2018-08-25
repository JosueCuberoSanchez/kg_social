/**
 * CreateForm component.
 * @author Josué David Cubero Sánchez.
 */

import React from 'react';

// Reactstrap
import { Label } from 'reactstrap';

//Redux
import { Field, reduxForm } from 'redux-form'

// Styles
import './create-form.scss';

let CreateForm = (props)  => {

    const { handleSubmit } = props;

    return (
        <form onSubmit={handleSubmit} className='mt-5 form create-event'>
            <div>
                <Label htmlFor='email'>Enter email</Label>
                <Field name='email' component='input' type='email'
                       required={true} className='w-100 pl-2 form__field' placeholder='Enter email'/>
            </div>
            <div className='mt-3'>
                <Label htmlFor='password'>Enter password</Label>
                <Field name='password' component='input' type='password'
                       required={true} className='w-100 pl-2 form__field' placeholder='Enter password'/>
            </div>
            <button type='submit' className='form__button mt-4'>Login</button>
        </form>
    );

};

CreateForm = reduxForm({form: 'createForm'})(CreateForm);
export default CreateForm;