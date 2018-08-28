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

let LoginForm = (props)  => {

    const { handleSubmit, badCredentials } = props;

    if(badCredentials) {
        return (
            <form onSubmit={handleSubmit} className='mt-5 form'>
                <div>
                    <Label htmlFor='email'>Enter email</Label>
                    <Field name='email' id='email' component='input' type='email'
                           required={true} className='w-100 pl-2 form__field form__field--error' placeholder='Enter email'/>
                </div>
                <div className='mt-3'>
                    <Label htmlFor='password'>Enter password</Label>
                    <Field name='password' id='password' component='input' type='password'
                           required={true} className='w-100 pl-2 form__field form__field--error' placeholder='Enter password'/>
                </div>
                <p className='form__warning mt-3'>Username or password invalid</p>
                <button type='submit' className='form__button mt-4'>Login</button>
            </form>
        );
    } else {
        return (
            <form onSubmit={handleSubmit} className='mt-5 form'>
                <div>
                    <Label htmlFor='email'>Enter email</Label>
                    <Field name='email' id='email' component='input' type='email'
                           required={true} className='w-100 pl-2 form__field' placeholder='Enter email'/>
                </div>
                <div className='mt-3'>
                    <Label htmlFor='password'>Enter password</Label>
                    <Field name='password' id='password' component='input' type='password'
                           required={true} className='w-100 pl-2 form__field' placeholder='Enter password'/>
                </div>
                <button type='submit' className='form__button mt-4'>Login</button>
            </form>
        );
    }
};

LoginForm = reduxForm({form: 'loginForm'})(LoginForm);
export default LoginForm;