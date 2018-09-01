/**
 * SignUpForm component.
 * @author Josué David Cubero Sánchez.
 */

import React from 'react';

// Reactstrap
import { Label } from 'reactstrap';

//Redux
import { Field, reduxForm } from 'redux-form'

// Styles
import '../form.scss';

let SignUpForm = (props)  => {

    const { handleSubmit, badCredentials, passwordsMatch, validPassword } = props;

    return (
        <form onSubmit={handleSubmit} className='mt-3 form'>
            {
                badCredentials
                ? <div>
                        <Label htmlFor='email'>Enter email</Label>
                        <Field name='email' id='email' component='input' type='email'
                               required={true} className='w-100 pl-2 form__field form__field--error' placeholder='Enter email'/>
                    </div>
                : <div>
                        <Label htmlFor='email'>Enter email</Label>
                        <Field name='email' id='email' component='input' type='email'
                               required={true} className='w-100 pl-2 form__field' placeholder='Enter email'/>
                    </div>
            }
            {
                badCredentials
                    ? <div className='mt-3'>
                        <Label htmlFor='username'>Enter username</Label>
                        <Field name='username' id='username' component='input' type='text'
                               required={true} className='w-100 pl-2 form__field form__field--error' placeholder='Enter username'/>
                    </div>
                    : <div className='mt-3'>
                        <Label htmlFor='username'>Enter username</Label>
                        <Field name='username' id='username' component='input' type='text'
                               required={true} className='w-100 pl-2 form__field' placeholder='Enter username'/>
                    </div>
            }
            {
                badCredentials
                ? <p className='form__warning mt-3'>Username or password invalid</p>
                : null
            }
            <div className='mt-3'>
                <Label htmlFor='firstName'>Enter first name</Label>
                <Field name='firstName' id='firstName' component='input' type='text'
                       required={true} className='w-100 pl-2 form__field' placeholder='Enter first name'/>
            </div>
            <div className='mt-3'>
                <Label htmlFor='lastName'>Enter last name</Label>
                <Field name='lastName' id='lastName' component='input' type='text'
                       required={true} className='w-100 pl-2 form__field' placeholder='Enter last name'/>
            </div>
            {
                passwordsMatch
                ? validPassword
                    ? <div className='mt-3'>
                        <Label htmlFor='password'>Enter password</Label>
                        <Field name='password' id='password' component='input' type='password'
                               required={true} className='w-100 pl-2 form__field' placeholder='Enter password'/>
                    </div>
                    : <div className='mt-3'>
                        <Label htmlFor='password'>Enter password</Label>
                        <Field name='password' id='password' component='input' type='password'
                               required={true} className='w-100 pl-2 form__field form__field--error' placeholder='Enter password'/>
                    </div>
                : <div className='mt-3'>
                        <Label htmlFor='password'>Enter password</Label>
                        <Field name='password' id='password' component='input' type='password'
                               required={true} className='w-100 pl-2 form__field form__field--error' placeholder='Enter password'/>
                    </div>
            }
            {
                passwordsMatch
                    ? validPassword
                        ? <div className='mt-3'>
                                <Label htmlFor='repassword'>Re enter password</Label>
                                <Field name='repassword' id='repassword' component='input' type='password'
                                       required={true} className='w-100 pl-2 form__field' placeholder='Re enter password'/>
                            </div>
                        : <div className='mt-3'>
                        <Label htmlFor='repassword'>Re enter password</Label>
                        <Field name='repassword' id='repassword' component='input' type='password'
                               required={true} className='w-100 pl-2 form__field form__field--error' placeholder='Re enter password'/>
                        </div>
                : <div className='mt-3'>
                        <Label htmlFor='repassword'>Re enter password</Label>
                        <Field name='repassword' id='repassword' component='input' type='password'
                               required={true} className='w-100 pl-2 form__field form__field--error' placeholder='Re enter password'/>
                    </div>
            }
            {
                !passwordsMatch
                    ? <p className='form__warning mt-3'>Passwords don't match!</p>
                    : null
            }
            {
                !validPassword
                    ? <p className='form__warning mt-3'>Password is invalid, it should include at least 8 characters, one letter and one number.</p>
                    : null
            }
            <button type='submit' className='form__button my-4'>Sign Up</button>
        </form>
    );
};

SignUpForm = reduxForm({form: 'signUpForm'})(SignUpForm);
export default SignUpForm;