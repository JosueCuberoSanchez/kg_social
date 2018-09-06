/**
 * ContactUsForm component.
 * @author Josué David Cubero Sánchez.
 */

import React from 'react';

// Reactstrap
import { Label } from 'reactstrap';

//Redux
import { Field, reduxForm } from 'redux-form'

// Styles
import '../form.scss';

let ContactUsForm = (props)  => {

    const { handleSubmit } = props;

    return (
        <form onSubmit={handleSubmit} className='mt-3 form'>
            <div className='mb-4'>
                <Label htmlFor='title'>Issue title</Label>
                <Field name='title' id='title' component='input' type='text'
                       required={true} className='w-100 pl-2 form__field' placeholder='Enter issue title'/>
            </div>
            <div className='mb-4'>
                <Label htmlFor='description'>Issue description</Label>
                <Field name='description' id='description' component='textarea' type='text'
                       required={true} className='w-100 pl-2 form__field' placeholder='Enter issue description'/>
            </div>
            <button type='submit' className='form__button'>Submit</button>
        </form>
    );

};

ContactUsForm = reduxForm({form: 'contactUsForm'})(ContactUsForm);
export default ContactUsForm;